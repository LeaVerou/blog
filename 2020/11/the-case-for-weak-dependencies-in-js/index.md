---
title: "The case for Weak Dependencies in JS"
date: "2020-11-19"
tags:
  - "articles"
  - "esm"
  - "js"
  - "software-engineering"
---

Earlier today, I was briefly entertaining the idea of writing a library to wrap and enhance querySelectorAll in certain ways. I thought I'd rather not introduce a [Parsel](http://projects.verou.me/parsel/) dependency out of the box, but only use it to parse selectors properly when it's available, and use more crude regex when it's not (which would cover most use cases for what I wanted to do).

In the olden days, where every library introduced a global, I could just do:

```js
if (window.Parsel) {
	let ast = Parsel.parse();
	// rewrite selector properly, with AST
}
else {
	// crude regex replace
}
```

However, with ESM, there doesn't seem to be a way to detect whether a module is imported, without actually importing it yourself.

I [tweeted](https://twitter.com/LeaVerou/status/1329389035249422336) about this…

https://twitter.com/LeaVerou/status/1329389035249422336

I thought this was a common paradigm, and everyone would understand why this was useful. However, I was surprised to find that most people were baffled about my use case. Most of them thought I was either talking about conditional imports, or error recovery after failed imports.

I suspect it might be because my primary perspective for writing JS is that of a library author, where I do not control the host environment, whereas for most developers, their primary perspective is that of writing JS for a specific app or website.

After [Kyle Simpson asked me to elaborate](https://twitter.com/LeaVerou/status/1329389035249422336) about the use case, I figured a blog post was in order.

The use case is essentially **progressive enhancement** (in fact, I toyed with the idea of titling this blog post _**“Progressively Enhanced JS”**_). If library X is loaded already by other code, do a more elaborate thing and cover all the edge cases, otherwise do a more basic thing. It's for dependencies that are not really **depend**encies, but more like **nice-to-haves**.
<!-- more -->
We often see modules that do things really well, but use a ton of dependencies and add a lot of weight, even to the simplest of projects, because they need to cater to all the edge cases that we may not care about. We also see modules that are dependency free, but that's because lots of things are implemented more crudely, or certain features are not there.

This paradigm gives you the best of both worlds: **Dependency free** (or low dependency) modules, that can use what's available to improve how they do things with **zero additional impact**.

Using this paradigm, the **size of these dependencies is not a concern**, because they are **optional peer dependencies**, so one can pick the best library for the job without being affected by bundle size. Or even use multiple! One does not even need to pick one dependency for each thing, they can support bigger, more complete libraries when they're available and fall back to micro-libraries when they are not.

Some examples besides the one in the first paragraph:

- A Markdown to HTML converter that also syntax highlights blocks of code if [Prism](https://prismjs.com) is present. Or it could even support multiple different highlighters!
- A code editor that uses [Incrementable](https://projects.verou.me/incrementable) to make numbers incrementable via arrow keys, if it's present
- A templating library that also uses [Dragula](https://bevacqua.github.io/dragula/) to make items rearrangable via drag & drop, if present
- A testing framework that uses [Tippy](https://atomiks.github.io/tippyjs/) for nice informational popups, when it's available
- A code editor that shows code size (in KB) if a library to measure that is included. Same editor can also show gzipped code size if a gzip library is included.
- A UI library that uses a custom element if it's available or the closest native one when it's not (e.g. a fancy date picker vs `<input type="date">` ) when it isn't. Or [Awesomplete](https://projects.verou.me/awesomplete/) for autocomplete when it's available, and fall back to a simple `<datalist>` when it isn't.
- Code that uses a date formatting library when one is already loaded, and falls back to [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) when it's not.

This pattern can even be **combined with conditional loading**: e.g. we check for all known syntax highlighters and load Prism if none are present.

To recap, some of the **main benefits** are:

- **Performance:** If you're loading modules over the network HTTP requests are expensive. If you're pre-bundling it increases bundle size. Even if code size is not a concern, runtime performance is affected if you take the slow but always correct path when you don't need it and a more crude approach would satisfice.
- **Choice:** Instead of picking one library for the thing you need, you can support multiple. E.g. multiple syntax highlighters, multiple Markdown parsers etc. If a library is always needed to do the thing you want, you can load it conditionally, if none of the ones you support are loaded already.

## Are weak dependencies an antipattern?

Since this article was posted, some of the feedback I got was along the lines of _"Weak dependencies are an antipattern because they are unpredictable. What if you have included a library but don't want another library to use it? You should instead use parameters to explicitly provide references to these libraries."_

There are several counterpoints to make here.

First, if weak dependencies are used well, they are only used to _enhance_ the default/basic behavior, so it's highly unlikely that you'd want to turn that off and fall back to the default behavior.

Second, weak dependencies and parameter injection are not mutually exclusive. They can work together and complement each other, so that the weak dependencies provide sensible defaults that the parameters can then tweak further (or disable altogether). _Only_ having parameter injection imposes a high upfront cognitive cost for using the library (see _[Convention over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)_). **Good APIs make simple things easy and complex things possible.** The common case is that if you've loaded e.g. a syntax highlighter, you'd want to use it to syntax highlight, and if you've loaded a parser, you'd prefer it over parsing with regexes. The obscure edge cases where you wouldn't want to highlight or you want to provide a different parser can still be possible via parameters, but should not be the only way.

Third, the end user-developer may not even be aware of all the libraries that are being loaded, so they may already have a library loaded for a certain task but not know about it. The weak dependencies pattern operates directly on which modules are loaded so it doesn't suffer from this problem.

## How could this work with ESM?

Some people (mostly fellow library authors) \*did\* understand what I was talking about, and expressed some ideas about how this would work.

**Idea 1:** A global module loaded cache could be a low-level way to implement this, and something CJS supports out of the box apparently.

https://twitter.com/WebReflection/status/1329396560694796290

**Idea 2:** A global registry where modules can register themselves on, either with an identifier, or a SHA hash
**Idea 3:** An `import.whenDefined(moduleURL)` promise, though that makes it difficult to deal with the module not being present at all, which is the whole point.

https://twitter.com/WebReflection/status/1329420308491677696

https://twitter.com/jcampbell\_05/status/1329413956474187777

**Idea 4:** Monitoring `<link rel="modulepreload">`. The problem is that not all modules are loaded this way.

https://twitter.com/getify/status/1329407281797222401

**Idea 5:** I was thinking of a function like `import()` that resolves with the module (same as a regular dynamic import) only when the module is already loaded, or rejects when it's not (which can be caught). In fact, it could even use the same functional notation, with a second argument, like so:

```js
import("https://cool-library", {weak: true});
```

Nearly all of these proposals suffer from one of the following problems.

Those that are **URL based** mean that only modules loaded from the same URL would be recognized. The same library loaded over a CDN vs locally would not be recognized as the same library.

One way around this is to expose a list of URLs, like the first idea, and allow to listen for changes to it. Then these URLs can be inspected and those which _**might**_ belong to the module we are looking for can be further inspected by dynamically importing and inspecting their exports (importing already imported modules is a pretty cheap operation, the browser does de-duplicate the request).

Those that are **identifier based**, depend on the module to register itself with an identifier, so only modules that want to be exposed, will be. This is the closest to the old global situation, but would suffer in the transitional period until most modules use it. And of course, there is the potential for clashes. Though the API could take care of that, by essentially using a hashtable and adding all modules that register themselves with the same identifier under the same "bucket". Code reading the registry would then be responsible for filtering.
