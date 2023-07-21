---
title: "Check whether a CSS property is supported"
date: "2009-02-10"
tags:
  - "tips"
  - "css-properties"
  - "feature-detection"
  - "js"
---

Sometimes when using JavaScript, you need to determine whether a certain CSS property is supported by the current browser or not. For instance when setting opacity for an element, you need to find out whether the property that the browser supports is `opacity`, `-moz-opacity` (`MozOpacity`), `-khtml-opacity` (`KhtmlOpacity`) or the IE proprietary `filter`.

Instead of performing a forwards **in**compatible browser detect, you can easily check which property is supported with a simple conditional. The only thing you'll need is a DOM element that exists for sure. A DOM element that exists in every page and is also easily accessible via JS (no need for `getElementsByTagName`), is the `body` element, but you could use the `<head>` or even a `<script>` tag (since there is a script running in the page, a `<script>` tag surely exists). **In this article we'll use document.body, but it's advised that you use the head or script elements, since document.body may not exist at the time your script is run.**

So, now that we have an element to test at, the test required is:

```js
if('opacity' in document.body.style)
{
	// do stuff
}
```

Of course you'd change `document.body` with a reference to the element you'd like to test at (in case it's not the body tag)  and `'opacity'` with the name of the actual property you want to test. You can even wrap up a function to use when you want to check about the support of a certain property:

```js
function isPropertySupported(property)
{
	return property in document.body.style;
}
```

The only thing you should pay attention to, is using the JavaScript version of the CSS property (for example `backgroundColor` instead of `background-color`)

Wasn't it easy?
