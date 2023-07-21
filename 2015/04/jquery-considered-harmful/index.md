---
title: "jQuery considered harmful"
date: "2015-04-19"
tags:
  - "rants"
---

Heh, I always wanted to do one of those “X considered harmful” posts\*. :D

Before I start, let me say that I think **jQuery has helped tremendously to move the Web forward**. It gave developers power to do things that were previously unthinkable, and pushed the browser manufacturers to implement these things natively (without jQuery we probably wouldn’t have `document.querySelectorAll` now). And jQuery is still needed for those that cannot depend on the goodies we have today and have to support relics of the past like IE8 or worse.

However, as much as I feel for these poor souls, they are the minority. There are tons of developers that don’t need to support old browsers with a tiny market share. And let’s not forget those who aren’t even Web professionals: Students and researchers not only don’t need to support old browsers, but can often get by just supporting a single browser! You would expect that everyone in academia would be having tons of fun using all the modern goodies of the Open Web Platform, right? And yet, I haven’t seen jQuery being so prominent anywhere else as much as it is in academia. Why? Because this is what they know, and they really don’t have the time or interest to follow the news on the Open Web Platform. They don’t know what they need jQuery for, so they just use jQuery anyway. However, being able to do these things natively now is not the only reason I’d rather avoid jQuery.

### Yes, you probably don’t really need it…

I’m certainly not the first one to point out how much of jQuery usage is about things you can do natively, so I won’t spend time repeating what others have written. Just visit the following and dive in:

- [You might not need jQuery](http://youmightnotneedjquery.com/)
- [You don’t need jQuery!](http://blog.garstasio.com/you-dont-need-jquery/)
- [Do you really need jQuery?](http://www.sitepoint.com/do-you-really-need-jquery/)
- [10 tips for writing JavaScript without jQuery](http://tutorialzine.com/2014/06/10-tips-for-writing-javascript-without-jquery/)
- …and lots more. Just try [googling “you don’t need jQuery”](https://www.google.com/search?q=you+don%27t+need+jquery) and you will find plenty.

I will also not spend time talking about **file size** or how much **faster** native methods are. These have been talked about before. Today, I want to make a point that is not frequently talked about…

### …but that’s not even the biggest reason not to use it today

To avoid extending the native element prototypes, jQuery uses **its own wrapper objects**. Extending native objects in the past was a huge no-no, not only due to potential collisions, but also due to memory leaks in old IE. So, what is returned when you run `$("div")` is not a reference to an element, or a NodeList, it’s a jQuery object. This means that a jQuery object has completely different methods available to it than a reference to a DOM element, an array with elements or any type of NodeList. However, these native objects come up all the time in real code — as much as jQuery tries to abstract them away, you always have to deal with them, even if it’s just wrapping them in $(). For example, the context when a callback is called via jQuery’s .bind() method is a reference to an HTML element, not a jQuery collection. Not to mention that often you use code from multiple sources — some of them assume jQuery, some don’t. Therefore, you always end up with **code that mixes jQuery objects, native elements and NodeLists**. And this is where the hell begins.

If the developer has followed a naming convention for which variables contain jQuery objects (prepending the variable names with a dollar sign is the common one I believe) and which contain native elements, this is less of a problem (humans often end up forgetting to follow such conventions, but let’s assume a perfect world here). However, in most cases no such convention is followed, which results in the code being incredibly hard to understand by anyone unfamiliar with it. Every edit entails a lot of trial and error now (“Oh, it’s not a jQuery object, I have to wrap it with `$()`!” or “Oh, it’s not an element, I have to use \[0\] to get an element!”). To avoid such confusion, developers making edits often end up wrapping anything in `$()` defensively, so throughout the code, the same variable will have gone through `$()` multiple times. For the same reason, it also becomes especially hard to refactor jQuery out of said code. You are essentially **locked in**.

Even if naming conventions have been followed, you can’t just deal only with jQuery objects. You often need to use a native DOM method or call a function from a script that doesn’t depend on jQuery. Soon, conversions to and from jQuery objects are all over the place, cluttering your code.

In addition, when you add code to said codebase, you usually end up wrapping every element or nodelist reference with `$()` as well, because you don’t know what input you’re getting. So, not only you’re locked in, but **all future code you write for the same codebase is also locked in**.

Get any random script with a jQuery dependency that you didn’t write yourself and try to refactor it so that it doesn’t need jQuery. I dare you. You will see that your main issue will not be how to convert the functionality to use native APIs, but understanding what the hell is going on.

### A pragmatic path to JS nudity

Sure, many libraries today require jQuery, and like I recently [tweeted](https://twitter.com/leaverou/status/588504217410609152), avoiding it entirely can feel like you’re some sort of digital vegan. However, this doesn’t mean you have to use it yourself. Libraries can always be replaced in the future, when good non-jQuery alternatives become available.

Also, most libraries are written in such a way that they do not require the $ variable to be aliased to jQuery. Just call [jQuery.noConflict()](https://api.jquery.com/jquery.noconflict/) to reclaim the $ variable and be able to assign it to whatever you see fit. For example, I often define these helper functions, inspired from the [Command Line API](https://developer.chrome.com/devtools/docs/commandline-api#selector):

```javascript
// Returns first element that matches CSS selector {expr}.
// Querying can optionally be restricted to {container}’s descendants
function $(expr, container) {
	return typeof expr === "string"? (container || document).querySelector(expr) : expr || null;
}

// Returns all elements that match CSS selector {expr} as an array.
// Querying can optionally be restricted to {container}’s descendants
function $$(expr, container) {
	return [].slice.call((container || document).querySelectorAll(expr));
}
```

In addition, I think that having to type `jQuery` instead of `$` every time you use it somehow makes you think twice about superfluously using it without really needing to, but I could be wrong :)

Also, if you actually **like** the jQuery API, but want to avoid the bloat, consider using [Zepto](http://zeptojs.com/).

\* I thought it was brutally obvious that the title was tongue-in-cheek, but hey, it’s the Internet, and nothing is obvious. So there: The title is tongue-in-cheek and I’m very well aware of [Eric’s classic essay against such titles](http://meyerweb.com/eric/comment/chech.html).
