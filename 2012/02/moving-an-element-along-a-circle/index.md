---
title: "Moving an element along a circle"
date: "2012-02-08"
tags:
  - "tips"
  - "css"
  - "css-animations"
  - "css-transforms"
---

It all started a few months ago, when [Chris Coyier](http://css-tricks.com/) casually asked me how would I move an element along a circle, without of course rotating the element itself. If I recall correctly, his solution was to use multiple keyframes, for various points on a circle's circumference, approximating it. I couldn't think of anything better at the time, but the question was stuck in the back of my head. 3 months ago, I came up with a first solution. Unfortunately, it required an extra wrapper element. The idea was to use two rotate transforms with different origins and opposite angles that cancel each other at any given time. The first transform-origin would be the center of the circle path and the other one the center of the element. Because we can't use multiple transform-origins, a wrapper element was needed.

<iframe style="width: 100%; height: 500px;" src="http://jsfiddle.net/leaverou/zXPzY/embedded/result" frameborder="0" width="320" height="240"></iframe>

So, even though this solution was better, I wasn't fully satisfied with it due to the need for the extra element. So, it kept being stuck in the back of my head.

Recently, I [suggested to www-style that transform-origin should be a list](http://lists.w3.org/Archives/Public/www-style/2012Feb/0201.html) and accept multiple origins and presented this example as a use case. And then [Aryeh Gregor](http://aryeh.name/) came up with [this genius idea](http://lists.w3.org/Archives/Public/www-style/2012Feb/0294.html) to prove that it's already possible if you chain translate() transforms between the opposite rotates.

I simplified the code a bit, and here it is:

<iframe style="width: 100%; height: 500px;" src="https://dabblet.com/gist/1760283" width="320" height="240"></iframe>

With the tools we currently have, I don't think it gets any simpler than that.
