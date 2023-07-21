---
title: "Find the vendor prefix of the current browser"
date: "2009-02-13"
tags:
  - "original"
  - "css-properties"
  - "js"
  - "vendor-prefixes"
  - "webkit-bugs"
---

As you probably know already, when browsers implement an experimental or proprietary CSS property, they prefix it with their "vendor prefix", so that 1) it doesn't collide with other properties and 2) you can choose whether to use it or not in that particular browser, since it's support might be wrong or incomplete.

When writing CSS you probably just include all properties and rest in peace, since browsers ignore properties they don't know. However, when changing a style via javascript it's quite a waste to do that.

Instead of iterating over all possible vendor prefixes every time to test if a prefixed version of a specific property is supported, we can create a function that returns the current browser's prefix and caches the result, so that no redundant iterations are performed afterwards. How can we create such a function though?

### Things to consider

1. The way CSS properties are converted their JS counterparts: Every character after a dash is capitalized, and all others are lowercase. The only exception is the new `-ms-` prefixed properties: Microsoft did it again and made their JS counterparts start with a lowercase `m`!
2. Vendor prefixes always start with a dash and end with a dash
3. Normal CSS properties never start with a dash

### Algorithm

1. Iterate over all supported properties and find one that starts with a known prefix.
2. Return the prefix.
3. If no property that starts with a known prefix was found, return the empty string.

### JavaScript code

```js
function getVendorPrefix()
{
	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

	var someScript = document.getElementsByTagName('script')[0];

	for(var prop in someScript.style)
	{
		if(regex.test(prop))
		{
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return prop.match(regex)[0];
		}

	}

	// Nothing found so far?
	return '';
}
```

**Caution:** Don't try to use someScript.style.hasOwnProperty(prop). It's missing on purpose, since if these properties aren't set on the particular element, hasOwnProperty will return false and the property will not be checked.

### Browser bugs

In a perfect world we would be done by now. However, if you try running it in Webkit based browsers, you will notice that the empty string is returned. This is because for some reason, Webkit does not enumerate over empty CSS properties. To solve this, we'd have to check for the support of a property that exists in all webkit-based browsers. This property should be one of the oldest -webkit-something properties that were implemented in the browser, so that our function returns correct results for as old browser versions as possible. `-webkit-opacity` seems like a good candidate but I'd appreciate any better or more well-documented picks. We'd also have to test `-khtml-opacity` as [it seems that Safari had the -khtml- prefix before the -webkit- prefix](http://webkit.org/blog/22/css3-goodies-borders-and-backgrounds/#comment-121). So the updated code would be:

```js
function getVendorPrefix()
{
	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

	var someScript = document.getElementsByTagName('script')[0];

	for(var prop in someScript.style)
	{
		if(regex.test(prop))
		{
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return prop.match(regex)[0];
		}

	}

	// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	// However (prop in style) returns the correct value, so we'll have to test for
	// the precence of a specific property
	if('WebkitOpacity' in someScript.style) return 'Webkit';
	if('KhtmlOpacity' in someScript.style) return 'Khtml';

	return '';
}
```

By the way, if Webkit ever fixes that bug, the result will be returned straight from the loop, since we have added the Webkit prefix in the regexp as well.

### Performance improvements

There is no need for all this code to run every time the function is called. The vendor prefix does not change, especially during the session :P Consequently, we can cache the result after the first time, and return the cached value afterwards:

```js
function getVendorPrefix()
{
	if('result' in arguments.callee) return arguments.callee.result;

	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

	var someScript = document.getElementsByTagName('script')[0];

	for(var prop in someScript.style)
	{
		if(regex.test(prop))
		{
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return arguments.callee.result = prop.match(regex)[0];
		}

	}

	// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	// However (prop in style) returns the correct value, so we'll have to test for
	// the precence of a specific property
	if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
	if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';

	return arguments.callee.result = '';
}
```

### Afterthoughts

- Please don't use this as a browser detection function! Apart from the fact that browser detects are a bad way to code 99.9% of the time, it's also unreliable for IE, since Microsoft added a vendor prefix in IE8 only. Before that it followed the classic attitude "We have a large market share so standards and conventions don't apply to us".
- There are some browsers that support multiple prefixes. If that is crucial for you, you may want to return an array with all prefixes instead of a string. It shouldn't be difficult to alter the code above to do that. I'll only inform you that from my tests, Opera also has `Apple`, `Xn` and `Wap` prefixes and Safari and Chrome also have `Khtml`.
- I wish there was a list somewhere with ALL vendor prefixes... If you know such a page, please leave a comment.
