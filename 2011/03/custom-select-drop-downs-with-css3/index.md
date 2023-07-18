---
title: "Custom &lt;select&gt; drop downs with CSS3"
date: "2011-03-04"
categories:
  - "original"
  - "tips"
tags:
  - "css-properties"
  - "opera-bugs"
  - "pointer-events"
---

The CSS3 Basic UI module defines [`pointer-events`](http://dev.w3.org/csswg/css3-ui/#pointer-events) as:

> The `pointer-events` property allows authors to control whether or when an element may be the target of user pointing device (pointer, e.g. mouse) events. This property is used to specify under which circumstance (if any) a pointer event should go "through" an element and target whatever is "underneath" that element instead. This also applies to other "hit testing" behaviors such as dynamic pseudo-classes (:hover, :active, :focus), hyperlinks, and Document.elementFromPoint().

The property was originally SVG-only, but eventually browsers and the W3C adopted a more limited version for HTML elements too.

It can be used in many use cases that weren't possible before (or the solution was overly complicated), one of them being to create custom-looking `<select>` drop downs, by overlaying an element over the native drop down arrow (to create the custom one) and disallowing pointer events on it. Here's a quick example:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/leaverou/XxkSC/embedded/result,css"></iframe>

`-webkit-appearance: none` was needed in Webkit to turn off the native OSX appearance (in OSX and maybe Safari on Windows, I didn't test that). However, since that also removes the native drop down arrow, our custom arrow now obscures part of the text, so we had to add a 30px padding-right to the select element, only in Webkit. You can easily detect if `pointer-events` is supported via JS and only apply this it if it is (eg by adding or removing a class from the body element):

if(!('pointerEvents' in document.body.style)) {
    ...
}

However, there is one caveat in this: Opera does include pointerEvents in HTML elements as well, but it does not actually support the property on HTML. There's a more elaborate feature detection script [here](https://github.com/ausi/Feature-detection-technique-for-pointer-events/blob/master/modernizr-pointerevents.js) as a Modernizr plugin (but the code is quite short, so you can adapt it to your needs).

Also, don't try to replicate the behavior in JavaScript for browsers that don't support this: it's impossible to open a `<select>` drop down with JavaScript. Or, to put it differently, if you manage to do it, you'll probably be the first to. Everything I could think of failed and I spent hours yesterday searching for a way, but no avail.

### References

- [W3C specification](http://dev.w3.org/csswg/css3-ui/#pointer-events)
- [MDN article](https://developer.mozilla.org/en/CSS/pointer-events)
