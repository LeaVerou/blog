---
title: "Advocacy of JavaScript"
date: "2009-03-30"
tags:
  - "rants"
  - "js"
---

I frequently meet these "hardcore" developers that deep (or not so deep) inside them, tend to underestimate JavaScript developers and boast about their own superiority. I'm sure that if you spent an important percentage of your career working with JavaScript and are even barely social, you definitely know what I'm talking about. It's those desktop application programmers or these back-end developers that tend to consider JavaScript a toy, and try to convince you to engage in "more serious stuff" (if they appreciate you even a little; if they don't they just mock you endlessly and/or look down on you).

Funnily enough, when most of these people are required to write JavaScript for some reason, one of the following happens:

1. They write 2000-style code, which is usually the reason that most of them underestimate JavaScript so much: They think that **everybody** codes in JavaScript like themselves.
2. They desperately look for "a good library" because "it's not worth wasting my time to learn that stuff".
3. They actually learn the darn language and the relevant browser quirks and change their attitude towards JavaScript developers.

[Douglas Crockford did it much better than me](http://javascript.crockford.com/javascript.html), but I would like to take my turn in arguing against their most frequent claims, if I may.

### "Javascripters are not really developers."

Oh r'ly? Is it because JavaScript doesn't follow what you've learned to expect from most languages? Well, newsflash: Assembly doesn't either and every programming language is actually an abstraction to it. It's in fact much harder to write the same thing in a language that lacks what we've learned to expect. Think about low level coding: Even the simplest tasks seem hard. At a smaller extent, it's the same with JavaScript: Things that are easy to do in other languages, are a pain in JavaScript, even if we leave out the implementation differences across browsers. For instance, in Java there is a built-in class for most common tasks. JavaScript isn't that rich, and it penalizes you for every external library you use, by forcing your users to download extra Kilobytes of code. JavaScript is probably the only modern language in which short code isn't only elegance, but also a necessity.

Also, in other languages, you only have to deal with **one** implementation. Even when using Java to code for multiple operating systems, the differences are minor for most applications. With JavaScript, you are dealing with at least 5 implementations with many differences and bugs to circumvent. Writing a piece of code that works in one browser is not good enough, you have to make it work across **all** major browsers, in **all** their versions that still have significant market share. And yeah, this is most of the times just as dreadful as it sounds, if not more.

Of course, I'm not implying that everyone who wrote a script in JavaScript is a developer, just like everyone that wrote a Hello World application in C++ is not a programmer. JavaScript is notorious for being used mostly by amateurs for the following reasons:

1. Most people that ever wrote a webpage needed something that could only be done with JavaScript. Most of these people weren't developers and didn't have any interest in programming.
2. Because of (1) there are many JavaScript tutorials and books around for accomplishing simple tasks, most of them being leftovers from the 2000 era and promote bad code practices. During that era, people didn't care about nice code, usability, accessibility and cross-browser functionality. They just wanted to get the job done spending the least possible time and they only cared if it worked in Internet Explorer.
3. Most people just copy and paste stuff from the tutorials mentioned in (2), leading to duplicate functionality, bad code, bad usability, complete absence of accessibility and buggy results in browsers other than the target one. This caused JavaScript to be related to these vices although these things were actually caused by abusing the language.

### "Javascript is a toy, not a real programming language"

It may have been a toy in the 2000 era where your mind is still stuck. Currently, browser vendors are constantly adding new features to it, in order to make it able to compete with a fully-fledged programming language and competent front-end developers have been pushing JavaScript to an extent that was unimaginable when it was first introduced. If you are not convinced, pay a visit to [Chrome Experiments](http://www.chromeexperiments.com/) (as the name suggests, you are advised to use Google Chrome when viewing them).

**JavaScript is not a light version of Java, nor is it a light version of any programming language.** It has a soul of it's own, so stop comparing it to other languages and pointing out the areas where it lacks. Open your eyes instead to see the areas where it's superior to all other languages you probably know ([lambda](http://www.hunlock.com/blogs/Functional_Javascript) for instance).

### "How can I respect a language that only lives inside a browser?"

Newsflash: You are wrong, **again**. You can code in JavaScript [for the server](http://en.wikipedia.org/wiki/Server-side_JavaScript), [create Windows executable files (.exe)](http://www.phpied.com/make-your-javascript-a-windows-exe/), create  plugins and extensions for a plethora of applications, and actually even Flash's ActionScript is based on ECMAScript, a standard that was derived from and currently controls JavaScript implementations.

### Disclaimers

Ah, these are always necessary in rants :)

1. **I didn't have any particular individual in mind when writing this post, so if you think it's about you, get over it.** My memory is too bad to do so anyway. ;)
2. I am not implying that JavaScript is the best programming language around. I actually don't think there is such a language. My point was that JavaScript is not inferior to the others. That doesn't mean I consider it superior either.
3. I don't claim to be a programming guru (anyone who does so is usually ignorant anyway), nor do I claim to be always right. Feel free to argue, if you have thought a valid counterargument. :)
