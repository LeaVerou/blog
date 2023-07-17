---
title: "Resolve Promises externally with this one weird trick"
date: "2016-12-14"
categories:
  - "original"
  - "tips"
tags:
  - "es"
  - "js"
defaultLanguage: "js"
---

Those of us who use promises heavily, have often wished there was a `Promise.prototype.resolve()` method, that would force an existing Promise to resolve. However, for architectural reasons (throw safety), there is no such thing and probably never will be. Therefore, a Promise can only resolve or reject by calling the respective methods in its constructor:

```
var promise = new Promise((resolve, reject) => {
	if (something) {
		resolve();
	}
	else {
		reject();
	}
});
```

However, often it is not desirable to put your entire code inside a Promise constructor so you could resolve or reject it at any point. In my latest case today, I wanted a Promise that resolved when a tree was created, so that third-party components could defer code execution until the tree was ready. However, given that plugins could be running on any hook, that meant wrapping a ton of code with the Promise constructor, which was obviously a no-go. I had come across this problem before and usually gave up and created a Promise around all the necessary code. However, this time my aversion to what this would produce got me to think even harder. What could I do to call `resolve()` asynchronously from outside the Promise?

A custom event? Nah, too slow for my purposes, why involve the DOM when it's not needed?

Another Promise? Nah, that just transfers the problem.

An setInterval to repeatedly check if the tree is created? OMG, I can't believe you just thought that Lea, ewwww, gross!

Getters and setters? Hmmm, maybe that could work! If the setter is inside the Promise constructor, then I can resolve the Promise by just setting a property!

My first iteration looked like this:

```
this.treeBuilt = new Promise((resolve, reject) => {
	Object.defineProperty(this, "_treeBuilt", {
		set: value => {
			if (value) {
				resolve();
			}
		}
	});
});

// Many, many lines below…

this._treeBuilt = true;
```

However, it really bothered me that I had to define 2 properties when I only needed one. I could of course do some cleanup and delete them after the promise is resolved, but the fact that at some point in time these useless properties existed will still haunt me, and I'm sure the more OCD-prone of you know exactly what I mean. Can I do it with just one property? Turns out I can!

The main idea is realizing that the getter and the setter could be doing completely unrelated tasks. In this case, setting the property would resolve the promise and reading its value would return the promise:

```
var setter;
var promise = new Promise((resolve, reject) => {
	setter = value => {
		if (value) {
			resolve();
		}
	};
});

Object.defineProperty(this, "treeBuilt", {
	set: setter,
	get: () => promise
});

// Many, many lines below…

this.treeBuilt = true;
```

For better performance, once the promise is resolved you could even delete the dynamic property and replace it with a normal property that just points to the promise, but be careful because in that case, any future attempts to resolve the promise by setting the property will make you lose your reference to it!

I still think the code looks a bit ugly, so if you can think a more elegant solution, I'm all ears (well, eyes really)!

**Update:** [Joseph Silber gave an interesting solution on twitter](https://twitter.com/joseph_silber/status/809176159858655234):

```
function defer() {
	var deferred = {
		promise: null,
		resolve: null,
		reject: null
	};

	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
}

this.treeBuilt = defer();

// Many, many lines below…

this.treeBuilt.resolve();
```

I love that this is reusable, and calling `resolve()` makes a lot more sense than setting something to true. However, I didn't like that it involved a separate object (deferred) and that people using the treeBuilt property would not be able to call .then() directly on it, so I simplified it a bit to only use one Promise object:

```
function defer() {
	var res, rej;

	var promise = new Promise((resolve, reject) => {
		res = resolve;
		rej = reject;
	});

	promise.resolve = res;
	promise.reject = rej;

	return promise;
}

this.treeBuilt = defer();

// Many, many lines below…

this.treeBuilt.resolve();
```

Finally, something I like!
