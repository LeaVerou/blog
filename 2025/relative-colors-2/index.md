---
title: Relative Colors with Two Colors, Today
draft: true
tags:
  - css
  - color
  - web-standards
---

Out of the [various web technologies](/specs) I've designed over the years,
[Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) are definitely in the top 3 of features I’m most proud of.
They unlocked so many possibilities for color manipulation, most of which I never imagined when I first proposed them.
In fact, the ways we originally envisioned they would mostly be used (mainly multiplication or addition between a component and a constant) turned out to be way too simple for covering their driving use cases [^this deserves a whole other post, which is on my to-do list],
so it was really fortunate that they were designed as a more general low-level primitive — an [eigensolution](../2023/eigensolutions) even.

As a result, they serve as a great demonstration for one of my top API design principles when designing Web Platform features:




Relative colors are a great demonstration of why — unless there is a good reason — API designers should first expose low-level primitives that make complex things possible,
and **later** work on high-level abstractions that make simple things easy (while both are important).
Unless use cases are extremely well understood and highly concentrated, starting with high-level solutions is more likely to produce overfit solutions
Starting with low-level primitives addresses the most pressing pain points, giving you time to design the right solution that makes simple things easy.
Even the simpler use cases, such as making a color lighter or darker, turned out to involve much more complex math than simply multiplying the lightness by a constant factor in the right color space, which was what [I originally envisioned](https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499126198).


Additionally, while the initial proposal only covered the case of doing math on the components of a single color,
Use cases of mixing components of two colors kept coming up.
Earlier this year, I [proposed](https://github.com/w3c/csswg-drafts/issues/11533) an extension to Relative Colors that would allow mixing components of two colors.
It was [accepted by the CSS WG](https://github.com/w3c/csswg-drafts/issues/11533#issuecomment-2625624517) two weeks later,
although it has not been added to the spec yet (mainly because someone needs to do the work).

While the exact syntax is still being worked out, the basic idea is that you will be able to do something like this:

```css
--color-red-light: hsl(0 100% 90%);
--color-blue: hsl(240 100% 50%);
--color-blue-light: hsl(from var(--color-blue) var(--color-red-light) h s l2);
```

That would get you a `--color-blue-light` that is a light blue with the lightness of `--color-red-light` and the hue and saturation of `--color-blue`.








```css
--color-red-light: hsl(0 100% 90%);
--color-blue: hsl(240 100% 50%);
```

How do we get a `--color-blue-light` that includes the lightness from `var(--color-red-light)` and the hue and saturation from `var(--color-blue)`?

```css
--color-blue-hs: hsl(from var(--color-blue) h s none);
```

Then, if we mix this with any color, even if the other color is at `0%`, its `none` components will be backfilled from the other color.
This means we can get the color we wanted by simply doing:

```css
--color-blue-light: color-mix(in hsl, var(--color-blue-hs), var(--color-red-light) 0%);
```

We can even do it in one go, without the intermediate variable:

```css
--color-blue-light: color-mix(in hsl, hsl(from var(--color-blue) h s none), var(--color-red-light) 0%);
```

Caveats:
- `none` is converted to `0` when converting between different color spaces, so it's crucial to use the same color space to do the
