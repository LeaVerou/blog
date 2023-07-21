---
title: "Cross browser, imageless linear gradients"
date: "2009-03-20"
tags:
  - "original"
  - "canvas"
  - "gradient"
  - "js"
---

I have to write a color picker in the near future and I wanted it to have those little gradients on top of the sliders that show you the effect that a slider change will have on the selected color. Consequently, I needed to create imageless gradients, in order to easily change them. My very first thought was creating many div or span elements in order to show the gradient. I rejected it almost instantly, for ovbious reasons (\*cough\* performance \*cough\*). My second thought was SVG for the proper browsers, and gradient filters for IE. As it turned out, [inline SVG was too much of a hassle](http://wiki.svg.org/Inline_SVG) and I didn't want to use Data URIs. My final thought was canvas for the proper browsers and gradient filters for IE.

Since I consider such a script very entertaining, I didn't google it at all, I started coding right away. Time to have fun! :D After finishing it though, I googled it just out of curiosity and didn't like the other solutions much (either the solution itself, or the code), so I decided to post it in case it helps someone. I also made a little test page, so that you may test out how it works. :)

The script is a class for the creation of linear 2-color gradients in any browser. It's used like this:

```js
var g = new Gradient(200, 100, '#000000', '#ff1166', true);
document.body.appendChild(g.canvas);
```

You can create and manipulate the Gradient object at any point (during or after DOM parsing) but you have to insert the element somewhere in the DOM after the DOM has finished parsing (which is common sense).

All the parameters in the constructor are optional and can be manipulated later. Their order is `width, height, startColor, endColor, vertical`.

Some notes:

- Its object oriented and doesn't throw any strict warnings
- Tested in IE6, IE7, IE8, Firefox 3, Safari 4b and Opera 9.6. Probably works with older versions of Firefox, Opera and Safari as well (as long as they support `<canvas>`), I'm just not able to test in them currently.
- All it's methods return the object, so they can be chained.
- You can modify it to support RGBA as well, but you'd have to use a different format for IE (extended hex) and a different one for the proper browsers. I didn't need that and it would make the script unnecessarily complex, so I didn't implement it.

Limitations (**all** these limitations are enforced by IE's gradient filter):

- Only does linear gradients
- The gradient can be either vertical or horizontal. No other angles.
- The only color format supported is #RRGGBB.

### Properties

#### canvas (HTMLElement)

The HTML Element that is being used to render the gradient. Either a `<canvas>` or a `<span>`. You have to use it at least once, in order to insert the element in the DOM. I preferred not to do this automatically, since it would be too restrictive.

#### startColor (String)

The current start color of the gradient.

#### endColor (String)

The current end color of the gradient.

#### vertical (Boolean)

True if the gradient is vertical, false if it's horizontal.

#### width (Number)

The width of the gradient in pixels

#### height (Number)

The height of the gradient in pixels

### Methods

#### paint(startColor, endColor, vertical)

Used to change the colors and/or the orientation of the gradient. All parameters are optional.

#### resize(width, height)

Used to change the size of the gradient. Both parameters are optional.

#### flip()

Reverses the gradient (swaps endColor with startColor)

#### rotate()

Rotates the gradient by 90 degrees clockwise (should I add CCW too?)

### Download

- [gradient.js (2.7 KB)](http://lea.verou.me/scripts/gradient/gradient.js)
- [gradient-min.js (1.4 KB)](http://lea.verou.me/scripts/gradient/gradient-min.js)
- [Test page](http://lea.verou.me/scripts/gradient/)

Hope you find it useful :)
