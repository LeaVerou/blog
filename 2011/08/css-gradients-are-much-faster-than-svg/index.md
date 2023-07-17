---
title: "CSS gradients are faster than SVG backgrounds"
date: "2011-08-12"
tags:
  - "css-gradients"
  - "css"
  - "experiments"
  - "performance"
  - "benchmarks"
  - "svg"
---

Which is really sad, because SVG is awesome. It lets you do what CSS gradients do and much more, in quite a small filesize, as it’s just text too. However, the browser needs to generate a DOM for every SVG graphic, which results in sluggishness.

[Here's my test case](http://jsfiddle.net/leaverou/8hQEy/embedded/result%2Ccss%2Cjs/)

Mouse over the 2 divs. They both use a spotlight effect that's dynamically updated according to the position of the mouse cursor. One of them does it with an SVG (through a data URI), the other one through a CSS radial gradient.

The test only works in **Chrome**, **Firefox nightlies** and **perhaps IE10** (haven't tested in Windows). Why? Because **Opera** doesn't support radial gradients yet (however you can see how slow SVG is in it too), and **Firefox** before the nightlies used to have [a bug with gradients in SVG through data URIs](https://bugzilla.mozilla.org/show_bug.cgi?id=308590). Also, jsFiddle seems not to work in **Webkit nightlies** for some reason, but I'm too lazy right now to make a self-hosted test case.

Thanks a lot to [Christian Krebs](http://twitter.com/#!/__chris__) (lead developer of Opera Dragonfly) who inspired these tests after a discussion we had today regarding CSS gradient performance.

Edit: According to some commenters, they're the same speed on Windows and Linux, so it could be an OSX issue. The only way to know for sure is to post more results, so go ahead and post yours!

Also, some commenters say that this is not a fair comparison, because it generates a new SVG every time. I have several arguments to reply to this:

1. We also generate a new gradient every time, so it is fair.
2. You can't manipulate an SVG used for a background, so it's not an option for backgrounds. JS doesn't run in it and you don't have access to its DOM. The only way to do that would be to use an inline SVG embedded in HTML and the element() CSS3 function. However, that's only supported by Firefox, so not really a pragmatic option.
