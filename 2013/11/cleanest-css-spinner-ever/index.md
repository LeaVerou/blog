---
title: "Cleanest CSS spinner, ever"
date: "2013-11-29"
tags:
  - "tips"
  - "css"
  - "css-animations"
---

For some reason, I seem to have a fascination with CSS loaders these days. After [recreating the Google loader with clean CSS](http://lea.verou.me/2013/11/flexible-google-style-loader-with-css/) recently, I set off to recreate the classic spinner with CSS. Yes, I know this has been done zillions of times, but I wanted a clean, maintainable, reusable solution, not just a proof of concept. Something with not tons of CSS and/or HTML elements.

I managed to recreate it with only 2 elements. I'm still not completely satisfied, as I was hoping to come up with a solution with just one element, but it's still much better than all those solutions out there that use tons of elements and code.

So, how did I do it?

- I use the `::before` and `::after` pseudoelements of the parent and child div to create the 4 first bars
- I use `box-shadow` with no blur on all four of the above to create the remaining 4 bars
- I rotate the whole element with a `steps(8)` timing function to create the animation

As with the Google-style loader, just changing the `font-size` on this scales the whole element, as everything is sized with ems. Also, there is fallback text, to make it accessible to screen readers. Tested in Chrome, Firefox, Safari, IE10. Should degrade gracefully on IE9 (spinner should look fine, just no animation).

Using a preprocessor for variables and calculations should simplify the code even further.

Enjoy :)

<iframe src="http://dabblet.com/gist/7615212" width="100%" height="300"></iframe>

Ideas for further improvement are welcome. Remember that it's not just the size of the code that matters, but also its simplicity.
