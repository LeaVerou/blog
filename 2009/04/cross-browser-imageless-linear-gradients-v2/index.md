---
title: "Cross-browser imageless linear gradients v2"
date: "2009-04-24"
categories:
  - "original"
  - "releases"
tags:
  - "gradient"
  - "js"
---

A while ago, I posted [a script of mine for creating 2-color cross-browser imageless linear gradients](http://lea.verou.me/2009/03/cross-browser-imageless-linear-gradients/ "Cross-browser imageless linear gradients v1"). As I stated there, I needed them for a color picker I have to create. And even though 2-color gradients are sufficient for most components, in most color spaces, I had forgotten an important one: **Hue**. You can't represent Hue with a 2-color gradient! So, I had to revise the script, and make it able to produce linear gradients of more than 2 colors. Furthermore, I needed to be able to specify a fully transparent color as one of the gradient colors, in order to create the photoshop-like 2d plane used by the picker (and no, a static image background like the one used in most JS color pickers wouldn't suffice, for reasons irrelevant with this post). I hereby present you _Cross-browser, imageless, linear gradients **v2**_!

The API has stayed just the same, with the following differences:

- You may specify the keyword "transparent" instead of a #RRGGBB color (that was such a pain to implement btw!).
- When creating a Gradient object, color strings are now defined in an array. Example:

    var g = new Gradient(200, 100, \['#000000', '#ff1166', '#23ff46'\], true);

- When calling `g.paint()` it now takes **2** arguments instead of 3: The new color array (or null if you don't want that to change) and the direction (true for vertical, false for horizontal). For example:

    g.paint(\['#000000', '#ff1166', '#23ff46'\], true);

- 2 new methods have been added: `g.setColorAt(index, color)` and `g.direction(newDirection)`. The first allows you to set a particular gradient color (index starting from 0) and the second to alter or toggle the direction (if you specify a direction parameter, you set the direction, if you call it with no parameters, it toggles from horizontal to vertical).
- The fields `g.startColor` and `g.endColor` have been replaced by the array `g.colors`.

**Update**: **v2.0.1** Fixed a small bug with the 'transparent' keyword that affected multi-color gradients in browsers != IE when the transparent color wasn't first or last.

Enjoy:

[gradient.js (5.1 KB)](http://lea.verou.me/scripts/gradient2/gradient.js)

[gradient-min.js (2.7 KB)](http://lea.verou.me/scripts/gradient2/gradient-min.js)

[Test page](http://lea.verou.me/scripts/gradient2/)
