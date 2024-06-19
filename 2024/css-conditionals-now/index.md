---
title: Inline conditionals in CSS, now?
draft: true
toc: true
tags:
  - css
  - web-components
  - css-variables
---

Yesterday I posted about the recent [CSS WG resolution to add an `if()` function to CSS](../css-conditionals/).
Great as it may be, this is still a long way off, two years if everything goes super smoothly, more if not.
So what can you do when you need conditionals *right now*?

You may be pleased to find that you’re not _completely_ out of luck.
There is a series of brilliant, horrible hacks that enable you to expose the kinds of higher level custom properties that conditionals typically enable.

## Using hacks in production?!

The instinctive reaction many developers have when seeing hacks like these is “Nice hack, but can’t _possibly_ ever use this in production”.
This sounds reasonable on the surface (keeping the codebase maintainable is a worthy goal!) but
when examined deeply, it reflects the wrong order of priorities,
prioritizing developer convenience over user convenience.

The [TAG](https://en.wikipedia.org/wiki/Technical_Architecture_Group) maintains a [Web Platform Design Principles](https://www.w3.org/TR/design-principles/) document [^1]
that everyone designing APIs for the web platform is supposed to read and follow.
I’m a strong believer in having published Design Principles, for any product.
They help stay on track, and remember what the big picture vision is, which is otherwise easy to lose in the day to day minutiae.
One of the core principles in the document is the [Priority of Constituencies](https://www.w3.org/TR/design-principles/#priority-of-constituencies).
The core of it is:

> User needs come before the needs of web page authors, which come before the needs of user agent implementors, which come before the needs of specification writers, which come before theoretical purity.

Like all principles, this isn’t absolute.
A small gain in user convenience is not a good tradeoff when it requires tremendous implementation complexity.
But it’s a good north star as a rule of thumb.

The TAG did not invent this principle; it is well known in UX and Product circles with a number of different wordings:
- “Put the pain on those who can bear it”
- Prefer internal complexity over external complexity

Why is that? Several reasons:
- It is _far_ easier to change the implementation than to change the user-facing API, so it’s worth making sacrifices to keep it clean from the get go.
- Most products (in the general sense) have way more users than developers, so this minimizes collective pain.
- Internal complexity can be managed far more easily, with tooling or even good comments.
- Managing complexity internally localizes it and contains it better.
- Once the underlying platform improves, only one codebase needs to be changed to reap the benefits.

[^1]: I’ve always thought this was our most important deliverable, and pushed for prioritizing it. Recently, I even became editor of it. 🙃

The corollary is that if hacks allow you to expose a nicer API to component users, it may be worth the increase in internal complexity (to a degree).
Just make sure that part of the code is well commented, and keep track of it so you can return to it once the platform has evolved to not require a hack anymore.

## The current state of the art

There is a host of hacks and workarounds that people have come up with to make up for the lack of inline conditionals in CSS, with the first one dating back to 2016.

### Binary Linear Interpolation

This was [first documented by Roma Komarov in 2016](https://kizu.dev/conditions-for-css-variables/), and has since been used in a number of creative ways.
The gist of this method is to use essentially the [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) formula for mapping $[0, 1]$ to $[a, b]$:

$$p \times a + (1 - p) \times b$$

However, instead of using this to map a range to another range,
we use it to map two points to two other points,
basically the two extremes of both ranges: $p=0$ and $p=1$ to select $a$ and $b$ respectively.

This was Roma’s original example:

```css
:root {
		--is-big: 0;
}

.is-big {
		--is-big: 1;
}

.block {
		padding: calc(
				25px * var(--is-big) +
				10px * (1 - var(--is-big))
		);
		border-width: calc(
				3px * var(--is-big) +
				1px * (1 - var(--is-big))
		);
}
```

He even expands it to multiple conditions by multiplying the interpolation factors.
E.g. this code snippet to map `0` to `100px`, `1` to `20px`, and `2` to `3px`:

```css
.block {
		padding: calc(
				100px * (1 - var(--foo)) * (2 - var(--foo)) * 0.5 +
				20px  * var(--foo) * (2 - var(--foo)) +
				3px   * var(--foo) * (1 - var(--foo)) * -0.5
		);
}
```

Which these days could be rewritten as:

```css
.block {
		--if-not-0: min(max(0 - var(--foo), var(--foo) - 0), 1);
		--if-not-1: min(max(1 - var(--foo), var(--foo) - 1), 1);
		--if-not-2: min(max(2 - var(--foo), var(--foo) - 2), 1);

		--if-0: var(--if-not-1) * var(--if-not-2);
		--if-1: var(--if-not-0) * var(--if-not-2);
		--if-2: var(--if-not-0) * var(--if-not-1);

		padding: calc(
				100px * var(--if-0) +
				20px  * var(--if-1) +
				3px   * var(--if-2)
		);
}
```

Back then, `min()` and `max()` were not available, so he had to divide each factor by an obscure constant to make it equal to 1 when it was not `0`.
Once `abs()` ships this will be even simpler (the inner `max()` is basically getting the absolute value of `N - var(--foo)`)

Ana Tudor also wrote about this in 2018, in this very visual article: [DRY Switching with CSS Variables](https://css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration/).

### Toggles (Space Toggle, Cyclic Toggles) { #toggles }

This was independently discovered by Ana Tudor ([c. 2017](https://twitter.com/anatudor/status/1284160219963170816)),
Jane Ori [in April 2020](https://twitter.com/Jane0ri/status/1282303255826046977) (who gave it the name “Space Toggle”),
David Khoursid (aka David K Piano) in [June 2020](https://twitter.com/DavidKPiano/status/1284163706016927746) (he [called it](https://twitter.com/DavidKPiano/status/1284155737720205313) prop-and-lock),
and yours truly in [Oct 2020](https://lea.verou.me/blog/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/) (I called it the --var: ; hack, arguably the worst name of the three 😅).

The core idea is that `var(--foo, fallback)` is actually a very limited form of conditional: if `--foo` is `initial` (or IACVT), it falls back to `fallback`, otherwise it’s `var(--foo)`.
Furthermore, we can set custom properties (or their fallbacks) to empty values to get them to be ignored when used as part of a property value.
It looks like this:

```css
:root {
	--if-success: ;
	--if-warning: ;
}
.success {
	--if-success: initial;
}

.warning {
	--if-warning: initial;
}

.callout {
	background:
		var(--if-success, var(--color-success-90))
		var(--if-warning, var(--color-warning-90));
}
```

One of the downsides of this version is that it only supports two states per variable.
Note how we needed two variables for the two states.
Another downside is that there is no way to specify a fallback if none of the relevant variables are set.
In the example above, if neither `--if-success` nor `--if-warning` are set, the `background` declaration will be empty, and thus become IACVT which will make it `transparent`.

In 2023, Roma Komarov expanded the technique into what he called [“Cyclic Dependency Space Toggles”](https://kizu.dev/cyclic-toggles/) which
addresses both limitations:
it supports any number of states,
and allows for a default value.
The core idea is that variables do not only become `initial` when they are not set, or are explicitly set to `initial`,
but also when cycles are encountered.

<aside class=info>
What is a cycle? A cycle is when a variable references itself, either directly or indirectly.
The most trivial cycle is `--foo: var(--foo);`, but they can have any number of steps, e.g.:

```css
--foo: var(--bar);
--bar: var(--baz);
--baz: var(--foo);
```
</aside>

Roma’s technique depends on this behavior by producing cycles on all but one of the variables used for the values.
It looks like this:

```css
.info {
	--level: var(--level--default);

	--level--default: var(--level,);
	--level--success: var(--level,);
	--level--warning: var(--level,);
	--level--error:	 var(--level,);

	background:
		var(--level--default, lavender)
		var(--level--success, palegreen)
		var(--level--warning, khaki)
		var(--level--error,	 lightpink);
}
```

And is used like this:

```css
.my-warning {
	--level: var(--level--warning);
}
```

### Paused animations

The core idea behind this method is that paused animations (`animation-play-state: paused`) can still be advanced by setting `animation-delay` to a negative value.
For example in an animation like `animation: 100s foo`, you can access the 50% mark by setting `animation-delay: -50s`.
It’s trivial to transform raw numbers to time values, so this can be abstracted to plain numbers for the user-facing API.

Here is a simple example to illustrate how this works:

```css
@keyframes color-mixin {
	0% { background: var(--color-neutral-90); border-color: var(--color-neutral-80); }
	25% { background: var(--color-success-90); border-color: var(--color-success-80); }
	50% { background: var(--color-warning-90); border-color: var(--color-warning-80); }
	75% { background: var(--color-danger-90); border-color: var(--color-danger-80); }
}

button {
	animation: foo 100s calc(var(--variant) * -100s / 4 ) infinite paused;
}
```

Used like:
```css
.error button {
	--variant: 2;
}
```

This is merely to illustrate the core idea, having a `--variant` property that takes numbers is not a good API!
Though the numbers could be aliased to variables.

This technique seems to have been [first documented by me in 2015](https://youtu.be/eVnUDTtOLE0?t=1167), during a talk about …pie charts.
I never bothered writing about it, but [someone else did](https://au.si/css-conditions-today), 4 years later.
Roma Komarov [independently discovered this in 2018](https://codepen.io/kizu/pen/vVNpXj), but never wrote about it either.

To ensure you don’t get slightly interpolated values due to precision issues, you could also slap a `steps()` in there:

```css
button {
	animation: foo 100s calc(var(--variant) * -100s / 4 ) infinite paused steps(4);
}
```

This is especially useful when 100 divided by your number of values produces repeating decimals,
e.g. 3 steps means your keyframes are at increments of `33.33333%`.

A benefit of this method is that defining each state is done with regular declarations, not involving any weirdness.
It does also have some obvious downsides are:
- Values restricted to numbers
- Takes over the `animation` property, so you can’t use it for actual animations.

### Type Grinding via `@property` { #type-grinding }

So far all of these methods impose constraints on the API exposed by these custom properties:
numbers by the linear interpolation method and weird values that have to be hidden behind variables
for the space toggle and cyclic toggle methods.

In October 2022, Jane Ori was the first one to discover a method that actually allows us to support plain keywords,
which is what the majority of these use cases needs.
She called it [“CSS-Only Type Grinding”](https://www.bitovi.com/blog/css-only-type-grinding-casting-tokens-into-useful-values).

Its core idea is if a custom property is registered (via either `@property` or `CSS.registerProperty()`),
assigning values to it that are not valid for its syntax makes it IACVT (Invalid at computed value time) and it falls back to its initial (or inherited) value.

She takes advantage of that to progressively transform keywords to other keywords or numbers through a series of intermediate registered custom properties,
each substituting one more value for another.

I was recently independently experimenting with a similar idea.
It started from a use case of one of my components where I wanted to implement a `--size` property with two values: `normal` and `large`.
Style queries could *almost* get me there, but I also needed to set `flex-flow: column` on the element itself when `--size` was `large`.

The end result takes N + 1 `@property` rules, where N is the number of distinct values you need to support.
The first one is the rule defining the syntax of your _actual_ property:

```css
@property --size {
	syntax: "normal | large",
	initial-value: normal;
	inherits: true;
}
```

Then, you define N more rules, each progressively substituting one value for another:

```css
@property --size-step-1 {
	syntax: "row | large";
	initial-value: row;
	inherits: false;
}

@property --size-step-end {
	syntax: "row | column";
	initial-value: column;
	inherits: false;
}
```

And at the component host you daisy chain them like this:

```css
:host {
	--size-step-1: var(--size);
	--size-step-end: var(--size-step-1);
	flex-flow: var(--size-step-end);
}
```

And component consumers get a really nice API:

```css
.my-component {
	--size: large;
}
```

You can [see it in action in this codepen](https://codepen.io/leaverou/pen/OJYzQjN/c8ec7595b68381e99d38441487db546f):

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="OJYzQjN" data-pen-title="Transform keywords to other keywords (2 keyword version)" data-user="leaverou" data-token="c8ec7595b68381e99d38441487db546f" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
	<span>See the Pen <a href="https://codepen.io/leaverou/pen/OJYzQjN/c8ec7595b68381e99d38441487db546f">
	Transform keywords to other keywords (2 keyword version)</a> by Lea Verou (<a href="https://codepen.io/leaverou">@leaverou</a>)
	on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

You can use the same general idea to [transform more keywords](https://codepen.io/leaverou/pen/rNgpRMR/d5b5cb91be7a39d9a9974e3e0239e7dd)
or to [transform keywords into different sets of keywords for use in different properties](https://codepen.io/leaverou/pen/pompYrQ/75b6c0dcdfd367410011bab93fbab251).

We can also transform keywords to numbers, by replacing successive keywords with `<integer>` in the syntax, one at a time, with different initial values each time.
Here is the `--variant` example using this method:

```css
@property --variant {
	syntax: "none | success | warning | danger";
	initial-value: none;
	inherits: true;
}


@property --variant-step-1 {
	syntax: "none | <integer> | warning | danger";
	initial-value: 1;
	inherits: false;
}

@property --variant-step-2 {
	syntax: "none | <integer> | danger";
	initial-value: 2;
	inherits: false;
}

@property --variant-step-3 {
	syntax: "none | <integer>";
	initial-value: 3;
	inherits: false;
}

@property --variant-index {
	syntax: "<integer>";
	initial-value: 0;
	inherits: false;
}

.callout {
	--variant-step-1: var(--variant);
	--variant-step-2: var(--variant-step-1);
	--variant-step-3: var(--variant-step-2);
	--variant-index: var(--variant-step-3);

	/* Now use --variant-index to set other values */
}
```

Then, we can use techniques like [linear range mapping](https://forsethingvild.medium.com/lea-verous-dynamic-css-secrets-takeaways-d281218de60a#6ca0) to transform it to a length or a percentage ([generator](https://css.land/ranges/))
or [recursive `color-mix()`](https://noahliebman.net/2024/04/recursion-in-the-stylesheet/) to use that number to select an appropriate color.

In fact, when you don’t care about having a continuous color scale, the `color-mix()` code needed can be a lot simpler than that.
Here’s what I came up with to select among 4 colors, using the `--variant-index` variable from the previous example ([Full demo](https://codepen.io/leaverou/pen/rNgJoJe/d600ca13a3545837eb3acc0a0a50e5b6)):

```css
background: color-mix(in oklab,
	var(--stone-2) calc(100% * (1 - var(--variant-index))),
	color-mix(in oklab,
		var(--green-2) calc(100% * (2 - var(--variant-index))),
		color-mix(in oklab,
			var(--yellow-2) calc(100% * (3 - var(--variant-index))),
			var(--red-2)
		)
	)
);
```

### Variable animation name

In June 2023, Roma Komarov [discovered](https://codepen.io/kizu/pen/YzRXXXL) another method that allows plain keywords to be used as the custom property API.
He never wrote about it, so [this Codepen](https://codepen.io/kizu/pen/YzRXXXL) is the only documentation we have.
It’s a variation of the previous method: instead of using a single `@keyframes` rule and switching between them via `animation-delay`,
define several separate `@keyframes` rules, each named after the keyword we want to use:

```css
@keyframes success {
	from, to {
		background-color: var(--color-success-90);
		border-color: var(--color-success-80);
	}
}
@keyframes warning {
	from, to {
		background-color: var(--color-warning-90);
		border-color: var(--color-warning-80);
	}
}
@keyframes danger {
	from, to {
		background-color: var(--color-danger-90);
		border-color: var(--color-danger-80);
	}
}

.callout {
	padding: 1em;
	border: 3px solid var(--color-neutral-80);
	background: var(--color-neutral-90);
	margin: 1rem;

	animation: var(--variant) 0s paused both;
}
```

Used like:

```css
.warning {
	--variant: warning;
}
```

The obvious downsides of this method are:
- Impractical to use outside of Shadow DOM due to the potential for name clashes.
- Takes over the `animation` property, so you can’t use it for actual animations.


## So, which one is better?

I think the most important consideration is the API we expose to component users.
After all, exposing a nicer API is the whole point of this, right?
In the vast majority of cases I have seen, the north star API is a set of plain, high-level keywords.
This is only possible via [Type Grinding](#type-grinding) and [Variable animation names](#named-paused-animations).

Between the two, Type Grinding is the one providing the best encapsulation,
since it relies entirely on custom properties and does not hijack any native properties.

Unfortunately, the fact that [`@property` is not yet supported in Shadow DOM](https://codepen.io/leaverou/pen/MWdQxyG) throws a spanner in the works,
but since these intermediate properties are used for internal calculations,
we can just give them obscure names and insert them in the light DOM the first time our component is used.

On the other hand, [`@keyframes` are not only allowed, but also properly scoped when used in Shadow DOM](https://codepen.io/leaverou/pen/gOJvEMw),
so _Variable animation name_ might be a good choice when
a) it’s unlikely that users may want to apply their own animations to the element and
b) you don’t want to use the same keywords for multiple custom properties on the same component.

While (b) is a dealbreaker, you can work around (a) by defining a variable (e.g. `--essential-animations`) and instructing users to include it in their `animation` declaration if they wish to override it.
It’s not ideal, but improving DX for a majority of use cases at the cost of slightly reduced DX for a few rare cases is typically a good tradeoff.

If your custom property makes sense as a number without degrading the API (e.g. `--size` may make sense as a number, but `small | medium | large` is still better than `0 | 1 | 2`), then [Binary Linear Interpolation](#binary-linear-interpolation) is probably the most flexible method.

TBD: Maybe some kind of decision tree or scorecard or summary?