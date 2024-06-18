---
title: Inline conditionals in CSS?
date: 2024-06-18
toc: true
tags:
  - css
  - web-standards
  - css-wg
  - web-components
---

<div class="nutshell">

Last week, the CSS WG resolved to add an inline `if()` to CSS.
But what does that mean, and why is it exciting?
</div>

Last week, we had a CSS WG face-to-face meeting in A Coruña, Spain.
There is one resolution from that meeting that I’m particularly excited about:
the **consensus to add an inline `if()` to CSS**.
While I was not the first to propose an inline conditional syntax,
I did try and scope down the various nonterminating discussions into an MVP that can actually be implemented quickly,
discussed ideas with implemenators,
and eventually published a [concrete proposal](https://github.com/w3c/csswg-drafts/issues/10064) and pushed for group resolution.
Quite poetically, the relevant discussion occurred on my birthday, so in a way, I got `if()` as the most unique birthday present ever. 😀

This also comes to show that proposals being rejected is not the end-all for a given feature.
It is in fact quite common for features to be rejected for several times before they are accepted: CSS Nesting, `:has()`, container queries were all simply the last iteration in a series of rejected proposals.
`if()` itself was apparently [rejected](https://github.com/w3c/csswg-drafts/issues/3455) in 2018 with very similar syntax to what I proposed.
What was the difference? Style queries had already shipped, and we could simply reference the same syntax for conditions (plus `media()` and `supports()` from [Tab’s `@when` proposal](https://drafts.csswg.org/css-conditional/)) whereas in the 2018 proposal how conditions would work was largely undefined.

I posted about this on a variety of social media, and the response by developers has been overwhelmingly positive:

- [Twitter](https://twitter.com/LeaVerou/status/1801192208025940200)
- [LinkedIn](https://www.linkedin.com/posts/leaverou_css-values-what-is-the-mvp-for-inline-activity-7206968267087745024-1Fns)
- [Mastodon](https://front-end.social/@leaverou/112608705600433866)

I even had friends from big companies writing to tell me their internal Slacks blew up about it.
This proves what I’ve always suspected, and was part of the case I made to the CSS WG: that **this is a huge pain point**.
Hopefully the amount and intensity of positive reactions will help browsers prioritize this feature and add it to their roadmaps earlier rather than later.

Across all these platforms, besides the _“I can’t wait for this to ship!”_ sentiment being most common,
there were a few other recurring questions and a fair bit of confusion that I figured were worth addressing.

## FAQ

### What is `if()` for? Does it replace style queries?

Quite the opposite — `if()` _complements_ [style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_style_queries_2).
If you can do something with style queries, by all means, use style queries — they are almost certainly a better solution.
But there are things you simply cannot do with style queries.
Let me explain.

The motivating use case was that components (in the broader sense) often need to define _higher level custom properties_,
whose values are not just used verbatim in declarations, but that set unrelated values on a variety of declarations.

For example, consider a `--variant` custom property (inspired from [Shoelace’s `variant` attribute](https://shoelace.style/components/alert#variants)).
It could look like this:

```
--variant: success | danger | warning | primary | none;
```

This needs to set background colors, border colors, text colors, icons, etc.
In fact, it’s actual value is not used verbatim anywhere, it is _only_ used to set other values.

Style queries get us halfway there:

```css
.callout { /* or :host if in Shadow DOM */
	@container (style(--variant: success)) {
		&::before {
			content: var(--icon-success);
			color: var(--color-success);
		}
	}

	/* (other variants) */
}
```

However, style queries only work on descendants.
We cannot do this:

```css
.callout {
	@container (style(--variant: success)) {
		border-color: var(--color-success-30);
		background-color: var(--color-success-95);

		&::before {
			content: var(--icon-success);
			color: var(--color-success-05);
		}
	}

	/* (other variants) */
}
```

Often the declarations we need to set on the element itself are very few, sometimes even just one.
However, even one is one too many and makes using custom properties untenable for many (possibly most) higher level custom property use cases.
As a result, component libraries end up resorting to presentational attributes like `pill`, `outline`, `size`, etc.

While **presentational attributes** may seem fine at first glance, or even better for DX (fewer characters — at least compared to setting a variable per element),
they have several usability issues:

**Reduced flexibility**
: They cannot be conditionally applied based on selectors, media queries, etc.
Changing them requires more JS.
If they are used within another component, you’re SOL, whereas with (inheritable) custom properties, you can set the property on the parent component and it will inherit down.

**Verbosity**
: They have to be applied to individual instances, and cannot be inherited.
Even if one uses some form of templating or componentization to reduce duplication,
they still have to wade through these attributes when debugging with dev tools.

**Lack of consistency**
: Since almost every mature component *also* supports custom properties,
users have to remember which styling is done via attributes and which via custom properties.
The distinction is often arbitrary, as it’s not driven by use cases, but implementation convenience.

With `if()`, the above example becomes possible, albeit with worse ergonomics than style queries since it cannot cascade
(though I do have a [proposal](https://github.com/w3c/csswg-drafts/issues/10443) to allow it to — plus all other [IACVT](https://www.bram.us/2024/02/26/css-what-is-iacvt/) declarations):

```css
.callout {
	border-color: if(
		style(--variant: success) ? var(--color-success-30) :
		style(--variant: danger) ? var(--color-danger-30) :
		/* (other variants) */
		var(--color-neutral-30)
	);
	background-color: if(
		style(--variant: success) ? var(--color-success-95) :
		style(--variant: danger) ? var(--color-danger-95) :
		/* (other variants) */
		var(--color-neutral-95)
	);

	@container (style(--variant: success)) {
		&::before {
			content: var(--icon-success);
			color: var(--color-success-05);
		}
	}

	/* (other variants) */
}
```

While this was the primary use case, it turned out that it’s pretty easy to also make media queries and supports conditions part of `if()`’s conditional syntax.
And since it’s a function, its arguments (including the condition!) can be stored in other custom properties.
This means you can do things like this:

```css
:root {
	--xl: media(width > 1600px);
	--l: media (width > 1200px);
	--m: media (width > 800px);
}
```

and then define values like:

```css
padding: if(
	var(--xl) ? var(--size-3) :
	var(--l) or var(--m) ? var(--size-2) :
	var(--size-1)
);
```

Just like ternaries in JS, it may also be more ergonomic for cases where only a small part of the value varies:

```css
animation: if(media(prefers-reduced-motion) ? 10s : 1s) rainbow infinite;
```

### So is it in browsers yet?

Believe it or not, that was a [real question](https://twitter.com/activenode/status/1801203345257910470) I got 😅.
No, it’s not in browsers yet, and it won’t be for a while.
The most optimistic estimate is 2 years or so, _if_ the process doesn’t stall at any point (as it often does).

All we have is consensus to work on the feature.
The next steps are:
1. Reach consensus on the _syntax_ of the feature.
Syntax debates can often take a very long time, because syntax is an area where everyone has opinions.
The current debates revolve around:
	- What separators to use between the condition and the branches?
	- How to represent no value? Do we simply allow empty values like in `var()` (where you can do `var(--foo,)`)
	or [do we introduce a dedicated syntax that means "empty value"](https://github.com/w3c/csswg-drafts/issues/10441)?
	- Should the last value be optional?
2. Spec the feature.
3. Get the first implementation.
Often that is the hardest part. Once one browser implements, it is far easier to get the others on board.
4. Get it shipped across all major browsers.

I do have a [page](/specs) where I track some of my standards proposals which should help illuminate what the timeline looks like for each of these steps.
In fact, you can [track the progress of `if()`](/specs/#if-mvp) specifically there too.

<aside class="info">

Do note that these steps are not necessarily linear.
Often we spec an initial version, then resolve on a different syntax and update the spec.
Sometimes browsers even implement the early syntax, and then it changes and they have to change their implementations (as happened with [Nesting](/specs/#relaxed-css-nesting))
</aside>

<aside class="note">

**Want to make this happen faster?**
**Excited about `if()` and want to show gratitude?**
[Fund my web standards work on Open Collective](https://opencollective.com/leaverou/projects/standards-work).
I started this while writing this blog post as an experiment, and don’t plan to promote it much, but it’s there if you are so inclined.
</aside>

### Is this the first conditional in CSS?

Many responses were along the lines of "Wow, CSS is finally getting conditionals!".

Folks… CSS had conditionals from the very beginning.
Every selector is essentially a conditional!

In addition:
- `@media` and `@supports` rules are conditionals. And let’s not forget `@container`.
- `var(--foo, fallback)` is a limited type of conditional (essentially `if(style(--foo: initial) ? var(--foo) : fallback)`),
hence why it’s the basis of most [workarounds](https://github.com/w3c/csswg-drafts/issues/10064#issuecomment-2161742249) for emulating inline conditionals.

### Does this make CSS imperative?

A widespread misconception is that non-linear logic (conditionals, loops) makes a language imperative.

**Declarative vs imperative is not about logic, but level of abstraction.**
Are we describing the _goal_ or _how_ to achieve it?
In culinary terms, a recipe is imperative, a restaurant menu is declarative

Conditional logic can actually make a language *more* declarative if it helps describe intent better.

Consider the following two snippets of CSS:

<table>
<thead><tr><th>Space toggle</th><th>if()</th></tr></thead>
<tr>
<td>

```css
button {
	border-radius: calc(.2em + var(--pill, 999em));
}

.fancy.button {
	/* Turn pill on */
	--pill: initial;
}
```
</td>
<td>

```css
button {
	border-radius: if(style(--shape: pill) ? 999em : .2em);
}

.fancy.button {
	--shape: pill;
}
```
</td>
</tr>
</table>

I would argue the latter is far more declarative, i.e. much closer to specifying the goal rather than how to achieve it.

### Does this make CSS a programming language?

A very common type of response was around whether CSS is now a programming language
(either asking whether it is, or asserting that it now is).
To answer that, one first needs to answer _what_ a programming language _is_.

If it’s [Turing-completeness](https://en.wikipedia.org/wiki/Turing_completeness) that makes a language a programming language,
then [CSS has been a programming language for over a decade](https://accodeing.com/blog/2015/css3-proven-to-be-turing-complete).
But then again, [so is Excel or Minecraft](https://en.wikipedia.org/wiki/Turing_completeness#Unintentional_Turing_completeness).
So what does that even mean?

If it’s imperativeness, then no, CSS is not a programming language.
But [neither are](https://en.wikipedia.org/wiki/Declarative_programming) many actual programming languages!

But a deeper question is, _why does it matter_?
Is it because it legitimizes choosing to specialize in CSS?
It is because you can then be considered a programmer even if you only write HTML & CSS?
If this only matters for optics, then we should fix the issue at its core and fight to legitimize CSS expertise _regardless_ of whether CSS is a programming language.
After all, as anyone who knows several well-respected programming languages _and_ CSS can attest, CSS is _far_ harder to master.

