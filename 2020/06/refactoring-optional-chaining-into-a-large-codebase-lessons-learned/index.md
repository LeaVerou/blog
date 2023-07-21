---
title: "Refactoring optional chaining into a large codebase: lessons learned"
date: "2020-06-18"
tags:
  - "articles"
  - "js"
  - "refactoring"
defaultLanguage: "js"
---

[Chinese translation by Coink Wang](https://coink.wang/refactoring-optional-chaining-into-a-large-codebase-lessons-learned-chinese.html)

![](https://memegenerator.net/img/instances/400x/80477833/refactor-all-the-things.jpg)

Now that [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) is supported [across the board](https://caniuse.com/#feat=mdn-javascript_operators_optional_chaining), I decided to finally refactor [Mavo](https://mavo.io) to use it (yes, yes, we do provide a transpiled version as well for older browsers, settle down). This is a moment I have been waiting for a long time, as I think optional chaining is the single most substantial JS syntax improvement since arrow functions and template strings. Yes, I think it's more significant than async/await, just because of the mere frequency of code it improves. Property access is literally _everywhere_.

First off, what is _optional chaining_, in case you haven't heard of it before?

You know how you can't just do `foo.bar.baz()` without checking if `foo` exists, and then if `foo.bar` exists, and then if `foo.bar.baz` exists because you'll get an error? So you have to do something awkward like:

```
if (foo && foo.bar && foo.bar.baz) {
	foo.bar.baz();
}
```

Or even:

```
foo && foo.bar && foo.bar.baz && foo.bar.baz();
```

Some even [contort object destructuring to help with this](https://medium.com/@ismail9k/use-javascript-optional-chaining-today-f0b1d080b3c6). With optional chaining, you can just do this:

```
foo?.bar?.baz?.()
```

It supports normal property access, brackets (`foo?.[bar]`), and even function invocation (`foo?.()`). Sweet, right??

Yes, _mostly._ Indeed, there is SO MUCH code that can be simplified with it, it's incredible. But there are a few caveats.

## Patterns to search for

Suppose you decided to go ahead and refactor your code as well. What to look for?

There is of course the obvious `foo && foo.bar` that becomes `foo?.bar`.

There is also the conditional version of it, that we described in the beginning of this article, which uses `if()` for some or all of the checks in the chain.

There are also a few more patterns.

### Ternary

```
foo? foo.bar : defaultValue
```

Which can now be written as:

```
foo?.bar || defaultValue
```

or, using the other awesome new operator, the _[nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)_:

```
foo?.bar ?? defaultValue
```

### Array checking

```
if (foo.length > 3) {
	foo[2]
}
```

which now becomes:

```
foo?.[2]
```

Note that this is no substitute for a real array check, like the one done by `Array.isArray(foo)`. Do not go about replacing proper array checking with duck typing because it's shorter. We stopped doing that over [a decade ago](http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/).

### Regex match

Forget about things like this:

```
let match = "#C0FFEE".match(/#([A-Z]+)/i);
let hex = match && match[1];
```

Or even things like that:

```
let hex = ("#C0FFEE".match(/#([A-Z]+)/i) || [,])[1];
```

Now it's just:

```
let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];
```

In our case, I was able to even remove two utility functions and replace their invocations with this.

### Feature detection

In simple cases, feature detection can be replaced by `?.`. For example:

```
if (element.prepend) element.prepend(otherElement);
```

becomes:

```
element.prepend?.(otherElement);
```

### Don't overdo it

While it may be tempting to convert code like this:

```
if (foo) {
	something(foo.bar);
	somethingElse(foo.baz);
	andOneLastThing(foo.yolo);
}
```

to this:

```
something(foo?.bar);
somethingElse(foo?.baz);
andOneLastThing(foo?.yolo);
```

_Don't_. You're essentially having the JS runtime check `foo` three times instead of one. You may argue these things don't matter much anymore performance-wise, but it's the same repetition for the human reading your code: they have to mentally process the check for `foo` three times instead of one. And if they need to add another statement using property access on `foo`, they need to add yet another check, instead of just using the conditional that's already there.

## Caveats

### You still need to check before assignment

You may be tempted to convert things like:

```
if (foo && foo.bar) {
	foo.bar.baz = someValue;
}
```

to:

```
foo?.bar?.baz = someValue;
```

Unfortunately, that's not possible and will error. This was an actual snippet from our codebase:

```
if (this.bar && this.bar.edit) {
	this.bar.edit.textContent = this._("edit");
}
```

Which I happily refactored to:

```
if (this.bar?.edit) {
	this.bar.edit.textContent = this._("edit");
}
```

All good so far, this works nicely. But then I thought, wait a second… do I need the conditional at all? Maybe I can just do this:

```
this.bar?.edit?.textContent = this._("edit");
```

Nope. `Uncaught SyntaxError: Invalid left-hand side in assignment`. Can't do that. You still need the conditional. I literally kept doing this, and I'm glad I had ESLint in my editor to warn me about it without having to actually run the code.

### It's very easy to put the ?. in the wrong place or forget some ?.

Note that if you're refactoring a long chain with optional chaining, you often need to insert multiple `?.` after the first one, for every member access that may or may not exist, otherwise you will get errors once the optional chaining returns undefined.

Or, sometimes you may _think_ you do, because you put the `?.` in the wrong place.

Take the following real example. I originally refactored this:

```
this.children[index]? this.children[index].element : this.marker
```

into this:

```
this.children?.[index].element ?? this.marker
```

then got a `TypeError: Cannot read property 'element' of undefined`. Oops! Then I fixed it by adding an additional `?.`:

```
this.children?.[index]?.element ?? this.marker
```

This works, but is superfluous, as pointed out in the comments. I just needed to _move_ the `?.`:

```
this.children.[index]?.element ?? this.marker
```

Note that [as pointed out in the comments](https://lea.verou.me/2020/06/refactoring-optional-chaining-into-a-large-codebase-lessons-learned/#comment-4963612068) be careful about replacing array length checks with optional access to the index. This might be bad for performance, because out-of-bounds access on an array is de-optimizing the code in V8 (as it has to check the prototype chain for such a property too, not only decide that there is no such index in the array).

### It can introduce bugs if you're not careful

If, like me, you go on a refactoring spree, it's easy after a certain point to just introduce optional chaining in places where it actually ends up _changing what your code does_ and introducing subtle bugs.

#### null vs undefined

Possibly the most common pattern is replacing `foo && foo.bar` with `foo?.bar`. While in most cases these work equivalently, this is not true for every case. When `foo` is `null`, the former returns `null`, whereas the latter returns `undefined`. This can cause bugs to creep up in cases where the distinction matters and is probably the most common way to introduce bugs with this type of refactoring.

#### Equality checks

Be careful about converting code like this:

```
if (foo && bar && foo.prop1 === bar.prop2) { /* ... */ }
```

to code like this:

```
if (foo?.prop1 === bar?.prop2) { /* ... */ }
```

In the first case, the condition will not be true, unless _both_ `foo` and `bar` are truthy. However, in the second case, if _both_ `foo` and `bar` are nullish, the conditional will be true, because both operands will return `undefined`!

The same bug can creep in even if the second operand doesn't include any optional chaining, as long as it could be `undefined` you can get unintended matches.

#### Operator precedence slips

One thing to look out for is that [optional chaining has higher precedence than `&&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). This becomes particularly significant when you replace an expression using `&&` that also involves equality checks, since the (in)equality operators are sandwiched between `?.` and `&&`, having lower precedence than the former and higher than the latter.

```
if (foo && foo.bar === baz) { /* ... */ }
```

What is compared with `baz` here? `foo.bar` or `foo && foo.bar`? Since `&&` has lower precedence than `===`, it's as if we had written:

```
if (foo && (foo.bar === baz)) { /* ... */ }
```

Note that the conditional cannot ever be executed if `foo` is falsy. However, once we refactor it to use optional chaining, it is now as if we were comparing (`foo && foo.bar`) to `baz`:

```
if (foo?.bar === baz) { /* ... */ }
```

An obvious case where the different semantics affect execution is when `baz` is `undefined`. In that case, we can enter the conditional when `foo` is nullish, since then optional chaining will return `undefined`, which is basically the case we described above. In most other cases this doesn't make a big difference. It can however be pretty bad when instead of an equality operator, you have an _inequality_ operator, which still has the same precedence. Compare this:

```
if (foo && foo.bar !== baz) { /* ... */ }
```

with this:

```
if (foo?.bar !== baz) { /* ... */ }
```

Now, we are going to enter the conditional every time `foo` is nullish, as long as `baz` is not `undefined`! The difference is not noticeable in an edge case anymore, but in the average case! 😱

#### Return statements

Rather obvious after you think about it, but it's easy to forget return statements in the heat of the moment. You cannot replace things like this:

```
if (foo && foo.bar) {
	return foo.bar();
}
```

with:

```
return foo?.bar?.();
```

In the first case, you return conditionally, whereas in the second case you return always. This will not introduce any issues if the conditional is the last statement in your function, but it will change the control flow if it's not.

#### Sometimes, it can fix bugs too!

Take a look at this code I encountered during my refactoring:

```
/**
 * Get the current value of a CSS property on an element
 */
getStyle: (element, property) => {
	if (element) {
		var value = getComputedStyle(element).getPropertyValue(property);

		if (value) {
			return value.trim();
		}
	}
},
```

Can you spot the bug? If `value` is an empty string (and given the context, it could very well be), the function will return `undefined`, because an empty string is falsy! Rewriting it to use optional chaining fixes this:

```
if (element) {
	var value = getComputedStyle(element).getPropertyValue(property);

	return value?.trim();
}
```

Now, if `value` is the empty string, it will still return an empty string and it will only return `undefined` when `value` is nullish.

#### Finding usages becomes trickier

This was pointed out by Razvan Caliman on Twitter:

https://twitter.com/razvancaliman/status/1273638529399230464

## Bottom line

In the end, this refactor made Mavo about 2KB lighter and saved 37 lines of code. It did however make the transpiled version 79 lines and 9KB (!) heavier.

[Here is the relevant commit](https://github.com/mavoweb/mavo/commit/a8fb2e1f8c478aa7110aaf13ade57a40825ec71e), for your perusal. I tried my best to exercise restraint and not introduce any unrelated refactoring in this commit, so that the diff is chock-full of optional chaining examples. It has 104 additions and 141 deletions, so I'd wager it has about 100 examples of optional chaining in practice. Hope it's helpful!
