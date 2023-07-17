---
title: "CSS.coloratum: Convert and share CSS colors"
date: "2011-09-02"
categories:
  - "original"
  - "releases"
tags:
  - "canvas"
  - "css"
  - "css-color"
  - "html5"
---

![](images/shot1-300x200.png "screenshot")Whenever I wanted to convert a CSS named color to RGB, I used to open [the CSS3 colors spec](http://www.w3.org/TR/css3-color/) in a new tab, search in the page and copied the values. Every time it felt even more tedious. I didn't want to search in long tables, I wanted to type the color somewhere and get the values back, in an easy to copy format. So, after yet another color lookup earlier today, I decided to scratch my own itch and do it myself.

Of course, I didn't plan to include a whole database of CSS colors in the website. My idea was much simpler: Use the named color to draw a rectangle in a <canvas> and then read the R,G,B values through ctx.getImageData().

I got the core functionality done in under 10 minutes, so I started adding stuff. I added a hex and HSL representation, I used canvas.toDataURL() to get a data URI of the rectangle and use it as a dynamic favicon\*, I made the colors sharable and bookmarkable by using an old-fashioned hash. Also, I realized it actually supports any CSS supported color represenation by design, not just named colors.

Regarding the color conversions themselves, I took extra care to avoid redundancy. So values < 1 don't have leading zeroes (.5 instead of 0.5) and when the hex color is in the format #xxyyzz it gets converted to #xyz. When it's an RGBA color, it still converts it to hex, since those values will be supported in CSS4.

Since it's for developers, I didn't bother at all with fallbacks.

Cool stuff used:

- HTML5: canvas, autofocus, output, oninput event, hashchange event
- CSS3: gradients, media queries, box-sizing, background-clip, border-radius, shadows, RGBA
- ES5: Array#map()
- Selectors API

The reason the input's border appears weird on Webkit is [this long standing Webkit bug](https://bugs.webkit.org/show_bug.cgi?id=63952). Also, for some reason my nice dynamic favicons don't display on Firefox, although they display fine in Webkit and Opera.

Enjoy: [CSS.coloratum](http://css.coloratum.com)

Happy color sharing! Let me know of any problems or suggestions you may have.

PS: In case you're wondering about the domain, I've had it for ages for another project and I thought it was quite fitting.

\*Thanks to [@milo](http://twitter.com/milo) for giving me the idea of using a dynamic favicon
