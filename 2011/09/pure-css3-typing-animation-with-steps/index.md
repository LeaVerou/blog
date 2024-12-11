---
title: "Pure CSS3 typing animation with steps()"
date: "2011-09-05"
tags:
  - "original"
  - "css"
  - "css-animations"
---

[steps()](http://dev.w3.org/csswg/css3-animations/#animation-timing-function) is a relatively new addition to the CSS3 animations module. Instead of interpolating the values smoothly, it allows us to define the number of "frames" precisely. So I used it to create headers that have the well-known animated "typing effect":

<iframe style="width: 100%; height: 160px" src="https://jsfiddle.net/leaverou/7rnQP/embedded/result%2Ccss%2Chtml"></iframe>

As you can see, the number of characters is hardcoded in the steps() function, but that's the only place. Everything else is totally flexible. Apart from the font: It has to be monospace, so that every character has the same width.

Also, this particular way requires a solid background and an extra `<span>`. You can avoid these limitations by directly animating the width of the heading itself, but this requires a fixed target width hardcoded in the animation, so 2 things that need to be changed for every heading:

<iframe style="width: 100%; height: 160px" src="https://jsfiddle.net/leaverou/y8kNx/embedded/result%2Ccss%2Chtml"></iframe>

If you're having trouble understanding how it works, take a look at [this simpler example](https://jsfiddle.net/leaverou/vrEnp/), with just the cursor.

Gecko (Firefox) and Webkit only at the moment, since other engines haven't implemented CSS animations yet. However, both examples degrade very gracefully in other browsers (IMO at least).
