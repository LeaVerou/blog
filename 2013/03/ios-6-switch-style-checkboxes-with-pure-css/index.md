---
title: "iOS 6 switch style checkboxes with pure CSS"
date: "2013-03-15"
tags:
  - "original"
  - "css"
  - "forms"
---

I recently found myself looking at the Tools switch in Espresso:

![](images/Screen-Shot-2013-03-15-at-15.32.33-.png "Screen Shot 2013-03-15 at 15.32.33")

Not because I was going to use it (I rarely do), but because I started wondering what would be the best way to replicate this effect in CSS. I set on to create something that adhered to the following rules:

1. It should be keyboard accessible
2. It should work in as many browsers as possible and degrade gracefully to a plain checkbox in the rest
3. It shouldn’t depend on pseudo-elements in replaced elements (such as checkboxes), since that’s non-standard so not very dependable
4. It shouldn’t require any extra HTML elements
5. It shouldn’t use JS, unless perhaps to generate HTML that could be written by hand if the author wishes to do so.

Why you may ask? Some of them are good practices in general, and the rest make it easier to reuse the component (and they made it more challenging too!).

The best idea I came up with was to use a radial gradient for the knob and animate its background-position. All that on a checkbox. After a lot of tweaking, I settled on something that looked decent (although not as good as the Espresso one) in the browser I was using (Chrome) and went ahead to test it in others. The result was disappointing: I had forgotten that not all browsers allow that kind of customization on checkboxes. And who can blame them? This is what happens when you’re wandering in Undefined Behavior Land. They are not violating any spec, because there is no spec mandating or forbidding checkboxes from being stylable with CSS and to what extent, so every browser does its thing there.

Here you can see my failed attempt, which only works as intended in Chrome:

<iframe src="https://dabblet.com/gist/5078981/457e62ee672ba69fe6ce5a3f6c173528366a2203" width="100%" height="200"></iframe>

I realized I had to lift one of the restrictions if I wanted to solve this, so I picked the 4th (no extra HTML elements), as it was the least important one. I could have done it as a pseudoelements on `<label>`s, but I decided to use a `<div>` instead, for maximum flexibility. The `<div>` is added through script in the Dabblet below, but it could be added by hand instead.

<iframe src="https://dabblet.com/gist/5078981" width="100%" height="500"></iframe>

To get around the limitation of pseudo-elements not being animatable in current and older versions of WebKit, I animate the padding of the `<div>` instead.

And then I thought, why not make iOS-style switches? Even more challenging! I turned on my iPhone and tried to replicate the look. Adding the ON/OFF text was very painful, as it needs to both animate and be styled differently for “ON” and “OFF”. Eventually, I ended up doing it with `text-indent` in such a way that it depends on the knob’s position, so that when the knob animates, the text moves too.

Another challenge with this was the different backgrounds. Changing the background color upon `:checked` was not enough, since it needs to slide as well, not just abruptly change or fade in. I ended up doing it with a gradient and animating its background-position. Naturally, this makes it not look as good in IE9.

So, without further ado, here is the final result:

<iframe src="https://dabblet.com/gist/5166717" width="100%" height="800"></iframe>

Yes, I know there are other efforts on the web to replicate this effect with pure CSS, but none of them seems to come as close to the original, without images and with such minimal HTML.

Why bother, you may ask? Well, it was a fun pastime during SXSW breaks or sessions that turned out to be less interesting than expected or in the plane on the way home. Besides, I think that it could be useful in some cases, perhaps if the styling is tweaked to not resemble iOS too obviously or maybe in iOS app mockups or something.

Enjoy!

_Credits to [Ryan Seddon](http://www.thecssninja.com/css/custom-inputs-using-css) for paving the way for custom form elements through CSS, a couple years ago_
