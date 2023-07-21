---
title: "Idea: Extending native DOM prototypes without collisions"
date: "2015-04-20"
tags:
  - "thoughts"
  - "js"
---

As I pointed out in [yesterday’s blog post](http://lea.verou.me/2015/04/jquery-considered-harmful/), one of the reasons why I don’t like using jQuery is its wrapper objects. For jQuery, this was a wise decision: Back in 2006 when it was first developed, IE releases had a pretty icky **memory leak bug** that could be easily triggered when one added properties to elements. Oh, and we also didn’t have access to element prototypes on IE back then, so we had to add these properties manually on every element. [Prototype.js](http://prototypejs.org/) attempted to go that route and the result was such a mess that they decided to change their decision in Prototype 2.0 and go with wrapper objects too. There were even [long essays being written back then about how much of a monumentally bad idea it was to extend DOM elements](http://perfectionkills.com/whats-wrong-with-extending-the-dom/).

The first IE release that exposed element prototypes was IE8: We got access to Node.prototype, Element.prototype and a few more. Some were mutable, some were not. On IE9, we got the full bunch, including HTMLElement.prototype and its descendants, such as HTMLParagraphElement. The memory leak bugs were mitigated in IE8 and fixed in IE9. However, we still don’t extend native DOM elements, and for good reason: collisions are still a very real risk. No library wants to add a bunch of methods on elements, it’s just bad form. It’s like being invited in someone’s house and defecating all over the floor.

**But what if we could add methods to elements without the chance of collisions?** (well, technically, by minimizing said chance). We could only add **one property** to Element.prototype, and then hang all our methods on that. E.g. if our library was called yolo and had two methods, foo() and bar(), calls to it would look like:

```javascript
var element = document.querySelector(".someclass");
element.yolo.foo();
element.yolo.bar();
// or you can even chain, if you return the element in each of them!
element.yolo.foo().yolo.bar();
```

Sure, it’s more awkward than wrapper objects, but the benefit of using native DOM elements is worth it if you ask me. Of course, YMMV.

**It’s basically exactly the same thing we do with globals**: We all know that adding tons of global variables is bad practice, so every library adds one global and hangs everything off of that.

However, if we try to implement something like this in the naïve way, we will find that it’s kind of hard to reference the element used from our namespaced functions:

```javascript
Element.prototype.yolo = {
	foo: function () {
		console.log(this);
	},

	bar: function () { /* ... */ }
};

someElement.yolo.foo(); // Object {foo: function, bar: function}
```

What happened here? `this` inside any of these functions refers to the object that they are called on, not the element that object is hanging on! We need to be a bit more clever to get around this issue.

Keep in mind that `this` in the object inside `yolo` _would_ have access to the element we’re trying to hang these methods off of. But we’re not running any code there, so we’re not taking advantage of that. If only we could get a reference to that object’s context! However, running a function (e.g. `element.yolo().foo()`) would spoil our nice API.

Wait a second. We can run code on properties, via ES5 accessors! We could do something like this:

```javascript
Object.defineProperty(Element.prototype, "yolo", {
	get: function () {
		return {
			element: this,
			foo: function() {
				console.log(this.element);
			},

			bar: function() { /* ... */ }
		}
	},
	configurable: true,
	writeable: false
});

someElement.yolo.foo(); // It works! (Logs our actual element)
```

This works, but there is a rather annoying issue here: We are **generating this object and redefining our functions every single time this property is called.** This is a rather bad idea for performance. Ideally, we want to **generate this object once**, and then return the generated object. We also don’t want every element to have its own completely separate instance of the functions we defined, we want to define these functions on a prototype, and use the wonderful JS inheritance for them, so that our library is also dynamically **extensible**. Luckily, there is a way to do all this too:

```javascript
var Yolo = function(element) {
	this.element = element;
};

Yolo.prototype = {
	foo: function() {
		console.log(this.element);
	},

	bar: function() { /* ... */ }
};

Object.defineProperty(Element.prototype, "yolo", {
	get: function () {
		Object.defineProperty(this, "yolo", {
			value: new Yolo(this)
		});

		return this.yolo;
	},
	configurable: true,
	writeable: false
});

someElement.yolo.foo(); // It works! (Logs our actual element)

// And it’s dynamically extensible too!
Yolo.prototype.baz = function(color) {
	this.element.style.background = color;
};

someElement.yolo.baz("red") // Our element gets a red background
```

Note that in the above, **the getter is only executed once**. After that, it overwrites the `yolo` property with a static value: An instance of the `Yolo` object. Since we’re using `Object.defineProperty()` we also don’t run into the issue of breaking enumeration (`for..in` loops), since these properties have `enumerable: false` by default.

There is still the wart that these methods need to use `this.element` instead of `this`. We could fix this by wrapping them:

```javascript
for (let method in Yolo.prototype) {
	Yolo.prototype[method] = function(){
		var callback = Yolo.prototype[method];

		Yolo.prototype[method] = function () {
			var ret = callback.apply(this.element, arguments);

			// Return the element, for chainability!
			return ret === undefined? this.element : ret;
		}
	}
}
```

However, now you can’t dynamically add methods to `Yolo.prototype` and have them automatically work like the native Yolo methods in `element.yolo`, so it kinda hurts extensibility (of course you could still add methods that use `this.element` and they would work).

Thoughts?
