---
title: "Incrementable length values in text fields"
date: "2011-02-14"
categories:
  - "original"
  - "releases"
tags:
  - "incrementable"
  - "js"
---

[![](images/incrementable-demo-300x202.png "incrementable-demo")](images/incrementable-demo.png)I always loved that Firebug and Dragonfly feature that allows you to increment or decrement a `<length>` value by pressing the up and down keyboard arrows when the caret is over it. I wished my [Front Trends slides](http://lea.verou.me/2010/10/my-ft2010-slides-and-csss-my-presentation-framework/) supported it in the editable examples, it would make presenting so much easier. So, I decided to implement the functionality, to use it in my next talk.

If you still have no idea what I'm talking about, you can see a demo here: <a href="https://incrementable.verou.me/" class="call-to-action">View demo</a>

You may configure it so that it only does that when modifiers (alt, ctrl and/or shift) are used by providing a second argument to the constructor and/or change the units supported by filling in the third argument. However, bear in mind that holding down the Shift key will make it increment by ±10 instead of ±1 and that's not configurable (it would add too much unneeded complexity, I'm not even sure whether it's a good idea to make the other thing configurable either).

You may download it or fork it from it's [Github repo](https://github.com/LeaVerou/Incrementable/).

And if you feel creative, you may improve it by fixing an Opera bug I gave up on: When the down arrow is pressed, the caret moves to the end of the string, despite the code telling it not to.
