---
title: "Flexible Google-style loader with CSS"
date: "2013-11-11"
categories:
  - "tips"
tags:
  - "css"
  - "css-animations"
---

So, for a while I had noticed the nice sutble loader Google apps use and I was wondering if it would be easy to make with CSS and CSS animations: ![Google’s loader](https://maps.gstatic.com/tactile/omnibox/loading.gif)

Yesterday, I realised that you can get this effect by increasing border size until about the middle of the element, as long as the total width stays the same (by using `box-sizing: border-box`):

<iframe src="http://dabblet.com/gist/7408996" height="400" width="100%"></iframe>

However, as you can see above, after the midpoint, the border is not curved any more, so does not produce the desired effect. However, what if we split the background colour in half, and animated `border-left` _until_ 50% of the width and then `border-right` _from_ 50% of the width? That worked, but only gave us 25% of the effect. I could recreate the whole effect by then animating border-top/bottom instead etc, but it's easier to apply `animation-direction: alternate` to alternate between showing and hiding the circle and and simultaneously rotate the loader by 90deg each time, by applying `animation-timing-function: steps(4)` to a rotate animation that runs over 4x the duration of the border animation.

This is the finished result:

<iframe src="http://dabblet.com/gist/7387255" height="300" width="100%"></iframe>

The dimensions are all set in ems so that you can change the size in one place: Just change the font-size and the loader scales perfectly. It’s also accessible to screen reader users, as there is still text there.

And yes, it's not super useful as-is, there are tons of spinners on the Web that you can use instead. However, I decided to post it (instead of just tweeting it) as I thought the techniques involved in making it might be interesting for some of you :)
