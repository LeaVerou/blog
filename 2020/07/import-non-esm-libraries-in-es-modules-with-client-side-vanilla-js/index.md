---
title: "Import non-ESM libraries in ES Modules, with client-side vanilla JS"
date: "2020-07-20"
categories:
  - "tips"
tags:
  - "esm"
  - "js"
defaultLanguage: "js"
---

In case you haven't heard, [ECMAScript modules (ESM) are now supported everywhere](https://caniuse.com/#search=modules)!

While I do have [some gripes with them](#gripes), it’s too late for any of these things to change, so I'm embracing the good parts and have cautiously started using them in new projects. I do quite like that I can just use [`import` statements and dynamic `import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for dependencies with URLs right from my JS, without module loaders, extra `<script>` tags in my HTML, or hacks with dynamic `<script>` tags and `load` events (in fact, [Bliss has had a helper for this very thing](https://blissfuljs.com/docs.html#fn-include) that I've used extensively in older projects). I love that I don't need any libraries for this, and I can use it client-side, anywhere, even in my codepens.

Once you start using ESM, you realize that most libraries out there are not written in ESM, nor do they include ESM builds. Many are still using globals, and those that target Node.js use CommonJS (CJS). What can we do in that case? Unfortunately, ES Modules are not really designed with any import _(pun intended)_ mechanism for these syntaxes, but, there are some strategies we could employ.

## Libraries using globals

**Technically, a JS file can be parsed as a module even with no imports or exports.** Therefore, almost any library that uses globals can be fair game, it can just be imported as a module with no exports! How do we do that?

While you may not see this syntax a lot, you don't actually need to name anything in the `import` statement. There is a syntax to import a module entirely for its side effects:

```
import "url/to/library.js";
```

This syntax works fine for libraries that use globals, since declaring a global is essentially a side effect, and all modules share the same global scope. For this to work, the imported library needs to satisfy the following conditions:

- It should declare the global as a property on `window` (or `self`), not via `var Foo` or `this`. In modules top-level variables are local to the module scope, and `this` is `undefined`, so the last two ways would not work.
- Its code should not violate [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
- The URL is either same-origin or CORS-enabled. While `<script>` can run cross-origin resources, `import` sadly cannot.

Basically, you are running a library as a module that was never written with the intention to be run as a module. Many are written in a way that also works in a module context, but not all. [ExploringJS has an excellent summary of the differences between the two](https://exploringjs.com/es6/ch_modules.html#_browsers-scripts-versus-modules). For example, here is [a trivial codepen loading jQuery](https://codepen.io/leaverou/pen/dyGQXOo?editors=0011) via this method.

## Libraries using CJS without dependencies

I dealt with this today, and it's what prompted this post. I was trying to play around with [Rework CSS](https://github.com/reworkcss/css), a CSS parser used by the [HTTPArchive](https://httparchive.org/) for analyzing CSS in the wild. However, all its code and documentation assumes Node.js. If I could avoid it, I'd really rather not have to make a Node.js app to try this out, or have to dive in module loaders to be able to require CJS modules in the browser. Was there anything I could do to just run this in a codepen, no strings attached?

After a little googling, I found [this issue](https://github.com/reworkcss/css/issues/117). So there was a JS file I could import and get all the parser functionality. Except …there was one little problem. When you look [at the source](https://cdn.jsdelivr.net/gh/reworkcss/css@latest/lib/parse/index.js), it uses `module.exports`. If you just `import` that file, you predictably get an error that `module` is not defined, not to mention there are no ESM exports.

My first thought was to stub `module` as a global variable, import this as a module, and then read `module.exports` and give it a proper name:

```
window.module = {};
import "https://cdn.jsdelivr.net/gh/reworkcss/css@latest/lib/parse/index.js";
console.log(module.exports);
```

However, I was still getting the error that `module` was not defined. How was that possible?! They all share the same global context!! _\*pulls hair out\*_ After some debugging, it dawned on me: [static `import` statements are hoisted](https://exploringjs.com/es6/ch_modules.html#_imports-are-hoisted); the "module" was getting executed before the code that imports it and stubs `module`.

Dynamic imports to the rescue! `import()` is executed exactly where it's called, and returns a promise. So this actually works:

```
window.module = {};
import("https://cdn.jsdelivr.net/gh/reworkcss/css@latest/lib/parse/index.js").then(_ => {
	console.log(module.exports);
});
```

We could even turn it into a wee function, which I cheekily called `require()`:

```
async function require(path) {
	let _module = window.module;
	window.module = {};
	await import(path);
	let exports = module.exports;
	window.module = _module; // restore global
	return exports;
}

(async () => { // top-level await cannot come soon enough…

let parse = await require("https://cdn.jsdelivr.net/gh/reworkcss/css@latest/lib/parse/index.js");
console.log(parse("body { color: red }"));

})();
```

You can fiddle with this code in a [live pen here](https://codepen.io/leaverou/pen/jOWQMzN?editors=0011).

Do note that this technique will only work if the module you’re importing doesn’t import other CJS modules. If it does, you'd need a more elaborate `require()` function, which is left as an exercise for the reader. Also, just like the previous technique, the code needs to comply with strict mode and not be cross-origin.

A similar technique can be used to load AMD modules via `import()`, just stub `define()` and you're good to go.

So, with this technique I was able to quickly whip up a [ReworkCSS playground](https://codepen.io/leaverou/pen/qBbQdGG). You just edit the CSS in CodePen and see the resulting [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), and you can even fork it to share a specific AST with others! :)

https://codepen.io/leaverou/pen/qBbQdGG

## Update: CJS with static imports

After this article was posted, a clever hack was [pointed out to me on Twitter](https://twitter.com/justinfagnani/status/1285325206811107329):

https://twitter.com/justinfagnani/status/1285325206811107329

While this works great if you can have multiple separate files, it doesn't work when you're e.g. quickly trying out a pen. Data URIs to the rescue! [Turns out you can `import` a module from a data URI](https://codepen.io/leaverou/pen/XWXoEJq?editors=0010)!

So let's [adapt our Rework example to use this](https://codepen.io/leaverou/pen/xxZmWvx):

https://codepen.io/leaverou/pen/xxZmWvx

## Addendum: ESM gripes

Since I was bound to get questions about what my gripes are with ESM, I figured I should mention them pre-emptively.

First off, a little context. Nearly all of the JS I write is for libraries. [I write libraries as a hobby](https://github.com/leaverou), [I write libraries as my job](https://mavo.io), and sometimes [I write libraries to help me do my job](https://inspirejs.org). My job is usability (HCI) research (and specifically making programming easier), so I'm very sensitive to developer experience issues. I want my libraries to be usable not just by seasoned developers, but by novices too.

ESM has not been designed with novices in mind. It evolved from the CJS/UMD/AMD ecosystem, in which most voices are seasoned developers.

My main gripe with them, is how they expect full adoption, and settle for nothing less. There is no way to create a bundle of a library that can be used _both_ traditionally, with a global, or as an ES module. There is also no standard way to import older libraries, or libraries using other module patterns (yes, this very post is about doing that, but essentially these are hacks, and there should be a better way). I understand the benefits of static analysis for imports and exports, but I wish there was a dynamic alternative to `export`, analogous to the dynamic `import()`.

In terms of migrating to ESM, I also dislike how opinionated they are: strict mode is great, but forcing it doesn't help people trying to migrate older codebases. Restricting them to cross-origin is also a pain, using `<script>`s from other domains made it possible to quickly experiment with various libraries, and I would love for that to be true for modules too.

But overall, I’m excited that JS now natively supports a module mechanism, and I expect any library I release in the future to utilize it.
