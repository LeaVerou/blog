---
title: "20 things you should know when not using a JS library"
date: "2009-02-22"
categories:
  - "articles"
tags:
  - "browsers"
  - "feature-detection"
  - "js"
  - "javascript-libraries"
---

You might just dislike JavaScript libraries and the trend around them, or the project you're currently working on might be too small for a JavaScript library. In both cases, I understand, and after all, who am I to judge you? I don't use a library myself either (at least not one that you could've heard about  ;) ), even though I admire the ingenuity and code quality of some.

However, when you take such a brave decision, it's up to you to take care of those problems that JavaScript libraries carefully hide from your way. A JavaScript library's purpose isn't only to provide shortcuts to tedious tasks and allow you to easily add cool animations and Ajax functionality as many people (even library users) seem to think. Of course these are things that they are bound to offer if they want to succeed, but not the only ones. JavaScript libraries also have to workaround browser differences and bugs and this is the toughest part, since they have to constantly keep up with browser releases and their respective bugs and judge which ones are common enough to deserve workaround and which ones are so rare that would bloat the library without being worth it. Sometimes I think that nowadays, how good of a JavaScript developer you are doesn't really depend on how well you know the language, but rather on how many browser bugs you've heard/read/know/found out. :P

The purpose of this post is to let you know about the browser bugs and incompatibilities that you are most likely to face when deciding againist the use of a JavaScript library. Knowledge is power, and only if you know about them beforehand you can workaround them without spending countless debugging hours wondering "WHAT THE...". And even if you do use a JavaScript library, you will learn to appreciate the hard work that has been put in it even more.

Some of the things mentioned below might seem elementary to many of you. However, I wanted this article to be fairly complete and contain as many common problems as possible, without making assumptions about the knowledge of my readers (as someone said, "assumption is the mother of all fuck-ups" :P ). After all, it does no harm if you read something that you already know, but it does if you remain ignorant about something you ought to know. I hope that even the most experienced among you, will find at least one thing they didn't know very well or had misunderstood (unless I'm honoured to have library authors reading this blog, which in that case, you probably know all the facts mentioned below :P ) . If you think that something is missing from the list, feel free to suggest it in the comments, but have in mind that I conciously omitted many things because I didn't consider them common enough.

### DOM

