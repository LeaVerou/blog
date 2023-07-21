---
title: "Introducing Bliss: A 3KB library for happier Vanilla JS"
date: "2015-12-04"
tags:
  - "original"
  - "personal"
  - "releases"
---

[![Screen Shot 2015-12-04 at 16.59.39](images/Screen-Shot-2015-12-04-at-16.59.39-300x127.png)](http://blissfuljs.com)Anyone who follows this blog, my twitter, or my work probably is aware that [I’m not a huge fan of big libraries](http://lea.verou.me/2015/04/jquery-considered-harmful/). I think wrapper objects are messy, and big libraries are overkill for smaller projects. On large projects, one uses frameworks like React or Angular anyway, not libraries.

Anyone who writes [Vanilla JS](http://vanilla-js.com/) on a daily basis probably is aware that it can sometimes be, ahem, somewhat unpleasant to work with. Sure, the situation is orders of magnitude better than it was when I started. Back then, IE6 was the dominant browser and you needed a helper function to even add event listeners to an element (remember element.attachEvent?) or to get elements by a class!

[![jasset-datepicker](images/jasset-datepicker-300x211.png "Ah, the memories!")](images/jasset-datepicker.png)

**Fun fact:** I learned JavaScript back then by writing my own library, called _jAsset_. I had not heard of jQuery when I started it in 2007, so I had even coded my own selector engine! (Anyone remember _slickspeed_?) jAssset had plenty of nice helper functions, its own UI library and a cool logo. I had even started to make a website for its UI components, seen on the right.

[![](http://shipitsquirrel.github.io/images/ship%20it%20squirrel.png)](https://shipitsquirrel.github.io)Sadly, _jAsset_ died the sad inevitable death of all unreleased projects: Without external feedback, I had nobody to hold me back from adding to its API every time I personally needed a helper function. And adding, and adding, and adding… Until it became 5000+ loc long and its benefit of being lightweight or comprehensible had completely vanished. It collapsed under its own weight before it even saw the light of day. I abandoned it and went through a few years of using jQuery as my preferred helper library. Eventually, my [distaste for wrapper objects](http://lea.verou.me/2015/04/jquery-considered-harmful/), the constantly improving browser support for new APIs that made Vanilla JS more palatable, and the decline of overly conspicuous browser bugs led me to give it up.

It was refreshing, and educational, but soon I came to realize that while Vanilla JS is orders of magnitude better than it was when I started, certain APIs are still quite unwieldy, which can be annoying if you use them often. For example, the Vanilla JS for creating an element, with other elements inside it, events and inline styles is so commonly needed, but also so verbose and [WET](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), it can make one suicidal.

However, Vanilla JS does not mean “use no abstractions”. Programming is all about abstractions! The Vanilla JS movement, is about favoring speed, smaller abstractions and understanding of the Web Platform, over big libraries that we treat as a black box. It’s about using libraries to save time, not to skip learning.

So, I used my own tiny helpers, on every project. They were small and easy to understand, instead of several KB of code aiming to fix browser bugs I will likely never encounter and let me create complex nested DOM structures with a single JSON-like object. Over time, their API solidified and improved. On larger projects it was a separate file which I had tentatively codenamed _Utopia_ (due to the lack of browser bug fixes and optimistic use of modern APIs). On smaller ones just a few helper methods (I could not live without at least my tiny 2 sloc $() and $$() helpers!). Here is a sample from my open source repos:

- [dabblet.com/utopia.js](https://github.com/LeaVerou/dabblet/blob/master/code/utopia.js)
- [regexplained/utopia.js](https://github.com/LeaVerou/regexplained/blob/gh-pages/utopia.js)
- [dpi.lv/utopia.js](https://github.com/LeaVerou/dpi/blob/gh-pages/utopia.js)
- [css3test.com/utopia.js](https://github.com/LeaVerou/css3test/blob/gh-pages/utopia.js)
- [awesomplete.js](https://github.com/LeaVerou/awesomplete/blob/gh-pages/awesomplete.js#L296-L351)
- $() and/or $$() helpers in:
    - [prefixfree](https://github.com/LeaVerou/prefixfree/blob/gh-pages/prefixfree.js#L167-L169)
    - [CSSS](https://github.com/LeaVerou/csss/blob/gh-pages/slideshow.js#L10-L11)
    - [animatable](https://github.com/LeaVerou/animatable/blob/gh-pages/index.js#L1-L2)
    - [contrast-ratio](https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js#L1-L7)
    - [cubic-bezier.com](https://github.com/LeaVerou/cubic-bezier/blob/gh-pages/environment.js#L27-L28)
    - [whathecolor](https://github.com/LeaVerou/whathecolor/blob/gh-pages/whathecolor.js#L1-L7)
    - [corner-shape](https://github.com/LeaVerou/corner-shape/blob/gh-pages/corner-shape.js#L1-L2)
    - [css-colors](https://github.com/LeaVerou/css-colors/blob/gh-pages/colors.js#L1-L2)

Notice any recurring themes there? :)

I never mentioned _Utopia.js_ anywhere, besides silently including it in my projects, so it went largely unnoticed. Sometimes people would look at it, ask me to release it, I’d promise them I would and then nothing. A few years ago, someone noticed it, liked it and [documented it](http://davidhiggins.me/utopia/) a bit (site is down now it seems). However, it was largely my little secret, hidden in public view.

For the past half year, I’ve been working hard on my research project at MIT. It’s pretty awesome and is aimed at helping people who know HTML/ CSS but **not** JS, achieve more with Web technologies (and that’s all I can say for now). It’s also written in JS, so I used _Utopia_ as a helper library, naturally. _Utopia_ evolved even more with this project, got renamed to _Bliss_ and got chainability via [my idea about extending DOM prototypes without collisions](http://lea.verou.me/2015/04/idea-extending-native-dom-prototypes-without-collisions/) (can be disabled and the property name is customizable).

All this worked fine while I was the only person working on the project. Thankfully, I might get some help soon, and it might be rather inexperienced (the academia equivalent of interns). Help is very welcome, but it did raise the question: How will these people, who likely only know jQuery, work on the project? \[1\]

The answer was that the time has come to polish, document and release [Bliss](http://blissfuljs.com) to the world. My plan was to spend a weekend documenting it, but it ended up being a little over a week on and off, when procrastinating from other tasks I had to do. However, I’m very proud of the resulting docs, so much that I gifted myself [a domain](http://blissfuljs.com) for it. They are fairly extensive (though some functions still need work) and has two things I always missed in other API docs:

- Recommendations about what Vanilla JS to use instead when appropriate, instead of guiding people into using library methods even when Vanilla JS would have been perfectly sufficient.
- A “Show Implementation” button showing the implementation, so you can both learn, and judge whether it’s needed or not, instead of assuming that you should use it over Vanilla JS because it has magic pixie dust. This way, the docs also serve as a source viewer!

So, enjoy [Bliss](http://blissfuljs.com). The helper library for people who don’t like helper libraries. :) In a way, it feels that a journey of 8 years, finally ends today. I hope the result makes you blissful too.

[blissfuljs.com](http://blissfuljs.com)

Oh, and don’t forget to follow [@blissfuljs](http://twitter.com/blissfuljs) on twitter!

\[1\]: Academia is often a little behind tech-wise, so **everyone** uses jQuery here — hardly any exceptions. Even though browser support doesn’t usually even matter to research projects!
