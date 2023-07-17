---
title: "Important -prefix-free update"
date: "2012-07-24"
categories:
  - "news"
tags:
  - "prefix-free"
  - "css-gradients"
  - "css-images"
  - "vendor-prefixes"
---

Those of you that have been following and/or using my work, are surely familiar with [\-prefix-free](http://leaverou.github.com/prefixfree/). Its promise was to let you write DRY code, without all the messy prefixes, that would be standards-compliant in the future (which is why I'm always against adding proprietary features in it, regardless of their popularity). The way [\-prefix-free](http://leaverou.github.com/prefixfree/) works is that it feature tests which CSS features are available **only** with a prefix, and then adds the prefix in front of their occurences in the code. Nothing will happen if the feature is supported both with and without a prefix or if it's not supported at all.

This worked well when browsers implementations aren't significantly different from the unprefixed, standard version. It also works fine when the newer and the older version use incompatible syntaxes. For example, direction keywords in gradients. The old version uses `top` whereas the new version uses `to bottom`. If you include both versions, the cascade does its job and ignores the latter version if it's not supported:

```css
background: linear-gradient(top, white, black);
background: linear-gradient(to bottom, white, black);
```

However, when the same syntax means different things in the older and the newer version, things can go horribly wrong. Thankfully, this case is quite rare. A prime example of this is linear gradient angles. `0deg` means a horizontal (left to right) gradient in prefixed linear-gradients and a vertical (bottom to top) gradient in unprefixed implementations, since they follow the newer [Candidate Recommendation](http://www.w3.org/TR/css3-images/) rather than the old draft. This wasn't a problem when every browser supported only prefixed gradients. However, now that [IE10](http://blogs.msdn.com/b/ie/archive/2012/06/25/unprefixed-css3-gradients-in-ie10.aspx) and [Firefox 16](http://hacks.mozilla.org/2012/07/aurora-16-is-out/) are unprefixing their gradients implementations, it was time for me to face the issue I was avoiding ever since I wrote [\-prefix-free](http://leaverou.github.com/prefixfree/).

The solution I decided on is consistent with [\-prefix-free](http://leaverou.github.com/prefixfree/)’s original promise of allowing you to write mostly standards-compliant code that will not even need [\-prefix-free](http://leaverou.github.com/prefixfree/) in the future. Therefore, **it will assume that your gradients use the newer syntax**, and if only a prefixed implementation is available, it will convert the angles to the legacy definition. This means that **if you update [\-prefix-free](http://leaverou.github.com/prefixfree/) on a page that includes gradients coded with the older definition, they might break**. However, **they would break anyway** in modern browsers, so the sooner the better. Even if you weren't using [\-prefix-free](http://leaverou.github.com/prefixfree/) at all, and had written all the declarations by hand before the angles changed, you would still have to update your code. Unfortunately, that's the risk we all take when using experimental features like CSS gradients and I think it's worth it.

[\-prefix-free](http://leaverou.github.com/prefixfree/) will not take care of any other syntax changes, since when the syntaxes are incompatible, you can easily include both declarations. The angles hotfix was included out of necessity because there is no other way to deal with it.

Here’s a handy JS function that converts older angles to newer ones:

```javascript
function fromLegacy(deg) { return Math.abs(deg-450) % 360 }
```

You can read more about the changes in gradient syntax in [this excellent IEblog article](http://blogs.msdn.com/b/ie/archive/2012/06/25/unprefixed-css3-gradients-in-ie10.aspx).

In addition to this change, a new feature was added to [\-prefix-free](http://leaverou.github.com/prefixfree/). If you ONLY want to use the prefixed version of a feature, but still don’t want to write out of all the prefixes, you can just use `-*-` as a prefix placeholder and it will be replaced with the current browser’s prefix on runtime. So, if you don't want to change your angles, you can just prepend `-*-` to your linear-gradients, like so:

```css
background: -*-linear-gradient(0deg, white, black);
```

However, it's a much more futureproof and standards compatible solution to just update your angles to the new definition. You know you’ll have to do it at some point anyway. ;)

**Edit:** Although -prefix-free doesn’t handle syntax changes in radial gradients, since the syntaxes are mutually incompatible, you may use this little PrefixFree plugin I wrote for the [CSS Patterns Gallery](http://lea.verou.me/css3patterns/), which converts the standard syntax to legacy syntax when needed:

```javascript
StyleFix.register(function(css, raw) {
	if (PrefixFree.functions.indexOf('radial-gradient') > -1) {
		css = css.replace(/radial-gradient\(([a-z-\s]+\s+)?at ([^,]+)(?=,)/g, function($0, shape, center){
			return 'radial-gradient(' + center + (shape? ', ' + shape : '');
		});
	}

	return css;
});
```

Keep in mind however that it's very crude and not very well tested.
