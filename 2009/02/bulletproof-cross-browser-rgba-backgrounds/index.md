---
title: "Bulletproof, cross-browser RGBA backgrounds, today"
date: "2009-02-15"
categories:
  - "articles"
  - "original"
  - "releases"
tags:
  - "colors"
  - "css"
  - "php"
  - "rgba"
---

**UPDATE:** [**New version**](http://lea.verou.me/rgba.php/)

First of all, happy Valentine's day for yersterday. :) This is the second part of my "[Using CSS3 today](http://lea.verou.me/2009/02/css3-border-radius-today/)" series. This article discusses current RGBA browser support and ways to use RGBA backgrounds in non-supporting browsers. Bonus gift: A PHP script of mine that creates fallback 1-pixel images on the fly that allow you to easily utilize RGBA backgrounds in any browser that can support png transparency. In addition, the images created are forced to be cached by the client and they are saved on the server's hard drive for higher performance.

### Browsers that currently support RGBA

These are:

- Firefox 3+
- Safari 2+
- Opera 10 (still in beta)
- Google Chrome

In these browsers you can write CSS declarations like:

background: rgba(255,200,35,0.5) url(somebackground.png) repeat-x 0 50%;
border: 1px solid rgba(0,0,0,0.3);
color: rgba(255,255,255,0.8);

And they will work flawlessly.

### Internet Explorer

Surprisingly, it seems that [Internet Explorer supported RGBA backgrounds long before the others](http://www.hedgerwow.com/360/dhtml/rgba/demo.php). Of course, with it's [very own properietary syntax](http://msdn.microsoft.com/en-us/library/ms532997.aspx), as usual:

filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#550000FF, endColorstr=#550000FF);

And since nothing is ever simple with IE, IE8 [requires a special syntax which has to be put before the first one](http://blogs.msdn.com/ie/archive/2008/09/08/microsoft-css-vendor-extensions.aspx) to work properly in IE8 beta1:

\-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#550000FF, endColorstr=#550000FF)";

The code above actually draws a gradient from `rgba(0,0,255,0.33)` to `rgba(0,0,255,0.33)` using a Microsoft-proprietary "extended" hex format that places the Alpha parameter first (instead of last) and in the range of 00-FF (instead of 0-1). The rest is a usual hex color, in that case #0000FF.

**Caution:** The "gradients" that are created via the gradient filter are placed **on top** of any backgrounds currently in effect. So, if you want to have a background image as well, the result may not be what you expected. If you provide a solid color as a background, it will also not work as expected (no alpha transparency), since the gradients created are not exactly backgrounds, they are just layers **on top** of backgrounds.

### Problems with the filter method

- Filters are bad for client-side performance.
- Filters cause the text rendering to be aliased and especially when it's bold and there is no background-color set it becomes completely unreadable. (the worst disadvantage if you ask me)
- Filters only work with IE. What about Firefox 2- and Opera 9.6-?
- Filters are lengthy (especially now that you have to include 2 different syntaxes) so they significantly increase the size of your CSS when used frequently.
- You have to convert the red, green and blue values to hex to use that method.
- To use a filter, the element has to [have Layout](http://haslayout.net/). This is usually done via zoom:1. More non-standard clutter in your CSS.
- Doesn't play along well with other workarounds, since it doesn't modify the background of the element.

So, personally, I only use that approach sparingly, in particular, only when "no/minimum external files" is a big requirement.

### A bulletproof solution

My favored approach is to use rgba() for all RGBA-capable browsers and fallback pngs for the ones that don't support RGBA. However, creating the pngs in Photoshop, or a similar program and then uploading them is too much of a fuss for me to bare (I get bored easily :P ). So, I created a small PHP script that:

- Creates a 1-pixel png image with the parameters passed for red, green, blue and alpha. No need to convert to hex.
- Supports named colors, to speed up typing even more for colors that you use commonly in a site (it includes white and black by default, but you may easily add as many as you like).
- Stores the generated images on the server, so that they don't have to be created every time (generating images on the fly has quite an important performance impact).
- Forces the images to be cached on the browser so that they don't have to be generated every time (even though their size is very small, about 73 bytes).

Here it is: [rgba.php](uploads/rgba.zip)

You use it like this:

background: url(rgba.php?r=255&g=100&b=0&a=50) repeat;
background: rgba(255,100,0,0.5);

or, for named colors:

background: url(rgba.php?name=white&a=50) repeat;
background: rgba(255,255,255,0.5);

Browsers that are RGBA-aware will follow the second background declaration and will not even try to fetch the png. Browsers that are RGBA-incapable will ignore the second declaration, since they don't understand it, and stick with the first one. **Don't change the order of the declarations: The png one goes first, the rgba() one goes second.** If you put the png one second, it will always be applied, even if the browser **does** support rgba.

Before you use it, open it with an editor to specify the directory you want it to use to store the created pngs (the default is `'colors/'`) and add any color names you want to be able to easily address (the defaults are white and black). If the directory you specify does not exist or isn't writeable you'll get an error.

**Caution:** You have to enter the alpha value in a scale of 0 to 100, and not from 0 to 1 as in the CSS. This is because you have to urlencode dots to transfer them via a URI and it would complicate things for anyone who used this.

**Edit:** It seems that IE8 sometimes doesn't cache the image produced. I should investigate this further.

**IMPORTANT: If your PHP version is below 5.1.2 perform [this change](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/#comment-101) in the PHP file or it won't work.**

### Why not data:// URIs?

Of course, you could combine the IE gradient filter, rgba() and `data://` URIs for [a cross-browser solution that does not depend on external files](http://www.webdevelopedia.com/better_opacity.html). However, this approach has some disadvantages:

- All the [disadvantages of filters mentioned above](#filter-issues).
- You can't be spontaneous in your CSS and changes are difficult. Every time you want to use RGBA, you have to resort to some converter to create the png and it's `data://` URI. Unless you are some kind of a cyborg with an embedded base64 encoder/decoder in your head :P
- Larger filesize (you have to use 4-5 declarations (the rgba() one, the `data://` one, 2 filters, one for IE7- and one for IE8 and a `zoom:1;` to give the element "layout" so that filters can be applied) instead of 2, and the data:// URI has the same size as the png). Also, the `data://` URI can not be cached so every time you use it, you increase the filesize even more.  Ok, you save an http request per use, but is it worth it?

and some advantages:

- You will not see the site without a background for even a single millisecond. Since the png is embedded in the CSS, it's loaded as soon as the CSS itself is loaded. If your site background is too dark and you rely on the RGBA background to make the content legible, you might want to consider this solution.
- No external files, no extra http requests.
- The filter method works in IE6- without the script for transparent PNGs.

Choose the method that fits your needs better. :)

### RGBA is not only for backgrounds!

It's also for every CSS property that accepts color values. However, backgrounds in most cases are the easiest to workaround. As for borders, if you want solid ones, you can simulate them sometimes by wrapping a padded container with an RGBA background around your actual one and giving it as much padding as your desired border-width. For text color, sometimes you can fake that with opacity. However, these "solutions" are definitely incomplete, so you'd probably have to wait for full RGBA support and provide solid color fallbacks for those (unless someone comes up with an ingenious solution in <canvas>, it's common these days :P ).
