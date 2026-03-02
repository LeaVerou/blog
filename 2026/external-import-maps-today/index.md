---
title: External import maps, today!
date: 2026-03-02
toc: true
nutshell: A few weeks ago, I [posted](../web-deps/) lamenting the current state of web dependencies. Turns out that external import maps — the lack of which I had identified as a core limitation — can be emulated today!
tags:
  - js
  - tip
  - web-standards
  - web-architecture
social_posts:
  bluesky: https://bsky.app/profile/lea.verou.me/post/3mg4apwfu6c2q
  twitter: https://x.com/LeaVerou/status/2028590531853390223
  mastodon: https://front-end.social/@leaverou/116161822072997431
---


A few weeks ago, I posted [Web dependencies are broken. Can we fix them?](../web-deps/).
Today’s post is a little less gloomy:
Turns out that the major limitation that would allow centralized set-it-and-forget-it import map management can be lifted today, with excellent browser support!

The core idea is that **you can use DOM methods to inject an import map dynamically**, by literally creating an `<script type="importmap">` element in a classic (blocking) script and appending it after the injector script. 💡

**This is a gamechanger.**
It makes external import maps nice-to-have sugar instead of the only way to have centralized import map management decoupled from HTML generation.

All we need to do is build a little injector script, no need for tightly coupled workflows that take over everything.
Once you have that, it takes a single line of HTML to include it anywhere.
If you’re already using a templating system, great! You could add `<script src="importmap.js"></script>` to your `<head>` template for every page.
But you don’t *need* a templating system: even if you’re rawdogging HTML (e.g. for a simple SPA), it's no big deal to just include a `<script src="importmap.js"></script>` in there manually.

This is not even new: when the injector is a classic (non-module) script placed before any modules are fetched, **it works in every import map implementation**, all the way back to  **Chrome 89, Safari 16.4+, and Firefox 108+**!

