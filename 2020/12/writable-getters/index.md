---
title: "Writable getters"
date: "2020-12-23"
categories:
  - "tutorials"
tags:
  - "accessors"
  - "es"
  - "js"
  - "js-patterns"
defaultLanguage: "js"
---

<figure>

![](images/ouroboros.jpg)
<figcaption>

Setters removing themselves are reminiscent of [Ouroboros](https://en.wikipedia.org/wiki/Ouroboros), the serpent eating its own tail, an ancient symbol. [Media credit](https://commons.wikimedia.org/wiki/File:The_serpent_Ouroboros,_from_Cyprianus,_18th_C_Wellcome_L0036620.jpg)
</figcaption>
</figure>

A pattern that has come up a few times in my code is the following: an object has a property which defaults to an expression based on its other properties _unless_ it's explicitly set, in which case it functions like a normal property. Essentially, the expression functions as a default value.

Some examples of use cases:

- An object where a default `id` is generated from its `name` or `title`, but can also have custom ids.
- An object with information about a human, where `name` can be either specified explicitly or generated from `firstName` and `lastName` if not specified.
- An object with parameters for drawing an ellipse, where `ry` defaults to `rx` if not explicitly set.
- An object literal with date information, and a `readable` property which formats the date, but can be overwritten with a custom human-readable format.
- An object representing parts of a Github URL (e.g. username, repo, branch) with an `apiCall` property which can be either customized or generated from the parts _(this is actually the [example](https://github.com/mavoweb/mavo/pull/670#issuecomment-749585736) which prompted this blog post)_

Ok, so now that I convinced you about the utility of this pattern, how do we implement it in JS? Our first attempt may look something like this:

```
let lea = {
	name: "Lea Verou",
	get id() {
		return this.name.toLowerCase().replace(/\W+/g, "-");
	}
}
```

_**Note:** We are going to use object literals in this post for simplicity, but the same logic applies to variations using `Object.create()`, or a class `Person` of which `lea` is an instance._

Our first attempt doesn't quite work as you might expect:

```
lea.id; // "lea-verou"
lea.id = "lv";
lea.id; // Still "lea-verou"!
```

Why does this happen? The reason is that the presence of the getter turns the property into an _accessor_, and thus, [it cannot also hold data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description:~:text=Property%20descriptors%20present%20in%20objects%20come,two%20flavors%3B%20it%20cannot%20be%20both.). If it doesn't have a setter, then simply nothing happens when it is set.

However, we can have a setter that, when invoked, _deletes the accessor and replaces it with a data property_:

```
let lea = {
	name: "Lea Verou",
	get id() {
		return this.name.toLowerCase().replace(/\W+/g, "-");
	},
	set id(v) {
		delete this.id;
		return this.id = v;
	}
}
```

## Abstracting the pattern into a helper

If we find ourselves needing this pattern in more than one places in our codebase, we could abstract it into a helper:

```
function writableGetter(o, property, getter, options = {}) {
	Object.defineProperty(o, property, {
		get: getter,
		set (v) {
			delete this[property];
			return this[property] = v;
		},
		enumerable: true,
		configurable: true,
		...options
	});
}
```

Note that we used `Object.defineProperty()` here instead of the succinct `get`/`set` syntax. Not only is the former more convenient for augmenting pre-existing objects, but also it allows us to customize enumerability, while the latter just defaults to `enumerable: true`.

We'd use the helper like this:

```
let lea = {name: "Lea Verou"};
writableGetter(lea, "id", function() {
	return this.name.toLowerCase().replace(/\W+/g, "-");
}, {enumerable: false});
```

## Overwriting the getter with a _different_ getter

This works when we want to overwrite with a static value, but what if we want to overwrite with a _different_ getter? For example, consider the date use case: what if we want to maintain a single source of truth for the date components and only overwrite the format, as a function, so that when the date components change, the formatted date updates accordingly?

If we are confident that setting the property to an actual function value wouldn't make sense, we could handle that case specially, and create a new getter instead of a data property:

```
function writableGetter(o, property, getter, options = {}) {
	return Object.defineProperty(o, property, {
		get () {
			return getter.call(this);
		},
		set (v) {
			if (typeof v === "function") {
				getter = v;
			}
			else {
				delete this[property];
				return this[property] = v;
			}
		},
		enumerable: true,
		configurable: true,
		...options
	});
}
```

Do note that if we set the property to a static value, and try to set it to a function after that, it will just be a data property that creates a function, since we've deleted the accessor that handled functions specially. If that is a significant concern, we can maintain the accessor and just update the getter:

```
function writableGetter(o, property, getter, options = {}) {
	return Object.defineProperty(o, property, {
		get () {
			return getter.call(this);
		},
		set (v) {
			if (typeof v === "function") {
				getter = v;
			}
			else {
				getter = () => v;
			}
		},
		enumerable: true,
		configurable: true,
		...options
	});
}
```

## Improving the DX of our helper

While this was the most straightforward way to define a helper, it doesn't _feel_ very natural to use. Our object definition is now scattered in multiple places, and readability is poor. This is often the case when we start implementing before designing a UI. In this case, writing the helper is the implementation, and its calling code is effectively the UI.

**It's always a good practice to start designing functions by writing a call to that function**, as if a tireless elf working for us had already written the implementation of our dreams.

So how would we _prefer_ to write our object? I'd actually prefer to use the more readable `get()` syntax, and have everything in one place, then somehow _convert_ that getter to a writable getter. Something like this:

```
let lea = {
	name: "Lea Verou",
	get id() {
		return this.name.toLowerCase().replace(/\W+/g, "-");
	}
}
makeGetterWritable(lea, "id", {enumerable: true});
```

Can we implement something like this? Of course. This is JS, we can do anything!

The main idea is that we read back the descriptor our `get` syntax created, fiddle with it, then stuff it back in as a new property:

```
function makeGetterWritable(o, property, options) {
	let d = Object.getOwnPropertyDescriptor(o, property);
	let getter = d.get;

	d.get = function() {
		return getter.call(this);
	};

	d.set = function(v) {
		if (typeof v === "function") {
			getter = v;
		}
		else {
			delete this[property];
			return this[property] = v;
		}
	};

	// Apply any overrides, e.g. enumerable
	Object.assign(d, options);

	// Redefine the property with the new descriptor
	Object.defineProperty(o, property, d)
}
```

## Other mixed data-accessor properties

While JS is very firm in its distinction of accessor properties and data properties, the reality is that we often need to combine the two in different ways, and conceptually it's more of a _data-accessor spectrum_ than two distinct categories. Here are a few more examples where the boundary between data property and accessor property is somewhat ...murky:

- _"Live" data properties_: properties which execute code to produce side effects when they are get or set, but still hold data like a regular data property. This can be faked by having a helper that creates a hidden data property. This idea is the core of `[Bliss.live()](https://blissfuljs.com/docs#fn-live)`.
- _Lazy evaluation_: Properties which are evaluated when they are first read (via a getter), then replace themselves with a regular data property. If they are set before they are read, they function exactly like a writable getter. This idea is the core of `[Bliss.lazy()](https://blissfuljs.com/docs#fn-lazy)`. [MDN mentions this pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters) too.

_**Note:** Please don't actually implement id/slug generation with `name.toLowerCase().replace(/\W+/g, "-")`. That's very simplistic, to keep examples short. It privileges English/ASCII over other languages and writing systems, and thus, should be avoided._