1. `getElementById('foo')` also returns elements with `name="foo"` in IE and older versions of Opera.
2. `getElementsByTagName('*')` returns **no** elements in IE5.5 and also returns comment nodes in all versions of IE (In case you're wondering: `DOCTYPE` declaration will count, Conditional comments will not).
3. `getElementsByClassName()` in Opera (even Opera 10 Alpha) doesn't match elements with 2 or more classes when the one you're looking for is not the first but it's also a substring of the first. Read the discussion between me and John Resig on the latter's blog post mentioned below if this seems a bit unclear.
4. [There is no `element.children` collection in Firefox 3-](http://www.quirksmode.org/dom/w3c_core.html#t71). You have to create it yourself by filtering the `childNodes` collection if it doesn't exist.
5. If your code involves preformatted elements (for instance if you are making a syntax highlighter), beware when setting the `innerHTML` of those: [IE won't preserve line breaks (`\r\n` s) and whitespace](http://www.quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html). You have to use `outerHTML`, which will actually replace the element so you should find a way to obtain a reference to the newly created one in case you still need to perform stuff on it.
6. To get the dimensions of the viewport, [standard compliant browsers use `window.innerWidth` (and `innerHeight`)](http://www.quirksmode.org/dom/w3c_cssom.html#t00) whereas IE uses `document.documentElement.clientWidth` (and `clientHeight`).
7. To get the scroll offsets of the current page, [standard compliant browsers use `window.pageXOffset` (and `pageYOffset`)](http://www.quirksmode.org/dom/w3c_cssom.html#t02) whereas IE uses `document.documentElement.scrollTop` (and `scrollLeft`).
8. To make matters worse, in both cases above, you need to use `document.body` instead of `document.documentElement` when in Quirks mode.

John Resig (of the jQuery fame), recently [posted a great presentation](http://ejohn.org/blog/the-dom-is-a-mess/), which summarized some browser bugs related to DOM functions. A few of the bugs/inconsistencies mentioned above are derived from that presentation.

### Events

1. When using IE's `attachEvent()` the `this` reference inside the callback refers to the useless `window` object
2. `eventObject.target` is `eventObject.srcElement` in IE
3. `eventObject.stopPropagation()` is `eventObject.cancelBubble = true;` in IE
4. `eventObject.preventDefault()` is `eventObject.returnValue = false;` in IE
5. There are many more event object incompatibilities for specific events (the ones above are for **all** events). Take a trip to [QuirksMode](http://www.quirksmode.org/dom/w3c_events.html) for more information.
6. IE leaks horribly (especially IE6) in [various cases](http://msdn.microsoft.com/en-us/library/bb250448.aspx).
7. If you register the same event handler X times, IE fires it X times.
8. Determining when the DOM is ready is **a complete mess**. Firefox and Opera 9+ support the `DOMContentLoaded` event, Safari doesn't but [you can check it's `document.readyState` property](http://peter.michaux.ca/articles/the-window-onload-problem-still#webkitAndDocumentReadyState) and [in IE `document.readyState` is unreliable](http://peter.michaux.ca/articles/the-window-onload-problem-still#InternetExplorerAndDocumentReadyState) and you should either [inject a deferred script](http://peter.michaux.ca/articles/the-window-onload-problem-still#InternetExplorerAndDefer), either [poll the DOM untill there are no errors](http://javascript.nwbox.com/IEContentLoaded/) or [use an external behavior file](http://dean.edwards.name/weblog/2005/09/busted2/). Of course you could always just put [a `script` tag at the bottom of the page, just before the `body` closing tag, which will fire all attached handlers](http://peter.michaux.ca/articles/the-window-onload-problem-still#bottomScript) which is actually the best approach in terms of which way fires earliest (but not too early) according to my tests, but that hardly qualifies as unobtrusive...
9. **(edit, thanks Sobral!)** The Event object is not passed as a parameter to the callback but resides in `window.event` in older versions of IE

### Type detection

1. The `typeof` operator is almost useless:

    - `typeof null == 'object'`
    - `typeof new String('foo') == 'object'`
    - `typeof [] == 'object'`

    [Use Object.prototype.toString instead](http://thinkweb2.com/projects/prototype/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/).

### CSS

1. Although most CSS properties are converted to their JavaScript equivalents in a standard way (characters after dashes are Uppercase, others are lowercase, the dashes get removed), float is an exception: It's converted to cssFloat in most browsers and styleFloat in IE. Check [which one exists](http://lea.verou.me/2009/02/check-if-a-css-property-is-supported/) and use that.
2. Getting the current (computed) style of an element is another **complete mess**. IE uses `element.currentStyle[propertyJS]` whereas standard compliant browsers use `document.defaultView.getComputedStyle(element, null).getPropertyValue(propertyCSS)`. And as if this wasn't enough, there are various problems associated with specific properties or browsers, like:
    - IE returns the cascaded values and not the computed ones (for instance, it might return `em`s for a property that was specified in `em`s, and not pixels). [Dean Edwards has thought a very clever hack to workaround this](http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291) and didn't even blog about it (it's simply a comment in a blog post of Erik Arvidsson's!).
    - Any hidden (via `display:none;`) element, yields a `width`/`height`/`top`/`right`/`bottom`/`left` value of zero.
    - `auto` or `normal` might be returned for properties that are left at their defaults. For instance, IE does this with `width`/`height` for elements that don't have dimensions explicitly set via CSS.
    - In most browsers, shorthands (like `border`) will yield a blank string. You'd have to use the most specific property (for instance, `border-left-width`).
    - Colors will be returned in different formats across browsers. For instance, IE uses `#RRGGBB` whereas Mozilla uses `rgb(red, green, blue)`.

### So, what now?

Never, EVER use a browser detect to solve the problems mentioned above. They can **all** be solved with feature/object detection, simple one-time tests or defensive coding. I have done it myself (and so did most libraries nowadays I think) so I know it's possible. I will not post all of these solutions to avoid bloating this post even more. You can ask me about particular ones in the comments, or read the uncompressed source code of any library that advertises itself as "not using browser detects". JavaScript Libraries are a much more interesting read than literature anyway. :P

### Are the facts mentioned above actually 20?

I'm not really sure to be honest, it depends on how you count them. I thought that if I put a nice round number in the title, it would be more catchy :P
