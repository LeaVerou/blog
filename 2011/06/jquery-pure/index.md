---
title: "jQuery Pure: Call for contributors"
date: "2011-06-09"
tags:
  - "thoughts"
  - "js"
  - "jquery"
---

This post is about an idea I've had for ages, but never found the time to actually start working on it. Maybe because it looks like a quite big project if done properly, so it's scary to do it on my own without any help.

jQuery has a huge amount of code that deals with browser bugs and lack of implementations. For example, it needs a full-fledged selector engine, to cater for old browsers that don't support the [Selectors API](http://www.w3.org/TR/selectors-api2/). Or, it needs code that essentially does what the classList API is supposed to do, because old browsers don't support it. Same goes for nextElementSibling (the .next() method) and tons of other stuff. However, not everyone needs all this. Some projects don't need older browsers support, either due to the developer mindset or due to their tech-savvy target group. Also, some people only write demos/proof-of-concepts for modern browsers only and don't need all this code. Same goes for intranet apps that are only designed for a particular modern browser. Last but not least, this code bloat makes the jQuery library hard to study for educational purposes.

However, even in a browser that supports all the modern stuff, the jQuery API is still more concise than the native methods. Besides, there are tons of plugins that depend on it, so if you decide to implement everything in native JavaScript, you can't use them.

What I want to build is a fork of jQuery that is refactored so that all the extra code for working around browser bugs removed and all the code replaced by native functionality, where possible. All the ugliness removed, leaving a small, concise abstraction that only uses the current standards. Something like **jQuery: The good parts**. It could also serve as a benchmark for browser standards support.

The API will work in the exact same way and pass all unit tests (in modern browsers, in cases where they are not buggy) so that almost every plugin built on top of it will continue to function just as well. However, the jQuery library itself will be much smaller, with more elegant and easy to understand code.

**So, who's with me?** Do you find such an idea interesting and useful? Would you want to contribute? If so, leave a comment below or send me an email (it's in the [about page](http://lea.verou.me/about)). Also, please let me know if you can think of any other uses, or if there's already something like that that I've missed.
