---
title: "Extend Math.round, Math.ceil and Math.floor to allow for precision"
date: "2009-02-12"
categories:
  - "original"
tags:
  - "js"
  - "math"
---

`Math.round`, `Math.ceil` and `Math.floor` are very useful functions. However, when using them, I find myself many times needing to specify a precision level. You don't always want to round to an integer, you often just want to strip away **some** of the decimals.

We probably all know that if we have a function to round to integers, we can round to X decimals by doing `Math.round(num*Math.pow(10,X)) /` `Math.pow(10,X)`. This kind of duck typing can get tedious, so usually, you roll your own function to do that. However, why not just add that extra functionality to the functions that already exist and you're accustomed to?

Let's start with `Math.round`. It's the most needed one anyway.

Firstly we'll have to store the native function somewhere, since we're going to replace it. So we do something along the lines of:

```js
Math._round = Math.round;
```

Now let's **sigh** replace the native `Math.round` with our own:

```js
Math.round = function(number, precision)
{
	precision = Math.abs(parseInt(precision)) || 0;
	var coefficient = Math.pow(10, precision);
	return Math._round(number*coefficient)/coefficient;
}
```

And guess what? It still works the old way too, so your old scripts won't break.

So now, let's go to `Math.ceil` and `Math.floor`. If you notice, the only thing that changes is the function name. Everything else is the same. So, even though we could copy-paste the code above and change the names, we would end up with triple the size of the code that we need and we would have also violated the [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself "Don't Repeat Yourself") principle. So we could put the names of the functions in an array, and loop over it instead:

```js
(function(){
	var MathFns = ['round', 'floor', 'ceil' ];
	for(var i = MathFns.length; i>-1; i--)
	{
		Math['_' + MathFns[i]] = Math[MathFns[i]];
		Math[MathFns[i]] = function(number, precision)
		{
			precision = Math.abs(parseInt(precision)) || 0;
			var coefficient = Math.pow(10, precision);
			return Math['_' + MathFns[i]](number*coefficient)/coefficient;
		}
   }
})();
```

Why the closure? To allow us to be free in defining our variables without polluting the global namespace. In case `Array.prototype.forEach()` was cross-browser or if you have mutated the `Array` prototype to add it for non-supporting ones, you could easily do that:

```js
['round', 'floor', 'ceil' ].forEach(function(funcName){
	Math['_' + funcName] = Math[funcName];
	Math[funcName] = function(number, precision)
	{
		precision = Math.abs(parseInt(precision)) || 0;
		var coefficient = Math.pow(10, precision);
		return Math['_' + funcName](number*coefficient)/coefficient;
	}
});
```

No closures and much easier to read code.

However, nothing comes without a cost. In this case, the cost is performance. In my tests, the new function takes about twice the time of the native one. Adding a conditional to check if the precision is falsy and use the native function directly if so, doesn't improve the results much, and it would slow the function down for precision values > 0. Of course the speed would be just as much if the function was a normal one and not a replacement for Math[something], that doesn't have anything to do with it.
