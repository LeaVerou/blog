---
title: "Convert standard gradient syntax to -webkit-gradient and others"
date: "2011-03-26"
categories:
  - "original"
tags:
  - "css-gradients"
  - "js"
---

![Screenshot of the demo](images/cssgradientsplease-screenshot-300x148.png "cssgradientsplease - screenshot")I hate `-webkit-gradient()` with a passion. Its syntax is cumbersome and it's really limited: No angle support, no <length>s in color stop positions, no implied color stop positions, no elliptical gradients... So, I was really happy, when Webkit implemented the standard syntax this January. However, we're still stuck with the horrid `-webkit-gradient()` for quite a while, since older Webkit browsers that don't support it are widely used at this time.

Today, I decided to finally spare myself the hassle of converting my standard gradient syntax to -webkit-gradient() by hand. Tasks like that shouldn't be handled by a human. So, I coded a little script to do the chore. Hope it helps you too: <a href="/demos/cssgradientsplease/" class="call-to-action">View demo</a>

It currently only supports linear gradients, but I plan to add radial ones in the future. Also, when I get around to cleaning up the code a bit, I'll add it on Github.

(Hope I didn't leave in any very stupid bug, it's really late here and I'm half asleep.)
