---
title: "\"Appearances can be deceiving Mr. Anderson\" - a.k.a. short code is not always fast code"
date: "2009-02-25"
tags:
  - "articles"
  - "js"
  - "jquery"
  - "performance"
  - "benchmarks"
  - "type-checks"
---

I used to take pride in my short, bulletproof and elegant String and Number type checks:

```js
// Check whether obj is a Number
obj + 0 === obj

// Check whether obj is a String
obj + '' === obj
```

I always thought that apart from being short and elegant, they **should** be faster.

However, some quick tests gave me a cold slap in the face and proved my assertion to be entirely false. When comparing the following 4 methods for string and number type checking:

1. "My" method (mentioned above)
2. Object.prototype.toString method: `Object.prototype.toString.call(obj) === '[object String]'` or `Object.prototype.toString.call(obj) === '[object Number]'`
3. Typeof method: `typeof obj === 'string'` or `typeof obj === 'number'`
4. Contructor method: `obj.constructor === String` or `obj.constructor === Number`

It turned out that the Object.prototype.toString method was **50%** faster than my method, and both typeof and constructor methods were a whopping **150%** faster than my method! No wonder [jQuery uses the typeof method for their String/Number tests](http://docs.jquery.com/JQuery_Core_Style_Guidelines).

Now that I think about it, it does actually make sense - my method converts `obj` to a String or Number, then concatenates/adds it with another String/Number, then compares value and type. Too much stuff done there to be fast. But I guess I was too innocent and subconsciously thought that it wouldn't be fair if elegant and short code wasn't fast too.

Of course the overall time needed for any of these tests was neglible, but it's a good example of how much appearances can be deceiving - even in programming! ;)

The moral: Never assume. Always test.

### So, which method is ideal for String/Number checks? (added afterwards)

The typeof method and my method fail for non-primitive String/Number objects, as you can easily observe if you type in the console:

```js
typeof new String('foo') // 'object'
typeof new Number(5) // 'object'
new String('foo') + '' === new String('foo') // false
```

This can easily be solved if you also check the type via instanceof (the decrease in speed is negligible):

```js
foo = new String('foo');
typeof foo === 'string' || foo instanceof String
foo + '' === foo || foo instanceof String
```

Don't use instanceof alone, since it fails for String and Number primitives. The instanceof method also fails for Strings and Numbers created in another window, since their constructor there is different. Same happens with the Constructor method mentioned above.

It seems that if you need a **bulletproof** check the only method you can use is the Object.prototype.toString method and luckily, it's one of the fastest (not the fastest one though), so I guess we can safely elect it as the ideal method for String and Number checks (and not only for arrays, as it was first made popular for).

PS: For anyone wondering what the quote in the title reminds him/her, its from the _Matrix Revolutions_ movie.
