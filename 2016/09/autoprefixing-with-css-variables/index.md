---
title: "Autoprefixing, with CSS variables!"
date: "2016-09-07"
tags:
  - "original"
  - "tips"
  - "css"
  - "css-variables"
---

Recently, when I was making the minisite for [markapp.io](http://markapp.io), I realized a neat trick one can do with CSS variables, precisely due to their dynamic nature. Let's say you want to use a property that has multiple versions: an unprefixed one and one or more prefixed ones. In this example we are going to use `clip-path`, which [currently](http://caniuse.com/#feat=css-clip-path) needs both an unprefixed version and a `-webkit-` prefixed one, however the technique works for any property and any number of prefixes or different property names, as long as the value is the same across all variations of the property name.

The first part is to define a `--clip-path` property on every element with a value of initial. This prevents the property from being inherited every time it's used, and since the `*` has zero specificity, any declaration that uses `--clip-path` can override it. Then you define all variations of the property name with `var(--clip-path)` as their value:

```
* {
	--clip-path: initial;
	-webkit-clip-path: var(--clip-path);
	clip-path: var(--clip-path);
}
```

Then, every time we need clip-path, we use --clip-path instead and it just works:

```
header {
	--clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 2.5em), 0% 100%);
}
```

Even `!important` should work, because [it affects the cascading of CSS variables](https://www.w3.org/TR/css-variables/#syntax). Furthermore, if for some reason you want to explicitly set `-webkit-clip-path`, you can do that too, again because \* has zero specificity. The main downside to this is that it limits browser support to the intersection of the support for the feature you are using and support for CSS Variables. However, [all browsers except Edge support CSS variables](http://caniuse.com/#feat=css-variables), and [Edge is working on it](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/csscustompropertiesakacssvariables/). I can't see any other downsides to it (except having to use a different property name obvs), but if you do, let me know in the comments!

I think there's still a lot to be discovered about cool uses of CSS variables. I wonder if there exists a variation of this technique to produce custom longhands, e.g. breaking `box-shadow` into `--box-shadow-x`, `--box-shadow-y` etc, but I can't think of anything yet. Can you? ;)
