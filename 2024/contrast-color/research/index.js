import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import Color from "https://colorjs.io/dist/color.js";
import {
	nextFrame,
	getBlankStats,
	levels,
	getLevel,
} from "./util.js";

let white = new Color("white");
let black = new Color("black");

let coords = {
	l: {min: 0, max: 1, step: .01},
	c: {min: 0, max: .4, step: .05},
	h: {min: 0, max: 359, step: 2},
};

let params = new URLSearchParams(location.search);
for (let coord of ["c", "h"]) {
	if (params.get(coord)) {
		let [min, max, step] = params.get(coord).split(",");
		let constraints = {min, max, step};
		for (let constraint in constraints) {
			let value = constraints[constraint];
			if (value >= 0) {
				coords[coord][constraint] = Number(value);
			}
		}
	}
}

globalThis.app = createApp({
	data () {
		return {
			progress: 0,
			status: "Not started",
			step: 0.1,
			coords,
			current: {},
			stats: getBlankStats(),
		};
	},

	// mounted () {
	// 	this.iterate();
	// },

	computed: {
		brackets () {
			let {WCAG21, APCA} = this.stats;
			return {
				compliance: [
					WCAG21.black.fail[1], // black passes above this
					WCAG21.white.fail[0], // white passes below this
				],
				readable_white: [
					APCA.black.best[0], // below this is best
					APCA.white.fail[0], // below this is adequate
				],
				readable_black: [
					APCA.black.fail[1], // above this is adequate
					APCA.white.best[1], // above this is best
				],
			}
		},

		bounds () {
			let bounds = new Set(Object.values(this.brackets).flat().sort((a, b) => a - b));
			return [0, ...bounds, 1];
		},

		compliance_bounds () {
			let bounds = this.bounds.slice(1).map((max, i) => [this.bounds[i], max]);
			return {
				white: bounds.map(([min, max]) => this.check_compliance("white", min, max)),
				black: bounds.map(([min, max]) => this.check_compliance("black", min, max)),
			}
		},

		readability_bounds () {
			let bounds = this.bounds.slice(1).map((max, i) => [this.bounds[i], max]);
			return {
				white: bounds.map(([min, max]) => this.check_readability("white", min, max)),
				black: bounds.map(([min, max]) => this.check_readability("black", min, max)),
			}
		},

	},

	methods: {
		check_compliance (color, min, max) {
			let {WCAG21} = this.stats;
			if (color === "white") {
				for (let i = levels.length - 2; i >= 0; i--) {
					let level = levels[i];
					if (max <= WCAG21.white[level][0]) {
						return levels[i + 1];
					}
				}
			}
			else {
				for (let i = levels.length - 2; i >= 0; i--) {
					let level = levels[i];
					if (min >= WCAG21.black[level][1]) {
						return levels[i + 1];
					}
				}
			}

			return false;
		},

		check_readability (color, min, max) {
			let l = (min + max) / 2;
			if (color === "white") {
				return l < this.brackets.readable_white[0] ? "best" : l < this.brackets.readable_white[1] ? "ok" : "unknown";
			}
			else {
				return l > this.brackets.readable_black[1] ? "best" : l > this.brackets.readable_black[0] ? "ok" : "unknown";
			}
		},

		percent (number, maximumFractionDigits = 1) {
			if (number === null || number === undefined) {
				return "";
			}

			return number.toLocaleString("en", {
				style: "percent",
				minimumFractionDigits: 0,
				maximumFractionDigits,
				trailingZeroDisplay: "stripIfInteger",
			});
		},

		start () {
			this.progress = 0;
			this.status = "Started";
			this.stats = getBlankStats();
			this.step = 0.1;
			this.iterate();
		},

		done () {
			this.status = "Done!";
			this.current = {};
		},

		async iterate (step = 0.1) {
			this.step = step;
			this.status = `Calculating with step = ${ step }…`;

			if (step < 0.001) {
				this.done();
				return;
			}

			let { coords, stats } = this;
			let maximumFractionDigits = Math.max(0, Math.ceil(Math.log10(1 / step)));

			let i = 0;
			for (let l = coords.l.min; l <= coords.l.max; l += step) {
				i++;
				if (l > 0 && i % 10 === 0) {
					// We already have this level from the previous iteration
					continue;
				}

				this.status = `L = ${ this.percent(l, maximumFractionDigits) }`;

				for (let c = coords.c.min; c <= coords.c.max; c += coords.c.step) {
					for (let h = coords.h.min; h <= coords.h.max; h += coords.h.step) {
						Object.assign(this.current, {l, c, h});
						let colorStr = `oklch(${l} ${c} ${h})`;
						let color = new Color(colorStr);

						for (let algo in stats) {
							this.calculateMinMax(algo, color);
						}
					}
				}

				this.progress += step;
				await nextFrame();
			}

			// Next iteration
			this.iterate(step / 10);
		},

		calculateMinMax (algo, color) {
			let { stats } = this;

			let contrastWhite = Math.abs(color.contrast(white, algo));
			let contrastBlack = Math.abs(color.contrast(black, algo));
			let textColor = (contrastBlack > contrastWhite) ? black : white;

			// let l = Math.round(color.get("l") * 1000)/10;
			let l = color.get("l");

			this.contrastRange(l, stats[algo][textColor === black ? "black" : "white"], "best");
			this.contrastRange(l, stats[algo].black, getLevel(algo, contrastBlack));
			this.contrastRange(l, stats[algo].white, getLevel(algo, contrastWhite));
		},

		contrastRange (l, obj, prop) {
			l = +l.toPrecision(4);
			obj[prop] ??= [Infinity, -Infinity];

			if (l < obj[prop][0]) {
				obj[prop][0] = l;
			}

			if (l > obj[prop][1]) {
				obj[prop][1] = l;
			}
		},
	},

	watch: {
		"coords.c": {
			deep: true,
			handler () {
				let url = new URL(location);
				url.searchParams.set("c", Object.values(this.coords.c).join(","));
				history.replaceState(null, "", url);
			},
		},
		"coords.h": {
			deep: true,
			handler () {
				let url = new URL(location);
				url.searchParams.set("h", Object.values(this.coords.h).join(","));
				history.replaceState(null, "", url);
			},
		},
	},
}).mount(document.body);


