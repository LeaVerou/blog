---
title: "Checkerboard pattern with CSS3"
date: "2011-02-16"
tags:
  - "original"
  - "tips"
  - "css"
  - "css-images"
  - "css-values"
  - "multiple-backgrounds"
  - "patterns"
---

A while ago, I wrote a post on [creating simple patterns with CSS3 gradients](http://lea.verou.me/2010/12/checkered-stripes-other-background-patterns-with-css3-gradients/). A common pattern I was unable to create was that of a regular, non-rotated checkerboard. However, I noticed today that by giving a different background-position to every triangle in the pattern tile, a checkerboard can be easily created:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/leaverou/SUgfD/embedded/result,css"></iframe>

View in Gecko or Webkit. Webkit seems to have an odd rendering bug, so it needed a background-size override and it still doesn't look perfect. Oh well, [reported the bug](https://bugs.webkit.org/show_bug.cgi?id=54805) and moved on.
