---
title: "Color contrast, automatic text color, and compliance vs readability"
toc: true
draft: true
tags:
  - css
  - color
  - a11y
  - specs
---

<div class=nutshell>

Can we emulate the upcoming CSS [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color) function via CSS features that have already widely shipped?
And if so, what are the tradeoffs involved and how should to best balance them?
</div>

## Relative Colors

Out of all the [CSS features I designed](/specs/), [Relative Colors](/specs/#relative-colors) aka _Relative Color Syntax_ (RCS) is definitely in the top 5 of those I’m most proud of.
In a nutshell, they allow CSS authors to derive a new color from an existing color value by doing arbitrary math on color components:

```css
--color-lighter: oklch(from var(--color) calc(l * 1.2) c h);
--color-alpha-50: oklab(from var(--color) l a b / 50%);
```

The elevator pitch was that by allowing these kinds of lower level operations, they provide flexibility on how color variations are derived,
giving us more time to figure out what the appropriate higher level primitives should be.

As of May 2024, RCS has [shipped in every browser except Firefox](https://caniuse.com/css-relative-colors),
but given that it is an [Interop 2024 focus area](https://web.dev/blog/interop-2024),
that [Firefox has expressed a positive standards position](https://mozilla.github.io/standards-positions/#css-relative-color-syntax),
and that the [Bugzilla issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1701488) has had some recent activity and has been assigned,
I would expect it to ship there soon as well, making it [Baseline](https://web.dev/baseline) soon after.

Most [Relative Colors tutorials](https://developer.chrome.com/blog/css-relative-color-syntax)
revolve around its primary driving use cases:
making tints and shades or other color variations by tweaking a specific color component up or down,
and/or overriding a color component with a fixed value.
While this does indeed address some very common pain points,
it is merely scratching the surface of what is possible with RCS.
This article aims to explore a more advanced use case.

## `contrast-color()`

A big longstanding CSS pain point is that there is no way to specify a text color that is automatically guaranteed to be readable over an arbitrary background color, e.g. white on darker backgrounds and black on lighter backgrounds.

Why would one need that?
The primary use case is when colors are outside the control over the CSS author.
This includes:
- Colors defined by the end-user. An example you’re likely familiar with: GitHub labels. Think of how you select an arbitrary color when creating a label and GitHub automatically picks the text color — often poorly (we’ll see why in a bit)
- Colors defined by another developer. E.g. you’re writing a web component that supports certain CSS variables for styling.
You *could* require separate variables for the text and background, but that reduces the usability of your web component by making it more of a hassle to use.
Wouldn’t it be great if it could just use a [sensible default](https://www.nngroup.com/articles/slips/), that you can, but rarely need to override?
- Colors defined by an external design system, like [Open Props](https://open-props.style/).

But even in a codebase where a single author controls everything, it can improve modularization and code reuse.

The good news is that this is actually coming, as the CSS function [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color).
This is not new, you may have heard of it as `color-contrast()` before, an earlier name.
I [recently drove consensus to scope it down to an MVP](https://github.com/w3c/csswg-drafts/issues/9166) that addresses the most prominent pain points and can actually ship soonish,
as it circumvents some very difficult design decisions that had caused the full-blown feature to stall.

Usage will look like this:

```css
background: var(--color);
color: contrast-color(var(--color));
```

Glorious, isn’t it?
Of course, soonish in spec years is still, well, years.
As a data point, you can see in [my past spec work](/specs/) that with a bit of luck (and browser interest), it can take as little as 2 years to get a feature shipped across all major browsers after it’s been specced.
But 2 years is also a long time (and it could be longer).
Is there any recourse until then?

As you may have guessed from the title, the answer is yes.
It may not be pretty, but there is a way to emulate `contrast-color()` (or something close to it) using Relative Colors.

## Using RCS to automatically compute a contrasting text color

In the following we will use the [OKLCh color space](), which is the most [perceptually uniform]() [polar color space]() that CSS supports.

Let’s assume there is a Lightness value above which black text is guaranteed to be readable regardless of the chroma and hue,
and below which white text is guaranteed to be readable.
We will validate that assumption later, but for now let’s take it for granted.
In the rest of this article, we’ll call that value the **threshold**.
For now we will use `0.7`, but will compute it more rigorously in the next section.
Let’s assign it to a variable:

```css
--l-threshold: 0.7;
```

Most RCS examples in the wild use `calc()` with simple additions and multiplications.
However, **any math function supported by CSS is actually fair game**, including `clamp()`, trigonometric functions, and many others.
For example, if you wanted to create a lighter tint of a core color with RCS, you could do something like thi:

```css
background: oklch(from var(--color) 90% clamp(0, c, 0.1) h);
```

Let’s work bakwards from the desired result.
We want to come up with an expression that is composed of CSS math functions already supported widely
and will return `1` if `l` &le; var(--l-threshold)` and `0` if otherwise.
Then we could use that value as the lightness of a new color:

```css
--l: /* ??? */;
color: oklch(var(--l) 0 0);
```

The CSS math functions that are widely supported are:
- `calc()`
- `min()`, `max()`, `clamp()`
- [Trigonometric functions](https://drafts.csswg.org/css-values-4/#trig-funcs) (`sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, `atan2()`
- [Exponential functions](https://drafts.csswg.org/css-values-4/#exponent-funcs) (`exp()`, `log()`, `log2()`, `log10()`, `sqrt()`)

We can simplify the task a bit:
if we can manage to find an expression that will be negative when `l` > `var(--l-threshold)` and > 1 when `l` &le; `var(--l-threshold)`,
we can use `clamp(0, var(--l), 1)` to get the desired result.

One idea would be to use ratios.
The ratio of `var(--l-threshold) / l` is > 1 for `l` &le; `var(--l-threshold)` and < 1 when `l` > `var(--l-threshold)`.
This means that if we subtract `1`, it will give us a negative number for `l > var(--l-threshold)` and a positive one for `l <= var(--l-threshold)`.
Then all we need to do is multiply that expression by a huge number so that the positive number is guaranteed to be over 1.

Putting it all together, it looks like this:

```css
--l-threshold: 0.7;
--l: clamp(0, (var(--l-threshold) / l - 1) * infinity, 1);
color: oklch(from var(--color) var(--l) 0 h);
```

One worry might be that if L gets close enough to the threshold we may get a number between 0 - 1,
but in my experiments this never happened, presumably since precision is finite.

## Does this mythical threshold actually exist?

In the previous section we’ve made a pretty big assumption:
That there is a L value above which black text is guaranteed to be readable regardless of the chroma and hue,
and below which white text is guaranteed to be readable.
It is time to put this claim to the test.

When people first year about perceptually uniform color spaces like [LCH]() and its improved version, [OKLCH](),
they imagine that they can infer the contrast between two colors by simply comparing their L values.
This is unfortunately not true, as contrast depends on more factors than perceptual lightness.
However, there is certainly _significant_ correlation between Lightness values and contrast.

At this point, I should point out that while most people are aware of the WCAG 2.1 contrast algorithm,
which is part of the Web Content Accessibility Guidelines and baked into law in many countries,
**it has been known for a while that its results are actually quite poor**.
So bad in fact that in some tests it [performs almost as bad as random chance](https://www.cedc.tools/article.html).
There is a newer contrast algorithm, [APCA](https://apcacontrast.com/) that produces _far_ better results,
but is not yet part of any standard or legislation, and there have previously been some bumps along the way with making it freely available to the public (which seem to be largely resolved).

This means that creating accessible color pairings should ideally be a two step process:
- Use APCA to ensure **actual readability**
- **Compliance failsafe**: Ensure the result does not actively _fail_ WCAG 2.1

I ran [some quick experiments](research/) using [Color.js](https://colorjs.io) where I iterate over the OKLCh reference range (loosely based on the P3 gamut)
in increments of increasing granularity and calculate the lightness ranges for colors where white was the "best" text color (= produced higher contrast than black) and vice versa.
I also compute the brackets for each level (fail, AA, AAA, AAA+) for both APCA and WCAG.

This is <a href="research/?c=0,0.4,0.025&h=0,359,1">the table produced with C ∈ [0, 0.4\] (step = 0.025) and H ∈ [0, 360) (step = 1)</a>:

<table>
	<thead><tr><th rowspan="2">Text color</th><th rowspan="2">Level</th><th colspan="2">APCA</th><th colspan="2">WCAG 2.1</th></tr><tr><th>Min</th><th>Max</th><th>Min</th><th>Max</th></tr></thead>
	<tbody class="white">
		<tr class="best"><th rowspan="5">white</th><td>best</td><td>0%</td><td>75.2%</td><td>0%</td><td>61.8%</td></tr>
		<tr class="fail"><td>fail</td><td>71.6%</td><td>100%</td><td>62.4%</td><td>100%</td></tr>
		<tr class="aa"><td>AA</td><td>62.7%</td><td>80.8%</td><td>52.3%</td><td>72.1%</td></tr>
		<tr class="aaa"><td>AAA</td><td>52.6%</td><td>71.7%</td><td>42%</td><td>62.3%</td></tr>
		<tr class="aaa+"><td>AAA+</td><td>0%</td><td>60.8%</td><td>0%</td><td>52.7%</td></tr>
	</tbody>
	<tbody class="black">
		<tr class="best"><th rowspan="5">black</th><td>best</td><td>66.1%</td><td>100%</td><td>52%</td><td>100%</td></tr>
		<tr class="fail"><td>fail</td><td>0%</td><td>68.7%</td><td>0%</td><td>52.7%</td></tr>
		<tr class="aa"><td>AA</td><td>60%</td><td>78.7%</td><td>42%</td><td>61.5%</td></tr>
		<tr class="aaa"><td>AAA</td><td>69.4%</td><td>87.7%</td><td>51.4%</td><td>72.1%</td></tr>
		<tr class="aaa+"><td>AAA+</td><td>78.2%</td><td>100%</td><td>62.4%</td><td>100%</td></tr>
	</tbody>
</table>

Note that these are the min and max L values for each level.
E.g. the fact that white text *can* fail WCAG when L ∈ [62.4%, 100%] doesn’t mean that *every* color with L > 62.4% will fail WCAG,
just that *some* do.
So, we can only draw meaningful conclusions by inverting the logic:
Since all white text failures are with L ∈ [62.4%, 100%], it logically follows that if L < 62.4%, white text will pass WCAG
regardless of what the color is.

By applying this logic to all ranges, we can draw similar guarantees for many of these brackets (OK = pass but not best, ❌ = no guarantee either way):

<table><thead><tr><th colspan="2"></th><th><span class="divider before">0%</span> to <span class="divider after">52.7%</span></th><th><span class="divider before">52.7%</span> to <span class="divider after">62.4%</span></th><th><span class="divider before">62.4%</span> to <span class="divider after">66.1%</span></th><th><span class="divider before">66.1%</span> to <span class="divider after">68.7%</span></th><th><span class="divider before">68.7%</span> to <span class="divider after">71.6%</span></th><th><span class="divider before">71.6%</span> to <span class="divider after">75.2%</span></th><th><span class="divider before">75.2%</span> to <span class="divider after">100%</span></th></tr></thead><tbody><tr><th rowspan="2"> Compliance <small>WCAG 2.1</small></th><th>white</th><td class="pass">✅ AA</td><td class="pass">✅ AA</td><td class="fail">❌</td><td class="fail">❌</td><td class="fail">❌</td><td class="fail">❌</td><td class="fail">❌</td></tr><tr><!--v-if--><th>black</th><td class="fail">❌</td><td class="pass">✅ AA</td><td class="pass">✅ AAA</td><td class="pass">✅ AAA</td><td class="pass">✅ AAA</td><td class="pass">✅ AAA</td><td class="pass">✅ AAA+</td></tr><tr><th rowspan="2"> Readability <small>APCA</small></th><th>white</th><td class="pass">😍 Best</td><td class="pass">😍 Best</td><td class="pass">😍 Best</td><td class="ok">🙂 Adequate</td><td class="ok">🙂 Adequate</td><td class="fail">😶 Unknown</td><td class="fail">😶 Unknown</td></tr><tr><!--v-if--><th>black</th><td class="fail">😶 Unknown</td><td class="fail">😶 Unknown</td><td class="fail">😶 Unknown</td><td class="fail">😶 Unknown</td><td class="ok">🙂 Adequate</td><td class="ok">🙂 Adequate</td><td class="pass">😍 Best</td></tr></tbody></table>



You may have noticed that in general, APCA favors white text more,
while WCAG has many positives for colors where white text would result in better readability.
This is a known issue with the WCAG algorithm.

<figure>
<div style="padding: .5em 1em; background: hsl(180 62% 40%); color: white">Some text</div>
<div style="padding: .5em 1em; background: hsl(180 62% 40%); color: black">Some text</div>
<figcaption>Which of the two seems more readable?
You may be surprised to find that the white text fails WCAG 2.1,
while the black text passes AAA!
</figcaption>
</figure>

Therefore, to best balance readability and compliance, we should use the highest threshold we can get away with.
This means:
- If passing WCAG is a requirement, the highest threshold we can use is **62.3%**.
- If actual readability is our only concern, we can safely ignore WCAG and pick a threshold somewhere between 68.7% and 71.6%, e.g. **70%**.

Here’s a demo so you can see how they both play out.
Edit the color below (hint: use your keyboard arrow keys to quickly move through the whole range of each coordinate) to see how the two thresholds work in practice.
You can write any valid CSS color in the text field, though a polar format like OKLCh might work best.

<script src="https://elements.colorjs.io/src/color-swatch/color-swatch.js" type="module"></script>
<style>
.contrast-color {
	--l: clamp(0, (var(--l-threshold) / l - 1) * infinity, 1);
	color: oklch(from var(--color) var(--l) 0 h);
}
</style>

<color-swatch size="large">
	<div slot="swatch">
		<div class="contrast-color" style="--l-threshold: 0.7;">Threshold = 70%</div>
		<div class="contrast-color" style="--l-threshold: 0.623;">Threshold = 62.3%</div>
	</div>
	<input value="oklch(65% 30% 180)" />
</color-swatch>

Note that if your actual color is more constrained (e.g. a subset of hues or chromas),
you might be able to balance these tradeoffs better by using a different threshold.
Run the experiment yourself with your actual range of colors and find out!

Here are some examples of narrower ranges I have tried and the highest threshold that still passes WCAG 2.1:

| Description | Color range | Threshold |
|-------------|-------------|-----------|
| Neutrals | [C ∈ [0, 0.03]](research/?c=0,0.03,0.01) | 67% |
| Muted colors | [C ∈ [0, 0.1]](research/?c=0,0.1,0.01) | 65.6% |
| Warm colors (reds/oranges/yellows) | [H ∈ [0, 100]](research/?h=0,100,1) | 66.8% |
| Pinks/Purples | [H ∈ [300, 370]](research/?h=300,370,1) | 67% |

## Future work

This is only a start, I can imagine many directions for improvement:
- Keep in mind that RCS allows us to do math with *any* of the color components,
in *any* component. Could a formula that takes `c` and `h` into account be better?
- Currently we only calcualte thresholds for white and black text.
However, in real designs, we rarely want pure black text.
How would this extend to darker tints of the background color?