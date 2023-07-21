---
title: "Slanted tabs with CSS 3D transforms"
date: "2013-10-18"
tags:
  - "tips"
  - "css"
  - "css-transforms"
---

Not sure if I'm the first to come up with this idea, but I searched and didn’t find anything. So, for a long time, I was wondering if there's an easy way to create trapezoid shapes in CSS, especially with borders etc. Eventually, I realized that I could use a pseudo-element for the background and 3D rotate it, so that it appears like a trapezoid. Then [@krofdrakula](https://twitter.com/krofdrakula) suggested on twitter that I could even add border-radius so that it looks like a tab, so I added that as well:

<iframe src="https://dabblet.com/gist/6867917" width="100%" height="250"></iframe>

Eventually I thought, why not actually turn this into a tab demo? So I made a dabblet with that. And then I realized that if you change the transform-origin, other interesting tab shapes appear! Enjoy:

<iframe src="https://dabblet.com/gist/7039790" width="100%" height="700"></iframe>

The best part? It degrades pretty gracefully on browsers that don't support transforms! You get nice rounded tabs that just aren't slanted (although they have a pretty large top padding, but you can use Modernizr for that. Try it for yourself by commenting the transform out in the dabblet and see the result.

Another issue is that the angled lines look a bit aliased in Firefox, but that's a bug that will eventually get fixed.

In general, it’s a bit rough around the edges, so treat it more as a proof of concept. But with a little more work, it could totally work in production. Tested in Chrome, Safari, Firefox, IE9 (fallback) and IE10.
