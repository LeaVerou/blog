// Fetched into constructable sheets rather than CSS module scripts, which Safari lacks.
async function fetchSheet (name) {
	let sheet = new CSSStyleSheet();
	sheet.replaceSync(await (await fetch(new URL(name, import.meta.url))).text());
	return sheet;
}

const styles = await fetchSheet("scenario.css");

// The step list is light DOM, so its sheet goes on the document — whichever document that is.
document.adoptedStyleSheets.push(await fetchSheet("steps.css"));

const SVG = "http://www.w3.org/2000/svg";
const other = scheme => scheme === "light" ? "dark" : "light";

/** How long the walkthrough holds a simulated press before letting it spring back. */
const PRESS = 220;

/** The hand's fingertip, as a fraction of the control it presses. */
const TIP = 0.62;

/**
 * Chrome won't focus an SVG <g> even with tabindex, so each control gets a real button — laid over
 * the scene rather than inside it in a foreignObject: WebKit renders and hit-tests positioned
 * content within a foreignObject against the SVG root instead (webkit.org/b/23113), which left both
 * controls dead in Safari and took the ripples with them, and it clips foreignObject whatever
 * `overflow` says. Insets are percentages of the viewBox, so they scale exactly as the SVG does —
 * physical ones, since the scene is an illustration and never mirrors.
 */
function hitTarget (control, name) {
	let svg = control.ownerSVGElement;
	let view = svg.viewBox.baseVal;
	let box = control.getBBox();

	let button = document.createElement("button");
	button.className = "hit";
	button.dataset.control = name;
	button.style.left = `${(box.x - view.x) / view.width * 100}%`;
	button.style.top = `${(box.y - view.y) / view.height * 100}%`;
	button.style.width = `${box.width / view.width * 100}%`;
	button.style.height = `${box.height / view.height * 100}%`;

	// .scene is the positioned box that hugs the SVG; appending paints the button over it.
	svg.parentNode.append(button);
	return button;
}

/**
 * <theme-scenario src="demo.svg"> wraps an <ol> whose items script the walkthrough
 * (see demo.html for the step DSL). Everything else — the stage, the navigation buttons,
 * a status live region — lives in its shadow root, so instances don't collide.
 * Attributes: src (the scene SVG), key (localStorage key, default "theme", prefixed with the page path),
 * states (2 or 3, the site control's style).
 */
class ThemeScenario extends HTMLElement {
	/** Simulated, because a page cannot change what prefers-color-scheme reports. */
	os = "light";

	/** The OS at step 0. The only thing the reader picks, and the whole scenario follows from it. */
	start = "light";

	step = 0;

