---
title: "Hybrid positioning with CSS variables and max()"
date: "2020-06-05"
tags:
  - "tips"
  - "tutorials"
  - "css"
  - "css-values"
  - "css-variables"
  - "js"
---

Notice how the navigation on the left behaves wrt scrolling: It's like absolute at first that becomes fixed once the header scrolls out of the viewport.

One of my side projects these days is a color space agnostic color conversion & manipulation library, which I'm developing together with my husband, [Chris Lilley](https://svgees.us) (you can see a sneak peek of its docs above). He brings his color science expertise to the table, and I bring my JS & API design experience, so it's a great match and I'm really excited about it! (_if you're serious about color and you're building a tool or demo that would benefit from it contact me, we need as much early feedback on the API as we can get!_ )

For the documentation, I wanted to have the page navigation on the side (when there is enough space), right under the header when scrolled all the way to the top, but I wanted it to scroll with the page (as if it was absolutely positioned) until the header is out of view, and then stay at the top for the rest of the scrolling (as if it used fixed positioning).

It sounds very much like a case for [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position), doesn't it? However, an element with `position: sticky` behaves like it's relatively positioned when it's in view and like it's using `position: fixed` when its scrolled out of view but its container is still in view. What I wanted here was different. I basically wanted `position: absolute` while the header was in view and `position: fixed` after. Yes, there are ways I could have contorted `position: sticky` to do what I wanted, but was there another solution?

In the past, we'd just go straight to JS, slap `position: absolute` on our element, calculate the offset in a `scroll` event listener and set a `top` CSS property on our element. However, this is flimsy and violates separation of concerns, as we now need to modify Javascript to change styling. Pass!

What if instead we had access to the scroll offset in CSS? Would that be sufficient to solve our use case? Let's find out!

As I pointed out in my [Increment article about CSS Variables](https://increment.com/frontend/a-users-guide-to-css-variables/) last month, and in [my CSS Variables series of talks a few years ago](https://www.youtube.com/results?search_query=lea+verou+%22css+variables%22), we can use JS to set & update CSS variables on the root that describe pure data (mouse position, input values, scroll offset etc), and then use them as-needed throughout our CSS, reaching near-perfect separation of concerns for many common cases. In this case, we write 3 lines of JS to set a `--scrolltop` variable:

```
let root = document.documentElement;
document.addEventListener("scroll", evt => {
	root.style.setProperty("--scrolltop", root.scrollTop);
});
```

Then, we can position our navigation absolutely, and subtract `var(--scrolltop)` to offset any scroll (`11rem` is our header height):

```
#toc {
	position: fixed;
	top: calc(11rem - var(--scrolltop) * 1px);
}
```

This works up to a certain point, but once scrolltop exceeds the height of the header, `top` becomes negative and our navigation starts drifting off screen:

Just subtracting `--scrolltop` essentially implements absolute positioning with `position: fixed`.

We've basically re-implemented absolute positioning with `position: fixed`, which is not very useful! What we _really_ want is to cap the result of the calculation to `0` so that our navigation always remains visible. Wouldn't it be great if there was a `max-top` attribute, just like `max-width` so that we could do this?

One thought might be to change the JS and use `Math.max()` to cap `--scrolltop` to a specific number that corresponds to our header height. However, while this would work for this particular case, it means that `--scrolltop` cannot be used generically anymore, because it's tailored to our specific use case and does not correspond to the actual scroll offset. Also, this encodes more about styling in the JS than is ideal, since the clamping we need is presentation-related — if our style was different, we may not need it anymore. But how can we do this without resorting to JS?

Thankfully, we recently got implementations for probably the one feature I was pining for the most in CSS, for years: [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max) and [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) functions, which bring the power of min/max constraints to any CSS property! And even for `width` and `height`, they are strictly more powerful than `min/max-*` because you can have any number of minimums and maximums, whereas the `min/max-*` properties limit you to only one.

While [brower compatibility is actually pretty good](https://developer.mozilla.org/en-US/docs/Web/CSS/max#Browser_compatibility), we can't just use it with no fallback, since this is one of the features where lack of support can be destructive. We will provide a fallback in our base style and use [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) to conditonally override it:

```
#toc {
	position: fixed;
	top: 11em;
}

@supports (top: max(1em, 1px)) {
	#toc {
		top: max(0em, 11rem - var(--scrolltop) * 1px);
	}
}
```

Aaand that was it, this gives us the result we wanted!

And because `--scrolltop` is sufficiently generic, we can re-use it anywhere in our CSS where we need access to the scroll offset. I've actually used exactly the scame `--scrolltop` setting JS code in my blog, to keep the gradient centerpoint on my logo while maintaining a `fixed` background attachment, so that various elements can use the same background and having it appear continuous, i.e. not affected by their own background positioning area:

The website header and the post header are actually different element. The background appears continuous because it's using `background-attachment: fixed`, and the scrolltop variable is used to emulate `background-attachment: scroll` while still using the viewport as the background positioning area for both backgrounds.

### Appendix: Why didn't we just use the cascade?

You might wonder, why do we even need `@supports`? Why not use the cascade, like we've always done to provide fallbacks for values without sufficiently universal support? I.e., why not just do this:

```
#toc {
	position: fixed;
	top: 11em;
	top: max(0em, 11rem - var(--scrolltop) * 1px);
}
```

The reason is that when you use CSS variables, this does not work as expected. The browser doesn't know if your property value is valid until the variable is resolved, and by then it has already processed the cascade and has thrown away any potential fallbacks.

So, what would happen if we went this route and `max()` was not supported? Once the browser realizes that the second value is invalid due to using an unknown function, it will make the property _[invalid at computed value time](https://www.w3.org/TR/css-variables-1/#invalid-at-computed-value-time)_, which essentially equates to the `initial` keyword, and for the `top` property, the initial value is `0`. This would mean your navigation would overlap the header when scrolled close to the top, which is _terrible_!
