---
title: "CSS reflections for Firefox, with -moz-element() and SVG masks"
date: "2011-06-29"
categories:
  - "original"
tags:
  - "css"
  - "css-images"
  - "svg"
---

We all know about the proprietary (and imho, horrible) `-webkit-box-reflect.` However, you can create just as flexible reflections in Firefox as well, by utilizing [\-moz-element()](https://developer.mozilla.org/en/CSS/-moz-element), some CSS3 and Firefox's capability to apply [SVG effects to HTML elements](https://developer.mozilla.org/En/Applying_SVG_effects_to_HTML_content). And all these are actually standards, so eventually, this will work in all browsers, unlike `-webkit-box-reflect`, which was never accepted by the CSS WG.

First and foremost, have a look at the [demo](http://lea.verou.me/demos/reflection/):

<iframe src="http://lea.verou.me/demos/reflection/" width="100%" height="500px"></iframe>

## How it works

- For every element, we generate an `::after` pseudoelement with the same dimensions and a position of being right below our original element.
- Then, we make it appear the same as our element, by giving it a background of `‑moz-element(#element-id)` and no content.
- Reflections are flipped, so we flip it vertically, by applying `transform: scaleY(‑1);`
- If we want the reflection to have a little distance from the element (for example 10px like the demo), we also apply a transform of `translateY(10px)`
- We want the reflection to not be as opaque as the real element, so we give it an `opacity` of around 0.3-0.4
- At this point, **we already have a decent reflection**, and we didn't even need SVG masks yet. It's essentially the same result -webkit-box-reflect gives if you don't specify a mask image. However, to really make it look like a reflection, we apply a mask through an SVG and the `mask` CSS property. In this demo, the SVG is external, but it could be a data URI, or even embedded in the HTML.

## Caveats

- Won't work with replaced elements (form controls, images etc).
- If you have borders, it gets a bit more complicated to size it properly
- Doesn't degrade gracefully, you still get the pseudoelement in other browsers, so you need to filter it out yourself
- Bad browser support (currently only Firefox 4+)
- You need to set the reflection's background for every element and every element needs an id to use it (but this could be done automatically via script)

## Further reading

- [element() function](http://www.w3.org/TR/css3-images/#element-reference)
- [SVG effects for CSS](http://people.mozilla.com/~roc/SVG-CSS-Effects-Draft.html)
- **Edit:** [Turns out Paul Rouget did something similar before me, back in August 2010](https://hacks.mozilla.org/2010/08/mozelement/). The pros of this approach is that it works with replaced elements as well, the cons is that it requires extra markup and JavaScript.

Credits: Thanks to [Christian Heilmann](http://wait-till-i.com/) for helping me debug why SVG masks for HTML elements weren't originally working for me.
