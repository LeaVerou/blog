---
title: "CSS3 border-radius, today"
date: "2009-02-13"
categories:
  - "articles"
tags:
  - "border-radius"
  - "css"
  - "css-properties"
---

This is the first one from a series of articles I'm going to write about _using CSS3 properties or values **today**_. I'll cover everything I have found out while using them, including various browser quirks and bugs I know of or have personally filed regarding them. In this part I'll discuss ways to create rounded corners without images and if possible without JavaScript in the most cross-browser fashion.

I will not cover irregular curves in this article, since I've yet to find any person who actually needed them, even once, including myself and browser support for them is far worse.

**Caution:** The contents of a container with border-radius set are NOT clipped according to the border radius in any implementation/workaround mentioned below, and no, setting overflow to hidden won't help (and even if it did, you'd risk text missing). You should specify a proper border-radius and/or padding to them if you want them to  follow their container's curves properly. This could allow for some nice effects but most of the time it's just a pain in the a$$.

### Mozilla Firefox

Firefox supports rounded corners since version 2. However incomplete support in version 2 made designers sceptical to use them. The problem was that the rounded corners created were aliased back then, and also did not crop the background image, so if you had one, no rounded corners for you. This was fixed in FF3, so now more and more designers are starting to use them. The syntax is

```
-moz-border-radius: [Number][unit];
```

This is effectively a shorthand for:
```
-moz-border-radius-bottomleft: [Number][unit];
-moz-border-radius-bottomright: [Number][unit];
-moz-border-radius-topleft: [Number][unit];
-moz-border-radius-topright: [Number][unit];
```

You don't need to specify all these properties though, even if you wan't different measures per corner, as `-moz-border-radius` functions as a regular CSS shorthand, allowing us to specify all 4 corners at once. It can be used in the following ways:

```
-moz-border-radius: [Top-left and Bottom-right] [Top-right and bottom-left];
-moz-border-radius: [Top-left] [Top-right and bottom-left] [Bottom-right];
-moz-border-radius: [Top-left] [Top-right] [Bottom-right] [Bottom-left];
```

A good mnemonic rule for the order of the values is that they are arranged clockwise, starting from Top left.

### Apple Safari

Safari also implements CSS3 border-radius, but in a quite different way. If you want to set all four corners to the same border-radius, the process is almost identical. The only thing needed is:

```
-webkit-border-radius: [Number][unit]
```

However, things start to get tricky when you want to specify different radiuses per corner. Webkit does not support a shorthand syntax, since it chose to implement the spec closely, sacrifycing clarity but allowing for more flexibility. To cut a long story short, [Webkit supports irregular curves instead of just circle quarters on each corner](http://www.css3.info/border-radius-apple-vs-mozilla/ "Read more about the difference between Mozilla's and Webkit's implementations"), so if you try to add 2 values, the result will be  [horrendous](http://www.css3.info/wp-content/uploads/2007/06/border-radius.png).

So, you have to specify all four properties (or less if you want some of them to be square). To make matters even worse, the way the names of the properties are structured is different. There is one more dash, and the position of the corner styled by each property is not at the end but before _-radius_:

```
-webkit-border-top-left-radius
-webkit-border-top-right-radius
-webkit-border-bottom-left-radius
-webkit-border-bottom-right-radius
```

**Caution:** If the dimensions of your element are not enough to accomodate the rounded corners, they will be square in Webkit-based browsers. Specify a `min-width`/`min-height` or enough padding to avoid this.

### Google Chrome

Since Google Chrome is based on Webkit, its border-radius support is like Safari's. However, it's haunted by an ugly bug: It renders the rounded corners **aliased**. :(

### Opera

The bad news is that Opera does not implement the CSS3 border-radius yet (it will in the future, [confirmed](http://twitter.com/dstorey/status/1177020119)). The good news is that it allows for SVG backgrounds since version 9.5. The even better news is that it supports `data://` URIs, so you can embed the SVG in your CSS, without resorting to external files as [someone recently pointed out to me](http://ejohn.org/blog/talk-performance-improvements-in-browsers/#comment-345434). [Alexis Deveria](http://a.deveria.com/) was clever enough to even [create a generator for them](http://a.deveria.com/roundgen/), so that you could easily specify the background, border width and border-color and get the data URI instantly. This is a quite useful tool, but lacks some features (for instance you might want the background to be semi-transparent, like the one used in this blog). It's ok for most cases though.

While Opera's current lack of border-radius support is disappointing, you can utilize it pretty well with this method and if you know SVG well enough yourself you can create stunning effects.

### Internet Explorer (aka "The Web designer's nemesis")

There's no need to tell you that IE doesn't support border-radius or SVG backgrounds, even in it's latest version, right? You probably guessed already. There is some hope here though, a clever guy named [Drew Diller](http://dillerdesign.wordpress.com/) carefully researched the MS-proprietary [VML language](http://en.wikipedia.org/wiki/Vector_Markup_Language) and came up with [a script that utilizes it to create rounded corners in IE](http://www.dillerdesign.com/experiment/DD_roundies/). The bad news is that MS when releasing IE8 fixed some things and messed up others, so the script barely works on it. It also has some other [shortcomings](http://www.dillerdesign.com/experiment/DD_roundies/#lacking), but for most cases it can be a great tool (for IE7 and below, unless MS surprises us and fixes the VML regressions in IE8 before the stable). Also, if rounded corners are not crucial to your design and you don't get too much traffic from IE users, you might consider ignoring IE altogether and having square corners in it. This way you're also serving the greater good, since when IE users see your site in a supporting browser, they'll conclude that "Oh, this browser shows the web nicer!" and the site will still be just as usable (in most cases rounded corners are not that crucial for usability, although [they enchance it a bit](http://www.usabilitypost.com/2008/09/24/the-function-of-rounded-corners/)).

### Afterword

I hope this article helped you learn something new. If you found any mistakes or inaccuracies, don't hesitate to leave a comment, I don't know everything and I'm not god. :)

One thing I have in mind is creating a PHP script that takes care of all these incompatibilities for you and caches the result. I don't know if I'll ever find the time to write it though, especially before someone else does :P
