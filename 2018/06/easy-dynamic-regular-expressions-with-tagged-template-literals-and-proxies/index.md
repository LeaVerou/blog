---
title: "Easy Dynamic Regular Expressions with Tagged Template Literals and Proxies"
date: "2018-06-04"
categories:
  - "original"
  - "tips"
tags:
  - "es"
  - "js"
---

If you use regular expressions a lot, you probably also create them from existing strings that you first need to escape in case they contain special characters that need to be matched literally, like `$` or `+`. Usually, a helper function is defined (hopefully this will soon change as [RegExp.escape()](https://github.com/benjamingr/RegExp.escape/) is coming!) that basically looks like this:

```js
var escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
```

and then regexps are created by escaping the static strings and concatenating them with the rest of the regex like this:

```js
var regex = RegExp(escapeRegExp(start) + '([\\S\\s]+?)' + escapeRegExp(end), "gi")
```

or, with ES6 template literals, like this:

```js
var regex = RegExp(`${escapeRegExp(start)}([\\S\\s]+?)${escapeRegExp(end)}`, "gi")
```

(In case you were wondering, this regex is taken directly from the [Mavo source code](https://github.com/mavoweb/mavo/blob/master/src/expression.js#L48))

Isn't this horribly verbose? What if we could define a regex with just a template literal (`` `${start}([\\S\\s]+?)${end}` `` for the regex above) and it just worked? Well, it turns out we can! If you haven't seen [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) before, I suggest you click that MDN link and read up. Basically, you can prepend an ES6 template literal with a reference to a function and the function accepts the static parts of the string and the dynamic parts separately, allowing you to operate on them!

So, what if we defined such a function that returns a RegExp object and escapes the dynamic parts? Let's try to do that:

```js
var regexp = (strings, ...values) => {
	return RegExp(strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i+1]).join(""))
};
```

And now we can try it in the console:

```js
> regexp`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//
```

### Won’t somebody, please, think of the flags?!

This is all fine and dandy, but how do we specify flags? Note that the original regexp had flags ("gi"). The tagged template syntax doesn't really allow us to pass in any additional parameters. However, thanks to functions being first-class objects in JS, we can have a function that takes the flags in as parameters and returns a function that generates regexps with the right flags:

```js
var regexp = flags => {
	return (strings, ...values) => {
		var pattern = strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i+1]).join("")
		return RegExp(pattern, flags);
	}
};
```

And now we can try it in the console:

```js
> regexp("gi")`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//gi
```

This works nice, but now even if we don't want any flags, we can't use the nice simple syntax we had earlier, we need to include a pair of empty parens:

```js
> regexp()`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//
```

Can we have our cake and eat it too? Can we have the short parenthesis-less syntax when we have no flags, and still be able to specify flags? Of course! We can check the arguments we have and either return a function, or call the function. If our function is used as a tag, the first argument will be an array ([thanks Roman!](http://lea.verou.me/2018/06/easy-dynamic-regular-expressions-with-tagged-template-literals-and-proxies/#comment-3930513790)). If we're expecting it to return a function, the first argument would be a string: the flags. So, let's try this approach!

```js
var regexp = (...args) => {
	var ret = (flags, strings, ...values) => {
		var pattern = strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i+1]).join("");
		return RegExp(pattern, flags);
	};

	if (Array.isArray(args[0])) {
		// Used as a template tag
		return ret("", ...args);
	}

	return ret.bind(undefined, args[0]);
};
```

And now we can try it in the console and verify that both syntaxes work:

```js
> regexp("gi")`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//gi
regexp`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//
```

### Even nicer syntax, with proxies!

Is there a better way? If this is not super critical for performance, we could use [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to return the right function with a template tag like `regexp.gi`, no parentheses or quotes needed and the code is actually shorter too:

```js
var _regexp = (flags, strings, ...values) => {
	var pattern = strings[0] + values.map((v, i) => escapeRegExp(v) + strings[i+1]).join("");
	return RegExp(pattern, flags);
};
var regexp = new Proxy(_regexp.bind(undefined, ""), {
	get: (t, property) => _regexp.bind(undefined, property)
});
```

And now we can try it in the console, both with and without flags!

```js
> regexp.gi`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//gi
> regexp`^${'/*'}([\\S\\s]+?)${'*/'}`;
< /^\/\*([\S\s]+?)\*\//
```

That's some beauty right there! ?

_PS: If you liked this, take a look at [this mini-library](http://2ality.com/2017/07/re-template-tag.html) by Dr. Axel Rauschmayer that uses a similar idea and turns it into a library that does more than just escaping strings (different syntax for flags though, they become part of the template string, like in PHP)_
