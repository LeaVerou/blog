---
title: "Checkerboard, striped & other background patterns with CSS3 gradients"
date: "2010-12-22"
categories:
  - "original"
  - "tips"
tags:
  - "background-size"
  - "css3"
  - "css3-gradients"
  - "css3-values"
  - "multiple-backgrounds"
  - "patterns"
---

[![Screenshot of the CSS3 patterns I came up with](images/css3-patterns-1024x480.png "The CSS3 patterns I came up with")](http://lea.verou.me/demos/css3-patterns.html)You're probably familiar with CSS3 gradients by now, including the closer to the standard Mozilla syntax and the ugly verbose Webkit one. I assume you know how to add multiple color stops, make your gradients angled or create radial gradients. What you might not be aware of, is that CSS3 gradients can be used to create many kinds of commonly needed patterns, including checkered patterns, stripes and more.

[View demo](http://lea.verou.me/demos/css3-patterns.html) (Works in Webkit, Firefox 3.6+, Opera 11.50+ and IE10+)

The main idea behind the technique is the following, taken from the [CSS3 Images spec](http://dev.w3.org/csswg/css3-images/#color-stop-syntax):

> If multiple color-stops have the same position, they produce an infinitesimal transition from the one specified first in the rule to the one specified last. **In effect, the color suddenly changes at that position rather than smoothly transitioning.**

I guess this makes it obvious how to create the tile for the stripes (unless you've never created a striped background before, but teaching you this is beyond the scope of this post). For example the gradient for the horizontal stripes is:

background-color: #0ae;
background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
background-image: -moz-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: -o-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);

Why `transparent` instead of the actual colors we want? For flexibility. `background-color` serves two purposes here: Setting the color of half the stripes and serving as a fallback for browsers that don't support gradients.

However, without anything else, the tile will occupy the whole container. To control the size of each tile, you can use background-size:

\-webkit-background-size: 50px 50px;
-moz-background-size: 50px 50px;
background-size: 50px 50px;

To create the picnic-style pattern, you just overlay horizontal stripes on vertical stripes.

The hardest one to figure out was the checkered pattern. It consists of two 45° linear gradients and two -45° linear gradients, each containing ¼ of the dark squares. I still haven't managed to think of a way to create a regular checkerboard (not at 45°) without needing an unacceptably large number of gradients. It will be very easily possible if conical gradients start being supported (currently they're not even in the spec yet).

Can you think of any other popular patterns that can be created with CSS3 and no images? If so, let me know with a comment. Cheers! :)

### Added afterwards: Other patterns

There are far more pattern designs possible with CSS3 gradients than I originally thought. For more details, see [this later post](http://lea.verou.me/2011/04/css3-patterns-gallery-and-a-new-pattern/).
