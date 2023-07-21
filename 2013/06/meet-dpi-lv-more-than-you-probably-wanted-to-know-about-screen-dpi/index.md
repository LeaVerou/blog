---
title: "Meet dpi.lv: More than you probably wanted to know about screen DPI"
date: "2013-06-10"
tags:
  - "original"
  - "releases"
  - "dpi-ppi"
---

[
![Screen Shot 2013-06-10 at 13.41.39](images/Screen-Shot-2013-06-10-at-13.41.39--300x221.png)](images/Screen-Shot-2013-06-10-at-13.41.39-.png)

Yesterday (Sunday) I was on a 9.5 hour flight from Canada with no inflight entertainment (well, thanks Air Canada), so I did what every bored human being would do instead of watching movies: I decided to code an app! And out of the infinite set of possible apps somebody can make, I decided to make an app to calculate screen DPI/PPI.

You might be wondering if I’m still (?) sane, but you might be surprised to hear I found myself calculating screen PPIs quite frequently and wanted to save myself the hassle of doing the math every time. I’m a curious person and I wanted to know, even about products I would never buy and even when it wasn’t listed in the tech specs. Yes, my hobbies are somewhat weird. :o

I first thought about doing such an app a while ago, but never found the time to code it. The last time I had thought about it was a few days ago at the SF Apple Store with a friend. We were looking at the 27" Apple Thunderbolt displays in awe and thought they must have huge pixel density. After a few calculations in the console (which ironically produced a result faster than the Apple guy my friend asked), it turned out it was only ...102. "I need to code an app to make this sort of calculation easy! People are being misled by marketing!" I thought.

Fast forward to my flight. You didn’t expect my laptop battery to last for 9.5 hours, right? Yeah, MacBook Air batteries are good, but not \*that\* good. Of course it eventually died so I had to find other ways to pass my time (I ended up sleeping — or trying to). However, by the time it died, I had gone over the threshold of being able to give it up, so I spent the rest of the day finishing it, despite my obvious jetlag and sleepiness. I was in the zone — You don’t just go sleeping when you’re in the zone, right?

Besides the DPI/PPI calculator, I added a few other fun things too:

- A list of devices with pre-calculated data (stored in a separate JSON file, which makes it easy to update — \*hint, hint\*)
- Wrote a few FAQ items about DPI/PPI.
- Like many of my apps, it supports link sharing through URL hashes (for examples, check the [screens](http://dpi.lv/#screens) section).
- I even bought a proper domain for it ([dpi.lv](http://dpi.lv)) and drew [a logo](http://dribbble.com/shots/1107403-dpi-love)! The logo took hours by itself. Not just to draw it, but to simplify Illustrator’s ugly, repetitive SVG output (which is still better than what most other tools spit out). Hand-simplifying SVG is a meditative experience that I thoroughly enjoy, to the bewilderment of everyone who read [my tweet about it](https://twitter.com/LeaVerou/status/343864607368163329). Just for the lulz, here’s the [before](http://dpi.lv/img/logo-ai.svg) and the 66% smaller [after](http://dpi.lv/img/logo.svg) (the small design tweaks were intentional)
- The screen that displays the result resizes to reflect the aspect ratio of the resolution you’ve selected. It even animates to it, with CSS transitions! Oh, and it also uses FlexBox to center the text vertically.

**[Enjoy](http://dpi.lv)!**

Of course it’s open source (under an MIT license, as usual), and you can [fork it on Github](https://github.com/LeaVerou/dpi), as usual. The JS is a bit of a mess, but I’m too tired to refactor it now. Same goes for the lack of favicon and tagline. Oh well. I still like it. :)

**Important:** If you are on a display with multiple dots per pixel (e.g. Retina), the resolution (pixel width × pixel height) it tries to guess will be incorrect, so you’ll have to actually input the right one. The default resolution in there is just a hint, it doesn’t mean it’s "broken" if it doesn’t guess right, they’re editable fields. That said, it would be nice to guess right in those cases too, and I will look into it.