	async connectedCallback () {
		if (this.shadowRoot) {
			return;
		}

		// Namespaced to the page so demo state cannot collide with the site's own storage.
		this.key = `${location.pathname}:${this.getAttribute("key") ?? "theme"}`;

		let root = this.attachShadow({ mode: "open" });
		root.adoptedStyleSheets = [styles];
		root.innerHTML = `
			<div class="demo">
				<div class="stage"></div>
				<div class="walkthrough">
					<slot></slot>
					<div class="nav">
						<button class="prev" aria-label="Previous step">Previous</button>
						<button class="next">Next</button>
					</div>
				</div>
			</div>
			<p class="sr-only" role="status"></p>
		`;

		this.demo = root.querySelector(".demo");
		this.stage = root.querySelector(".stage");
		this.prev = root.querySelector(".prev");
		this.next = root.querySelector(".next");
		this.status = root.querySelector("[role=status]");

		this.prev.addEventListener("click", () => this.goTo(this.step - 1));
		this.next.addEventListener("click", () => this.goTo(this.step === this.last ? 0 : this.step + 1));

		let src = this.getAttribute("src");

		try {
			// The scene wrapper is the containing block the overlaid controls are positioned against,
			// so it has to hug the SVG rather than whatever height the stage's grid area ends up with.
			this.stage.innerHTML = `<div class="scene">${await (await fetch(src)).text()}</div>`;

			// What the scene is sized from (see scenario.css), set here so it cannot outlive it.
			let view = this.stage.querySelector("svg").viewBox.baseVal;
			this.demo.style.setProperty("--scene-ratio", `${view.width} / ${view.height}`);
		}
		catch (error) {
			this.stage.innerHTML = `<p class="error">Could not load <code>${src}</code> (${error}). This page needs to be served over HTTP, e.g. <code>npm run serve</code>.</p>`;
			throw error;
		}

		this.stepList = this.querySelector("ol");
		this.stepList.classList.add("steps");
		this.stepEls = [...this.stepList.children];
		this.last = this.stepEls.length - 1;
		this.numbered = this.stepEls.findLastIndex(li => li.dataset.editable !== "");

		this.svg = this.stage.querySelector("svg");
		this.svg.style.setProperty("--states", this.getAttribute("states") ?? "2");

		this.osGroup = this.svg.getElementById("os");
		this.siteGroup = this.svg.getElementById("toggle");

		// The hand marking the steps the user acts on, parked over the site toggle by its fingertip at (8 2).
		let box = this.siteGroup.getBBox();
		this.pointer = document.createElementNS(SVG, "g");
		this.pointer.classList.add("pointer");
		this.pointer.setAttribute("aria-hidden", "true");
		this.pointer.setAttribute("transform", `translate(${box.x + box.width * TIP} ${box.y + box.height * TIP}) scale(1.05) translate(-8 -2)`);
		this.pointer.innerHTML = `<path d="M6 4a2 2 0 0 1 4 0v7a1.6 1.6 0 0 1 3.2 0v.6a1.6 1.6 0 0 1 3.2 0v.6a1.6 1.6 0 0 1 3.2 0V18a4.5 4.5 0 0 1-4.5 4.5h-4a4.5 4.5 0 0 1-3.18-1.32l-4.2-4.2a1.8 1.8 0 0 1 2.55-2.55Z"/>`;
		this.siteGroup.after(this.pointer);

		this.osControl = hitTarget(this.osGroup, "os");
		this.siteControl = hitTarget(this.siteGroup, "page");

		// At step 0 the OS *is* the starting scheme, so flipping one flips the other.
		this.osControl.addEventListener("click", () => {
			this.act("os: !os");

			if (!this.freeform()) {
				this.start = this.os;
			}

			this.render();
		});

		this.siteControl.addEventListener("click", () => {
			this.act("page: !page");
			this.render();
		});

		// Wrap each step's prose in a button, so the reader can jump straight to it.
		for (let [i, li] of this.stepEls.entries()) {
			let button = document.createElement("button");
			button.dataset.step = i;
			button.append(...li.childNodes);
			button.addEventListener("click", () => this.goTo(i));
			li.append(button);
		}

		this.goTo(0);
	}

	stored () {
		return localStorage.getItem(this.key);
	}

	store (value) {
		if (value === null) {
			localStorage.removeItem(this.key);
		}
		else {
			localStorage.setItem(this.key, value);
		}
	}

	/** What the user actually sees: an override if there is one, otherwise whatever the OS says. */
	resolved () {
		return this.stored() ?? this.os;
	}

	/**
	 * The entire argument of the article. The comparison against the OS happens here and nowhere else,
	 * so an override that later coincides with the OS is kept rather than quietly discarded.
	 */
	prefer (target) {
		this.store(target === this.os || target === "os" ? null : target);
	}

	/*
	 * Steps and live controls alike funnel through this DSL: "actor: value" sets the OS or the
	 * page's control to a scheme: light, dark, os (follow the OS), or a negation — "!os" / "!page",
	 * the opposite of what that one currently shows.
	 */
	act (action) {
		let [actor, value] = action.split(":").map(part => part.trim());
		let target = value === "!os" ? other(this.os)
			: value === "!page" ? other(this.resolved())
			: value;

		if (actor === "os") {
			this.os = target;
		}
		else {
			this.prefer(target);
		}
	}

