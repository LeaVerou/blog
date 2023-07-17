---
title: "An easy notation for grayscale colors"
date: "2014-07-27"
tags:
  - "csswg"
  - "web-standards"
  - "surveys"
---

These days, there is [a lengthy discussion in the CSS WG about how to name a function that produces shades of gray](http://lists.w3.org/Archives/Public/www-style/2014Jul/0432.html) (from white to black) with varying degrees of transparency, and we need your feedback about which name is easier to use.

The current proposals are:

### 1\. gray(lightness \[, alpha\])

In this proposal gray(0%) is black, gray(50%) is gray and gray(100%) is white. It also accepts numbers from 0-255 which correspond to rgb(x,x,x) values, so that gray(255) is white and gray(0) is black. It also accepts an **optional second argument for alpha transparency**, so that gray(0, .5) would be equivalent to rgba(0,0,0,.5).

This is the naming of the function in the current [CSS Color Level 4 draft](http://dev.w3.org/csswg/css-color/#grays).

### 2\. white(lightness \[, alpha\])

Its arguments work in the same way as gray(), but it's consistent with the expectation that function names that accept percentages give the "full effect" at 100%. gray(100%) sounds like a shade of gray, when it’s actually white. white(100%) is white, which might be more consistent with author expectations. Of course, this also accepts alpha transparency, like all the proposals listed here.

### 3\. black(lightness \[, alpha\])

black() would work in the opposite way: black(0%) would be white, black(100%) would be black and black(50%,.5) would be semi-transparent gray. The idea is that people are familiar thinking that way from grayscale printing.

### 4\. rgb() with one argument and rgba() with two arguments

rgb(x) would be a shorthand to rgb(x, x, x) and rgba(x, y) would be a shorthand to rgba(x, x, x, y). So, rgb(0) would be black and rgb(100%) or rgb(255) would be white. The benefit is that authors are already accustomed to using rgb() for colors, and this would just be a shortcut. However, note how you will need to change the function name to get a semi-transparent version of the color. Also, if in the future one needs to change the color to not be a shade of gray, a function name change is not needed.

I’ve written [some SCSS to emulate these functions](http://sassmeister.com/gist/20ac0049428ccfcbe8f1) so you can play with them in your stylesheets and figure out which one is more intuitive. Unfortunately rgb(x)/rgba(x,a) cannot be polyfilled in that way, as that would overwrite the native rgb()/rgba() functions. Which might be an argument against them, as being able to polyfill through a preprocessor is quite a benefit for a new color format IMO.

You can [vote here](https://docs.google.com/forms/d/1pp3RY-A4MAs7b-gmqFx6bKn52_G_WLoPFkV0vueiWP4/viewform?usp=send_form), but that’s mainly for easy vote counting. It’s strongly encouraged that you also leave a comment justifying your opinion, either here or in the list.

[Vote now!](https://docs.google.com/forms/d/1pp3RY-A4MAs7b-gmqFx6bKn52_G_WLoPFkV0vueiWP4/viewform?usp=send_form)

Also **tl;dr** If you can't be bothered to read the post and understand the proposals well, please, refrain from voting.
