---
title: "Extend Math.log to allow for bases != e"
date: "2009-03-26"
tags:
  - "tips"
  - "js"
  - "math"
---

As Math.log currently stands, it's a bit useless. It only calculates natural logarithms (base e).  We can easily modify it however, to calculate logarithms of any base:

```js
Math.log = (function() {
	var log = Math.log;
	return function(n, a) {
		return log(n)/(a? log(a) : 1);
	}
})();
```

We can now specify the base as a second parameter, or still use the default one (Math.E) if we don't specify one, so older scripts won't break or if we want a shortcut to the natural logarithm. ;)