	// data-editable grants the reader controls: the listed ones, or all of them when the attribute is bare.
	freeform () {
		return this.stepEls[this.step].dataset.editable === "";
	}

	editable (control) {
		return this.freeform() || (this.stepEls[this.step].dataset.editable ?? "").split(" ").includes(control);
	}

	/** Replays the ripple click cue on a control; the class stays, since the rings rest invisible. */
	ripple (control) {
		control.classList.remove("rippling");
		void control.offsetWidth;
		control.classList.add("rippling");
	}

	/** Replays the real algorithm from the start rather than storing per-step outcomes. */
	goTo (target) {
		this.step = target;
		this.os = this.start;
		this.store(null);

		for (let i = 1; i <= this.step; i++) {
			let action = this.stepEls[i].dataset.action;

			if (action) {
				this.act(action);
			}
		}

		this.render();
	}

	render () {
		let values = { start: this.start, other: other(this.start) };
		// Only "page" steps — the reader acting on the page's control — show the hand.
		let acting = Boolean(this.stepEls[this.step].dataset.action?.startsWith("page"));

		this.svg.style.setProperty("--os", this.os);
		this.svg.style.setProperty("--site", this.stored() ?? "system");

		// The prose is written against the starting scheme, so flipping step 0 rewrites the whole walkthrough.
		for (let el of this.stepList.querySelectorAll("[data-value]")) {
			el.textContent = values[el.dataset.value];
		}

		for (let [i, li] of this.stepEls.entries()) {
			li.classList.toggle("done", i < this.step);
			li.classList.toggle("current", i === this.step);
			li.querySelector("button").setAttribute("aria-current", i === this.step ? "step" : "false");
		}

		// When the list is the scrolling part of a stacked layout, keep the current step in view —
		// but never before the reader has interacted: at load, scrollIntoView escapes the iframe and
		// drags the parent article down to the demo, clobbering its hash navigation.
		// container scopes the scroll to the list in browsers that support it.
		if (navigator.userActivation.hasBeenActive) {
			this.stepEls[this.step].scrollIntoView({ block: "nearest", container: "nearest" });
		}

		// The pointer parks on the control for the whole step; the press is momentary, like a real click.
		this.pointer.classList.toggle("acted", acting);
		clearTimeout(this.pressTimer);
		this.siteGroup.classList.toggle("pressed", acting);

		if (acting) {
			this.pressTimer = setTimeout(() => this.siteGroup.classList.remove("pressed"), PRESS);
			this.ripple(this.siteControl);
		}

		// A control is only editable if the step grants it; anywhere else a click would contradict the prose.
		this.osControl.disabled = !this.editable("os");
		this.siteControl.disabled = !this.editable("page");
		this.osControl.setAttribute("aria-label", `Operating system appearance: ${this.os}.${this.osControl.disabled ? "" : " Activate to switch."}`);
		this.siteControl.setAttribute("aria-label", `Page appearance: ${this.resolved()}.${this.siteControl.disabled ? "" : " Activate to switch."}`);

		// Past the end there is nowhere further to go, so the same button starts over.
		this.prev.disabled = this.step === 0;
		this.next.textContent = this.step === this.last ? "Restart" : "Next";
		this.next.classList.toggle("restart", this.step === this.last);
		this.next.setAttribute("aria-label", this.step === this.last ? "Restart the walkthrough" : "Next step");

		this.status.textContent = `${this.freeform() ? "Freeform" : `Step ${this.step} of ${this.numbered}`}. Page is ${this.resolved()}. OS is ${this.os}. Stored override: ${this.stored() ?? "none"}.`;
	}
}

customElements.define("theme-scenario", ThemeScenario);
