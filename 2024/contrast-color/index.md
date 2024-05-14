---
title: "On using CSS to automatically pick text colors and compliance vs readability"
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

[Relative Colors](/specs/#relative-colors) (RCS) is one of the [CSS features I designed](/specs/) that I’m the most proud of.
In a nutshell, they allow CSS authors to derive a new color from an existing color value by doing arbitrary math on color components:

```css
--lighter-color: oklch(from var(--color) calc(l * 1.2) c h);
```

As of May 2024, they have [shipped in every browser except Firefox](https://caniuse.com/css-relative-colors),
but given that they are an [Interop 2024 focus area](https://web.dev/blog/interop-2024)
and that [Firefox has expressed a positive standards position](https://github.com/mozilla/standards-positions/issues/841),
I would expect them to ship there soon as well.

While most [Relative Colors tutorials](https://developer.chrome.com/blog/css-relative-color-syntax) show examples revolving around tweaking one color component up or down (and there is indeed a host of use cases that just needs that),
there are also a lot more nonobvious pain points that Relative Colors can solve.

One of the big longstanding CSS pain points is that there is no way to specify a text color that is readable over an arbitrary background color (e.g. white on darker backgrounds and black on lighter backgrounds).
The good news is that this is actually coming, as the CSS function [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color) (which you may have heard of as `color-contrast()`, an earlier name).
It had stalled for years, but I recently scoped it down to an MVP that may actually ship soonish,
which circumvents some very difficult design decisions of the full-blown feature.

Of course, soonish in spec years is still, well, years.
If you see [my past spec work](/specs/) with a bit of luck, it can take as little as 2 years to get a feature shipped across all major browsers after it’s been specced.
But 2 years is also a long time, what can we do until then?

It may not be pretty, but there is a way to emulate `contrast-color()` (or something close to it) using Relative Colors.

## Emulating `contrast-color()` using Relative Colors

Let’s assume there is some L(ightness) value above which we use black text and white text and they are guaranteed to have good contrast.
We will validate that assumption later, but for now let’s take it for granted.
After some experimentation, let’s use `0.7` as that value, but assign it to a variable so we can easily change it later:

```css
--l-threshold: 0.7;
```

Most RCS examples in the wild use `calc()` with simple additions and multiplications.
However, **any math function supported by CSS is actually fair game**, including `clamp()`, trigonometric functions, and many others.

In this case, we want to come up with an expression that is composed of CSS math functions already supported widely
and will return `1` if `l <= var(--l-threshold)` and `0` if `l > var(--l-threshold)`.

If we can manage to find an expression that will be negative for `l > var(--l-threshold)` and over 1 for `l <= var(--l-threshold)`, we can use `clamp(0, var(--l), 1)` to get the desired result.
Now, a ratio of `var(--l-threshold) / l` is over 1 for `l <= var(--l-threshold)` and under 1 for `l > var(--l-threshold)`.
This means that if we subtract `1` from it, it will give us a negative number for `l > var(--l-threshold)` and a positive one for `l <= var(--l-threshold)`.
We’re almost there, but we didn’t want a positive number, we wanted a number over `1`.
However, once we have a negative number for one branch and a positive for the other branch, the rest is easy:
we can simply multiply this by a large enough number so that the negative number becomes a large negative number and the positive number becomes a large positive number.

Putting it all together, it looks like this:

```css
--l-threshold: 0.7;
--l: clamp(0, (var(--l-threshold) / l - 1) * 9999999, 1);
color: oklch(from var(--color) var(--l) 0 h);
```

One worry might be that if L gets close enough to the threshold we may get a number between 0 - 1,
but in my experiments this never happened, presumably since precision is not infinite.

## Is there such a threshold? And if so, what is it?

We have until now made the assumption that such a threshold exists, but that is not obvious.
Perhaps there is no "safe" lightness threshold that we can use.

When people first year about perceptually uniform color spaces like [LCH]() and its improved version, [OKLCH](),
they imagine that they can infer the contrast between two colors by simply comparing their L values.
This is unfortunately not true, but there is certainly _significant_ correlation between L values and contrast.

At this point, I should point out that while most people are aware of the WCAG 2.1 contrast algorithm,
which is part of the Web Content Accessibility Guidelines and baked into law in many countries,
it has been known for a while that its results are actually quite poor.
So bad in fact that in some tests it even [performs almost as bad as random chance](https://www.cedc.tools/article.html).
There is a newer contrast algorithm, [APCA](https://apcacontrast.com/) that produces _far_ better results,
but is not yet part of any standard or legislation, and there have previously been some bumps along the way with making it freely available to the public (which seem to be largely resolved).

This means that creating accessible color pairings should ideally be a two step process:
- Use APCA to ensure **actual readability**
- **Compliance failsafe**: Ensure the result does not actively _fail_ WCAG 2.1

I ran [some quick experiments](research/) using [Color.js](https://colorjs.io) where I iterate over the OKLCh reference range (loosely based on the P3 gamut)
in increments of increasing granularity and calculate the lightness ranges for colors where white was the "best" text color (= produced higher contrast than black) and vice versa.
I also compute the brackets for each level (fail, AA, AAA, AAA+) for both APCA and WCAG.

This is [the table produced with C ∈ [0, 0.4] (step = 0.025) and H ∈ [0, 360) (step = 1)](research/?c=0,0.4,0.025&h=0,359,1):

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
	--l: clamp(0, (var(--l-threshold) / l - 1) * 9999999, 1);
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