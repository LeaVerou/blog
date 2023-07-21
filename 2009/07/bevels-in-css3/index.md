---
title: "Bevels in CSS3"
date: "2009-07-23"
tags:
  - "original"
  - "tips"
  - "box-shadow"
  - "css"
  - "css-properties"
---

Yeah, yeah I know, bevels are soooo 1996. And I agree. However, it's always good to know the capabilities of your tools. Talented designers will know when it's suitable to use a certain effect and incapable ones will abuse whatever is given to them, so after a lot of thought, I decided to blog about my discovery.

Even though not directly mentioned in the spec, CSS3 is capable of easily creating a bevel effect on any element. Moreover, if the element has rounded corners, the bevel follows that as well. Before explaining the technique, let's think about how a bevel actually gets drawn. It's essentially two inner shadows, that when combined, create the illusion of a 3d appearance: a light one from the top left corner and a dark one from the bottom right corner. CSS3 includes the ability to create inner shadows, if you specify the keyword "inset" in the box-shadow declaration (currently only supported by Firefox 3.5). Moreover, the CSS3 spec allows for multiple box shadows on the same elements.

Now, let's examine an example (only works in Firefox 3.5):

button {
 background:#f16;
 color:white;
 padding:6px 12px 8px 12px;
 border:none;
 font-size:18px;
 -moz-border-radius:10px;
 -moz-box-shadow: -2px -2px 10px rgba(0,0,0,.25) inset, 2px 2px 10px white inset;
}

which produces this result:

![css3bevel](images/css3bevel.png)

If we want, we can also create a "pressed" button state, in a similar fashion:

button:active {
 -moz-box-shadow: 2px 2px 10px rgba(0,0,0,.25) inset, -2px -2px 10px white inset;
 padding:7px 11px 7px 13px;
}

button::-moz-focus-inner { border: 0; }

which produces this pressed state:

![css3bevel_pressed](images/css3bevel_pressed.png)

See it in action here (only for Firefox 3.5): [http://lea.verou.me/demos/css3bevel.html](http://lea.verou.me/demos/css3bevel.html "Linkification: http://lea.verou.me/demos/css3bevel.html")

Of course, if implemented in a real world website, you should also add the -webkit- and -o- CSS3 properties to provide a closer effect for the other browsers and be ready for the time when the ones that aren't implemented yet in them will finally make it (for instance, when Webkit implements inset box shadows, it will work in it as well).

Enjoy **responsibly**. :-)