Turns out, [JSPM](https://jspm.org/) made the same discovery: [JSPM v4 uses the same technique](https://jspm.org/jspm-4.0-release#import-map-package-management).
It is unclear why it took all of us so long to discover it but I’m glad we got there.

## How does it work?

### Basic import map injector script

First, while there is [some progress](https://shopify.engineering/resilient-import-maps) around making import maps more resilient, your best bet for maximum compatibility is for the injector script to be a good ol' blocking `<script>` that comes before everything else.
This means no `type="module"`, no `async`, no `defer` — you want to get it in before any modules start loading or many browsers will ignore it.

Then, you literally use DOM methods to create a `<script type="importmap">` and append it after the script that is injecting the import map (which you can get via `document.currentScript`).

This is a minimal example:

```js
(()=>{
	const map = {
		/* elided */
	};
	const script = Object.assign(document.createElement("script"), {
		type: "importmap",
		textContent: JSON.stringify(map)
	});
	document.currentScript.after(script);
})();
```

### Fixing relative URLs

Remember, this literally injects inline import maps in your page.
This means that **any relative URLs will be interpreted relative to the current page**!

If you’re building an SPA or your URLs are all absolute or root-relative, that’s no biggie.
But if these are relative URLs, they will not work as expected across pages.
You need to **compute the absolute URL** for each mapped URL and use that instead.
This sounds complicated, but it only adds about 5 more lines of code:

```js { data-line="5-10" }
(()=>{
	const map = {
		/* elided */
	};
	const mapUrl = document.currentScript.src;
	const rebase = m => { for (let k in m) m[k] = new URL(m[k], mapUrl).href; return m; };
	rebase(map.imports);
	for (let scope in (map.scopes ?? {})) {
		rebase(map.scopes[scope]);
	}
	const script = Object.assign(document.createElement("script"), {
		type: "importmap",
		textContent: JSON.stringify(map)
	});
	document.currentScript?.after(script);
})();
```

### Error handling

Note that `document.currentScript` is `null` in module scripts, since the same module can be loaded from different places and different scripts.
Once it becomes possible to inject import maps from a module script, you could use `import.meta.url` to get the URL of the current module.
Until then, you can use a bit of error handling to catch mistakes:

```js { data-line="5-8" }
(()=>{
	const map = {
		/* elided */
	};
	const mapUrl = document.currentScript?.src;
	if (!mapUrl) {
		throw new Error("Import map injector script must be a classic (non-module) script");
	}
	const rebase = m => { for (let k in m) m[k] = new URL(m[k], mapUrl).href; return m; };
	rebase(map.imports);
	for (let scope in (map.scopes ?? {})) {
		rebase(map.scopes[scope]);
	}
	const script = Object.assign(document.createElement("script"), {
		type: "importmap",
		textContent: JSON.stringify(map)
	});
	document.currentScript?.after(script);
})();
```

This is the minimum, since the script literally breaks if `document.currentScript` is `null`.
You could get more elaborate and warn about `async`/`defer` attributes, or if `type="module"` scripts are present before the current script.
These are left as an exercise for the reader.

## Do we still need external import maps?

While this alleviates the immediate need for [external import maps](https://github.com/whatwg/html/issues/8355), the DX and footguns make it a bit gnarly, so having first-class external import map support would still be a welcome improvement.
But even if we could do `<script type="importmap" src="...">` today, the unfortunate coupling with HTML is still at the receiving end of all this, and creates certain limitations,
such as [specifiers not working in worker scripts](https://github.com/whatwg/html/issues/8173).

My position remains that **HTML being the _only_ way to include import maps is a hack**.
I’m not saying this pejoratively.
Hacks are often okay — even necessary! — in the short term.
This particular hack allowed us to get import maps out the door and shipped quickly, without getting bogged down into [architecture astronaut](https://en.wikipedia.org/wiki/Architecture_astronaut) style discussions that can be non-terminating.

But it also created [_architectural debt_](https://www.ibm.com/think/topics/technical-debt).
These types of issues can always be patched ad hoc, but that increases complexity, both for implementers and web developers.
Ultimately, we need **deeper integration of specifiers and import maps across the platform**.
`<script type="importmap">` (with or without an `src` attribute) should become a **shortcut**, not the only way mappings can be specified.

In my earlier post, I outlined a few ideas that could help get us closer to that goal and make import maps **ubiquitous** and **mindless**.
Since they were well received, I opened issues for them:
- [Linking to import maps via an HTTP header (`Link`?)](https://github.com/whatwg/html/issues/12164)
- [`specifier:` URLs to bridge the gap between specifiers and URLs](https://github.com/whatwg/html/issues/12163)
- Since [import maps as an import attribute](https://es.discourse.group/t/bringing-import-maps-to-js-import-importmap-json-with-type-importmap/2481/10) proved out to be tricky, I also filed another proposal for a [synchronous import map API](https://github.com/whatwg/html/issues/12217).

<article class="note">

I’m linking to issues in standards repos in the interest of transparency.
Please don’t spam them, even with supportive comments (that’s what reactions are for).
Also keep in mind that the vast majority of import map improvements are meant for tooling authors and infrastructure providers — nobody expects regular web developers to author import maps by hand.
</article>

The hope is also that better platform-wide integration can pave the way for satisfying the (many!) requests to **expand specifiers beyond JS imports**.
Currently, the platform has no good story for importing non-JS resources from a package, such as styles, images, icons, etc.

But even without any further improvement, simply the fact that injector scripts are *possible* opens up so many possibilities!
The moment I found out about this I started working on **making the tool I wished had existed** to facilitate end-to-end dependency management without a build process (piggybacking on the excellent [JSPM Generator](https://jspm.org/docs/generator/) for the heavy lifting), which I will announce in a separate post very soon [^nudeps].
Stay tuned!

[^nudeps]: But if you’re particularly curious and driven, you can find it even before then, both the repo and npm package are already public 😉🤫
