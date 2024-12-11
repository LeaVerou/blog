---
title: "Simpler CSS typing animation, with the ch unit"
date: "2012-02-05"
tags:
  - "tips"
  - "css"
  - "css-animations"
  - "css-values"
---

A while ago, [I posted](http://lea.verou.me/2011/09/pure-css3-typing-animation-with-steps/) about how to use `steps()` as an easing function to create a typing animation that degrades gracefully.

Today I decided to simplify it a bit and make it more flexible, at the cost of browser support. The new version fully works in Firefox 1+ and IE10, since Opera and WebKit don't support [the ch unit](http://www.w3.org/TR/css3-values/#ch-unit) and even though IE9 supports it, it doesn't support CSS animations. To put it simply, one `ch` unit is equivalent to the width of the zero (0) character of the font. So, in monospace fonts, it's equivalent to the width of **every** character, since every character has the same width.

In the new version, we don't need an obscuring span, so no extra HTML and it will work with non-solid backgrounds too. Also, even though the number of characters still needs to be hard-coded, it doesn't need to be hardcoded in the animation any more, so it could be easily done through script without messing with creating/modifying stylesheets. Note how each animation only has one keyframe, and takes advantage of the fact that when the `from` (0%) and `to` (100%) keyframes are missing, the browser generates them from the fallback styles. I use this a lot when coding animations, as I hate duplication.

In browsers that support CSS animations, but not the ch unit (such as WebKit based browsers), the animation will still occur, since we included a fallback in ems, but it won't be 100% perfect. I think that's a pretty good fallback, but if it bothers you, just declare a fallback of auto (or don't declare one at all, and it will naturally fall back to auto). In browsers that don't support CSS animations at all (such as Opera), the caret will be a solid black line that doesn't blink. I thought that's better than not showing it at all, but if you disagree, it's very easy to hide it in those browsers completely: Just swap the `border-color` between the keyframe and the `h1` rule (hint: when a `border-color` is not declared, it's `currentColor`).

**Edit:** It appears that Firefox's support for the ch unit is a bit buggy so, the following example won't work with the Monaco font for example. This is not the correct behavior.

Enjoy:

<iframe style="width: 100%; height: 600px;" src="https://dabblet.com/gist/1745856" width="320" height="240"></iframe>
