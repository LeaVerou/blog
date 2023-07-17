---
title: "CSSNinja's custom forms revisited to work with CSS sprites"
date: "2010-02-19"
categories:
  - "replies"
tags:
  - "selectors"
---

I read today [CSS Ninja](http://www.thecssninja.com/)'s (Ryan Sheddon's) [brilliant new technique about the creation of custom checkboxes and radio buttons with CSS alone](http://www.thecssninja.com/css/custom-inputs-using-css).

The only thing that bugged me about it was something he pointed himself out as well:

> This technique has only 1 drawback I can think of, IE support is not a drawback for me, you can’t use a big sprite image to save all the radio and checkbox states, they need to be individual images. Using CSS generated content to insert an image doesn’t give you control of the image position like a background image does.

And then I wondered "but hey, **why** can't we use background images?". It seemed pretty obvious to me that we could combine a transparent text color with normal css sprites and a display of inline-block in the ::before pseudo-element to achieve the exact same effect. I verified that my initial assertion was actually correct, and tested it in Firefox, Chrome, Safari and Opera (the latest only, no time for testing in older ones at the moment) and it seems to work fine.

Here it is: [demo](http://lea.verou.me/demos/cssninja-custom-forms/) | [source files (including .psd file of the sprite)](http://lea.verou.me/demos/cssninja-custom-forms/source.zip)

I'm afraid there's some blatantly obvious drawback in my approach that made Ryan prefer his method over this, but I'm posting it just in case...
