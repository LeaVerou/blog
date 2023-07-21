---
title: "Image comparison slider with pure CSS"
date: "2014-07-25"
tags:
  - "replies"
  - "tips"
---

As a few of you know, I have been spending a good part of this year writing a book for O’Reilly called “CSS Secrets” ([preorder here!](http://shop.oreilly.com/product/0636920031123.do)). I wanted to include a “secret” about the various uses of the `resize` property, as it’s one of my favorite underdogs, since it rarely gets any love. However, just mentioning the typical use case of improving the UX of text fields didn’t feel like enough of a secret at all. The whole purpose of the book is to get authors to think outside the box about what's possible with CSS, not to recite widely known applications of CSS features. So I started brainstorming: What else could we do with it?

Then I remembered [Dudley’s awesome Before/After image slider from a while ago](http://demosthenes.info/blog/819/A-Before-And-After-Image-Comparison-Slide-Control-in-HTML5). While I loved the result, the markup isn't great and it requires scripting. Also, both images are CSS backgrounds, so for a screen reader, there are no images there. And then it dawned on me: What if I overlaid a `<div>` on an image and made it horizontally resizable through the `resize` property? I tried it, and as you can see below, it worked!

<iframe src="https://dabblet.com/gist/25fa1985bb9f1633c86e" width="100%" height="900"></iframe>

The good parts:

- More semantic markup (2 images & 2 divs). If `object-fit` was widely [supported](http://caniuse.com/#feat=object-fit), it could even be just one div and two images.
- No JS
- Less CSS code

Of course, few things come with no drawbacks. In this case:

- One big drawback is keyboard accessibility. Dudley’s demo uses a range input, so it’s keyboard accessible by design.
- You can only drag from the bottom right corners. In Dudley’s demo, you can click at any point in the slider. And yes, I did try to style ::webkit-resizer and increase its size so that at least it has smoother UX in Webkit. However, no matter what I tried, nothing seemed to work.

Also, none of the two seems to work on mobile.

It might not be perfect, but I thought it’s a pretty cool demo of what’s possible with the `resize` property, as everybody seems to only use it in textareas and the like, but its potential is much bigger.

And now if you’ll excuse me, I have a chapter to write ;)

**Edit:** It looks like [somebody figured out a similar solution](http://codepen.io/Kseso/pen/dyeBL/) a few months ago, which does manage to make the resizer full height, albeit with less semantic HTML and more flimsy CSS. The main idea is that you use a separate element for the resizing (in this case a textarea) with a height of 15px = the height of the resizer. Then, they apply a scaleY() transform to stretch that 15px to the height of the image. Pretty cool! Unfortunately, it requires hardcoding the image size in the CSS.
