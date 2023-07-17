---
title: "Copying object properties, the robust way"
date: "2015-08-16"
categories:
  - "tips"
tags:
  - "js"
---

If, like me, you try to [avoid using heavy libraries when not needed](http://lea.verou.me/2015/04/jquery-considered-harmful/), you must have definitely written a helper to copy properties from one object to another at some point. It’s needed so often that it’s just silly to write the same loops over and over again.

These days, most of my time is spent working on [my research project at MIT](http://lea.verou.me/2014/02/im-going-to-mit/), which I will hopefully reveal later this year. In that, I’m using a lightweight homegrown helper library, which I might release separately at some point as I think it has potential in its own right, for a number of reasons.

Of course, it needed to have a simple `extend()` method as well, to copy properties from one object to another. Let’s assume for the purposes of this article that we’re talking about shallow copying, that overwrites are allowed, and let’s omit `hasOwnProperty()` checks to make code easier to read.

It’s a simple task, right? Our first attempt might look like this:

```javascript
$.extend = function (to, from) {
	for (var property in from) {
		to[property] = from[property];
	}

	return to;
}
```

This works fine, until you try it on objects with accessors or other types of properties defined via `Object.defineProperty()` or `get`/`set` keywords. What do you do then? Our next iteration could look like this:

```javascript
$.extend = function (to, from) {
	for (var property in from) {
		Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property));
	}

	return to;
}
```

This works much better, until it fails, and it can fail pretty epically. Try this:

```javascript
$.extend(document.body.style, {
	backgroundColor: "red"
});
```

Both in Chrome and Firefox, the results are super weird. Even though reading `document.body.style.backgroundColor` will return `"red"`, no style will have actually been applied. In Firefox it even destroyed the native setter entirely and any future attempts to set `document.body.style.backgroundColor` in the console did absolutely nothing.

In contrast, the previous naïve approach worked fine for this. It’s clear that we need to somehow combine the two approaches, using Object.defineProperty() only when actually needed. But when is it actually not needed?

One obvious case is if the descriptor is `undefined` (such as with some native properties). Also, in simple properties, such as those in our object literal, the descriptor will be of the form `{value: somevalue, writable: true, enumerable: true, configurable: true}`. So, the next obvious step would be:

```javascript
$.extend = function (to, from) {
	var descriptor = Object.getOwnPropertyDescriptor(from, property);

	if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
		Object.defineProperty(to, property, descriptor);
	}
	else {
		to[property] = from[property];
	}
}
```

This works perfectly, but is a little clumsy. I’ve currently left it at that, but any suggestions for making it more elegant are welcome :)

FWIW, I looked at [jQuery’s implementation of jQuery.extend()](http://james.padolsey.com/jquery/#v=git&fn=jQuery.extend) after this, and it seems it doesn’t even handle accessors at all, unless I missed something. Time for a pull request, perhaps…

**Edit:** As MaxArt pointed out in the comments, there is a similar native method in ES6, [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). However, it does not deal with copying accessors, so does not deal with this problem either.
