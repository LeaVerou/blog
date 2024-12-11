---
title: "Easily center text vertically, with SVG!"
date: "2013-03-24"
tags:
  - "original"
  - "tips"
  - "svg"
---

These days, we have a number of different ways to vertically align text in a container of variable dimensions:

- Table display modes
- Flexbox
- inline-block hacks
- Wrapping the text in an extra element and absolutely positioning it
- ...and probably many others I’m forgetting

However, often comes a time when neither is suitable, so here I am, adding yet another option to the list. Of course, it comes with its own set of drawbacks, but there are cases where it might be better than the existing solutions.

It all started when I discovered the [`text-anchor`](http://www.w3.org/TR/SVG/text.html#TextAnchorProperty) SVG property. It determines where the [x](http://www.w3.org/TR/SVG/text.html#TextElementXAttribute) and [y](http://www.w3.org/TR/SVG/text.html#TextElementYAttribute) attributes on [`<text>`](http://www.w3.org/TR/SVG/text.html#TextElement) elements refer to. The magic starts when you set it to “middle”, then the [x](http://www.w3.org/TR/SVG/text.html#TextElementXAttribute) and [y](http://www.w3.org/TR/SVG/text.html#TextElementYAttribute) attributes refer to the center of the text. So, if you set those to 50%, they refer to the center of the SVG graphic itself, and if you set the SVG width and height to 100%, the text basically sits in the center of the `<svg>`’s container, which could be any HTML element!

One issue was that this centered the baseline of the text, so I tried to find a way to shift the baseline appropriately. Setting [`dominant-baseline`](http://www.w3.org/TR/SVG/text.html#DominantBaselineProperty)`: middle;` on the [`<text>`](http://www.w3.org/TR/SVG/text.html#TextElement) element seemed to fix it, but it looks like IE doesn’t support that. I ended up adding [`dy`](http://www.w3.org/TR/SVG/text.html#TextElementDYAttribute)\=".3em" to the [`<text>`](http://www.w3.org/TR/SVG/text.html#TextElement) element, which fixes it but might need to be adjusted if you change the line-height.

In addition, this method has the following drawbacks I can think of:

- Extra markup (namely 2 elements: `<svg>` and [`<text>`](http://www.w3.org/TR/SVG/text.html#TextElement))
- If the text is more than one line, it won’t automatically wrap, you have to do it manually.
- Some new-ish CSS text properties may not be applied. For example, text-shadow is applied in Chrome but not in Firefox, since technically, it’s still not a part of the SVG spec.
- You need to duplicate the text color as a fill property, since SVG does not understand the color CSS property. No need to duplicate anything, just use `fill: currentColor;` ([thanks GreLI!](http://lea.verou.me/2013/03/easily-center-text-vertically-with-svg/#comment-841846526))

However, it has a few advantages too:

- You don’t need to change anything on the parent HTML element
- Degrades gracefully in non-SVG browsers
- Should be perfectly accessible and won’t break SEO
- Works perfectly in IE9, unlike Flexbox
- You can include any kind of SVG styling on the text. For example, strokes!

You can see and play with the result in the dabblet below:

<iframe src="https://dabblet.com/gist/5229803" height="500" width="100%"></iframe>

Verified to work in at least Chrome, Firefox, IE9+. Hope it’s useful, even though it won’t be a good fit in every single use case.
