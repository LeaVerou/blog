---
title: "Check whether the browser supports RGBA (and other CSS3 values)"
date: "2009-03-01"
categories:
  - "original"
  - "tips"
tags:
  - "colors"
  - "css"
  - "css-values"
  - "feature-detection"
  - "js"
  - "rgba"
---

When using CSS, we can just include both declarations, one using rgba, and one without it, as mentioned in my post on [cross-browser RGBA backgrounds](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/). When writing JavaScript however, it's a waste of resources to do that (and requires more verbose code), since we can easily check whether the browser is RGBA-capable, almost as easily as we can check [whether it suppports a given property](http://lea.verou.me/2009/02/check-if-a-css-property-is-supported/). We can even follow the same technique to detect the support of other CSS3 values (for instance, [multiple backgrounds](http://www.css3.info/preview/multiple-backgrounds/) support, [HSLA](http://www.css3.info/preview/hsla/) support, etc).

The technique I'm going to present is based on the fact that when we assign a non-supported CSS value on any supported CSS property, the browser either throws an error AND ignores it (IE-style), or simply ignores it (Firefox-style). Concequently, to check whether RGBA is supported, the algorithm would be:

1. Get the `color` (or `backgroundColor`, or `borderColor` or any property that is widely supported and accepts color values) value of the `style` object of any element that exists in the page for sure (for instance, the first script tag) and store it in a variable.
2. Assign an RGBA color to the `color` property of that element and catch any errors produced.
3. Assign to a variable whether the `color` of that element did change (boolean `true` or `false`).
4. Restore the previous color to the `color` property, so that our script doesn't interfere with the designer's decisions.
5. Return the stored result.

and it would result in the following code:

function supportsRGBA()
{
	var scriptElement = document.getElementsByTagName('script')\[0\];
	var prevColor = scriptElement.style.color;
	try {
		scriptElement.style.color = 'rgba(1,5,13,0.44)';
	} catch(e) {}
	var result = scriptElement.style.color != prevColor;
	scriptElement.style.color = prevColor;
	return result;
}

### Performance improvements

The code above works, but it wastes resources for no reason. Every time the function is called, it tests RGBA support again, even though the result will never change. So, we need a way to cache the result, and return the cached result after the first time the function is called.

This can be achieved in many ways. My personal preference is to store the result as a property of the function called, named `'result'`:

function supportsRGBA()
{
	if(!('result' in arguments.callee))
	{
		var scriptElement = document.getElementsByTagName('script')\[0\];
		var prevColor = scriptElement.style.color;
		try {
			scriptElement.style.color = 'rgba(0, 0, 0, 0.5)';
		} catch(e) {}
		arguments.callee.result = scriptElement.style.color != prevColor;
		scriptElement.style.color = prevColor;
	}
	return arguments.callee.result;
}

### Making it bulletproof

There is a rare case where the script element might **already** have `rgba(0,0,0,0.5)` set as it's color value (don't ask me why would someone want to do that :P ), in which case our function will return `false` even if the browser actually supports RGBA. To prevent this, you might want to check whether the `color` property is already set to `rgba(0,0,0,0.5)` and return `true` if it is (because if the browser doesn't support rgba, it will be blank):

function supportsRGBA()
{
	if(!('result' in arguments.callee))
	{
		var scriptElement = document.getElementsByTagName('script')\[0\];
		var prevColor = scriptElement.style.color;
		var testColor = 'rgba(0, 0, 0, 0.5)';
		if(prevColor == testColor)
		{
			arguments.callee.result = true;
		}
		else
		{
			try {
				scriptElement.style.color = testColor;
			} catch(e) {}
			arguments.callee.result = scriptElement.style.color != prevColor;
			scriptElement.style.color = prevColor;
		}
	}
	return arguments.callee.result;
}

Done!
