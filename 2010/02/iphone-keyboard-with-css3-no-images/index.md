---
title: "iPhone keyboard with CSS3 -- no images"
date: "2010-02-18"
categories:
  - "original"
tags:
  - "font-face"
  - "box-shadow"
  - "css-gradients"
  - "css3"
  - "iphone"
  - "media-queries"
  - "text-shadow"
  - "user-interfaces-in-css"
---

Yeap, this is yet another of those things that make no practical sense but are fun to make just to see whether it can actually be done. It's also a proof of the fact that when I have too many things to do, I tend to procrastinate more. :P

Here it is (resize the window to get the narrow version ;)):

[http://lea.verou.me/demos/iphone-keyboard/](http://lea.verou.me/demos/iphone-keyboard/)

It should look correct in **Firefox 3.6, Chrome 4 and Safari 4**. It looks best on Firefox 3.6 due to it's ability to render subpixel distances, whereas other browsers just round everything to the closest pixel. It also looks best in computers with **Helvetica** installed (it's installed by default on macs btw) but it should look sufficiently OK with Arial too, since it's a rip-off of Helvetica ;) (the only problem with Arial is that the line-height of the buttons with the symbols will be slightly different since the custom font's measurements are based on Helvetica Bold) Also, ironically, it doesn't look ok in the iPhone!

For those of you that don't use one of the aforementioned browsers as your primary and are way too bored to switch (or don't even have them installed (!)), here are two screenshots from Firefox 3.6 (nicely cropped to only contain the keyboard):

<figure class="center">
<img src="images/css_wide_keyboard.png" alt="" />
<figcaption>Screenshot of the wide version</figcaption>
</figure>

<figure class="center">
<img src="images/css_narrow_keyboard.png" alt="" />
<figcaption>Screenshot of the narrow version</figcaption>
</figure>

As for how it's done, as you can easily see, most of it is run-of-the-mill for someone with a decent grasp on CSS3: media queries, CSS gradients, shadows, border-radiuses and RGBA. The only tricky part is the symbols for shift, backspace and international. I have to admit I cheated a bit here: I didn't use images, but I used @font-face with a custom font that just contains these 3 symbols. The reasons behind that are that this way I wouldn't have to create 2 versions of the symbols (light and dark, for pressed and normal states respectively) and that they are vector, so they scale (try zooming in).

Please note that there's no functionality attached to it. It's just an interface. I wasn't interested at making an on-screen keyboard in general, I was just interested to see if a keyboard visually identical to iPhone's is possible with CSS alone. If someone wants to actually use it and/or develop it further, you're free to do so, as long as you keep the comment at the start of the css file. ;)

An interesting discussion about this could be "What would be the ideal markup to semantically style a keyboard?". Personally, I just paid attention to the more pragmatic objectives of making the keys focusable, and keeping the complexity of the DOM tree to a minimum, so you might find it semantically wrong (I used a <ul> for the container, <li>s for the rows and <button>s for the keys) -- but what is right actually in this case? Is a keyboard a list or a table of keys? I don't think so...
