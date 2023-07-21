---
title: "A polyfill for HTML5 progress element, the obsessive perfectionist way"
date: "2011-07-02"
tags:
  - "original"
  - "releases"
  - "html5"
  - "html"
  - "polyfills"
---

[![](images/Screen-shot-2011-11-15-at-15.02.37--300x219.png "Progress polyfill, project page screenshot")](images/Screen-shot-2011-11-15-at-15.02.37-.png)Yesterday, for some reason I don't remember, I was looking once more at [Paul Irish's excellent list of polyfills on Github](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills). I was really surprised to see that there are none for [the `<progress>` element](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#the-progress-element). It seemed really simple: Easy to fake with CSS and only 4 IDL attributes (value, max, position and labels). "Hey, it sounds fun and easy, I'll do it!", I thought. I have no idea how in only 1 day this turned into "OMG, my brain is going to explode". I've documented below all the pitfalls I faced. And don't worry, it has a happy ending: I did finish it. And [published it](https://github.com/LeaVerou/HTML5-Progress-polyfill). So, if you're not interested in long geeky stories, just jump straight to [its page](http://lea.verou.me/polyfills/progress/).

## First things first: Controlling the width of the value bar

Most progress bars out there use 2 elements: One for the container and one for the value bar. I was pretty stubborn about not using an extra element. I wanted to use pseudo-elements instead and keep the DOM tree as clean as I found it. And there it was, the first problem: How to set the width?

CSS3 attr() and calc() are hardly supported and [attr() is not even allowed in calc()](http://lea.verou.me/2010/09/on-attr-and-calc/), so I quickly realized that a pure CSS solution was out of the question. However, if I used JavaScript, how would I set a different width for every progress::before? You can't set that in an inline style, and assigning every `<progress>` element an ID and adding separate rules seems a bit too intrusive to me. Think about it for a second, what would you do?

I realized I had to control the width of the pseudo-element through CSS properties of the parent container somehow. And then it dawned on me: If the pseudoelement has `display:block`, it will automatically get the parent width, minus the padding and borders. There it was, this was my solution. I just had to set `padding-right` accordingly, so that the value bar gets the width it needs to be! And I had already given it `box-sizing: border-box`, as it was in Webkit's UA stylesheet, so I didn't have to worry about padding changing the width of the element. The first problem was solved.

## Becoming dynamic

The static part was quite easy indeed. Selecting all `<progress>` elements and using their attributes to set an appropriate padding-right was pretty much run of the mill. But that wasn't enough. What happens if you set the properties through script? What happens if you set the attributes? The progress bar should update accordingly, it had to be dynamic. A static progress bar is not much of a fallback. It might be acceptable for `<meter>`, since in most interfaces it's used in a static way. But a progress bar needs to change in order to show um, _progress_.

First step was adding the properties that are in its DOM Interface. "Easy, I'll add them to the prototype" thought my naïve self. So, I needed to find which prototype, I didn't want to add them in every HTML element of course. So I eagerly typed `Object.prototype.toString.call(document.createElement('progress'))` in Firebug's console and it slapped me in the face with an `'[object HTMLUnknownElement]'`. D'oh! I had forgotten that unknown elements share a common prototype named like that. So, I had to add them to each one individually. I hated that, but since it was the only way, I did it and moved on.

Of course, I didn't just assign a static value to them, otherwise they wouldn't solve much: The progress bar would still be static. I assigned getters and setters that used the `value` and `max` attributes to return what they should. Assigning getters and setters to a property is a whole new problem by itself, as some browsers use `__defineGetter__`/`__defineSetter__` and some others the ES5 standard `Object.defineProperty`. But [I had solved that one before](http://lea.verou.me/2011/05/strongly-typed-javascript/), so it didn't slow me down.

The getters and setters solved the issue one-way only: If you set the properties, the progress bar and its attributes would be updated. That would be enough for most authors using the polyfill, but no, I wanted it to be _perfect_. "If you change the attributes, the progress bar and its properties should too!" my annoyingly pedantic inner self insisted. "And what if you dynamically add more `<progress>` elements?".

There are two ways to do stuff when attributes change and elements get added: Polling and [mutation events](http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-eventgroupings-mutationevents). The advantage of polling is its perfect browser support, which comes at a big cost: It's horrible performance-wise. Also, polling introduces a delay that could be unacceptable in some cases, especially considering how short the duration of some progress bar use cases is. So, I went with mutation events, even though they are deprecated (seriously W3C? deprecating something, without providing a solid alternative??) and don't have perfect browser support. After all, it was the only way (I don't consider polling a real option in this case).

## Styling

After messing around a little, it seemed to work great in Opera 10.63 and Firefox 5, which I had open for my tests. It was time to write some unit tests and check it out in more browsers. Instead, I opted to style it, as a desperate attempt to delay my confrontation with IE8 a bit longer (and for good reason, as it turned out later). Given that CSS is kinda my specialization, I expected styling to be a piece of cake and even relaxing. Instead, it came with it's fair share of trouble and hard dilemmas.

If you notice the native progress bars in OSX, you will see that they use gradients. I mocked up something similar with CSS gradients, which wasn't easy, as I wanted to keep the hue/saturation information in the background-color only, for easy modifications and Webkit uses a regular gradient with color stops that have different hues and saturations. And then I realised that this was not going to show up at all in IE8-IE9, which were 2 major browsers that my polyfill would target. No gradient may be acceptable in determinate progress bars, but it's not an option in indeterminate ones: Scrolling diagonal stripes is the convention and there's no other way to communicate this status to the average user.

So I decided to go with the old way of using raster images for gradients (through a data URI). Another painful slap in the face was when I realized that those moving stripes need to be semi-transparent. To do that, my options were:

- CSS3 animations - no good in my case, as it's crucial to show up and their browser support isn't that good
- SVG with SMIL - Much better browser support than CSS3 animations, but still no go in IE
- APNG - Only supported by Firefox and Opera, even after all these years

I happened to be chatting with [Tab Atkins](http://xanthir.com/blog) at the moment, and he suggested I go with plain ol' GIFs. I was originally negative, but after thinking about it I realized that antialiasing is not that crucial in 45deg stripes, especially when they're moving. I tried it, I liked the result, so I kept it. Phew, that one was easy.

## The IE8 nightmare

After spending a few hours tweaking the gradients and the CSS (yes, hours. I said I'm an obsessive perfectionist, didn't I?) I finally wrote some unit tests and fired up Virtualbox to test with IE8. I prepared myself for the worst, and secretly hoped I'd be pleasantly surprised. Instead, I faced a developer's worst nightmare. Two words: Stack overflow.

The culprit was a classic IE bug with DOM properties and HTML attrtibutes that I had blissfully forgotten: IE thinks they're the same. I had added getters and setters (or etters, as I like to call both) to the max and value _properties_ which used the max and value _attributes_, resulting in infinite recursion in IE8.

This was the hardest of all problems, and I never completely solved it: A few unit tests still fail in IE8 because of it, although there's no infinite recursion any more. Luckily, this bug was fixed in IE9, so the polyfill works flawlessly there.

My first idea was the obvious one: to duplicate the values somewhere. In a lookup table, in another property, somewhere. I didn't quite like the idea, so I kept brainstorming. And then it dawned on me. They're already duplicated somewhere, and not only it's not redundant, but actually encouraged: in the WAI-ARIA attributes!

To clarify, when progress elements are natively supported, they already have built-in ARIA roles and attributes. However, when they're not, you should add them yourself, if you want the control to be accessible. From my research, there was a `progressbar` role, and it required the attributes `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-labelledby`. I implemented all but the latter, as it proved too much of a hassle for very few edge cases (how many people put IDs in their _labels_ without using aria-labelledby themselves?). So, `aria-valuemax` was already duplicating `max` and `aria-valuenow` was duplicating `value`. I changed everything to use those instead.

After lots of head-scratching, IE-cursing and feeling that my brain was going to explode all over my laptop, I managed to kinda have it working. I knew in advance that some unit tests would fail, as it doesn't support mutation events. I eventually gave up when I realized that the last unit test in the "static" category failed because `getAttribute('max')` returned `null`, since IE had completely removed the attribute from the DOM tree. It was the last straw and made me say "That's it, I'm done with this piece of shit".

## Safari 5 craziness

After IE, it was Safari's turn. I knew that I could only target Safari 5, as Safari 4 doesn't support etters on DOM elements and Safari 5.1 will probably support progress elements natively, since they've been in Webkit for ages. I launched Safari without fear. "How can it possibly not work in Safari? It will probably be fine, maybe just need a one or two little tweaks in the worst case", I reassured myself thinking.

The progress bars were not even showing. At all. My first guess was that it was a one time rendering error. When it persisted after a few reloads, I opened the dev tools to see what the hell happened. I saw a series of errors like this:

`<progress>` is not allowed inside `<label>`. Content ignored.
Unmatched </progress> encountered.  Ignoring tag.

At first, I thought the problem was the label. So I made all labels external. And then still got the same errors for the `<li>`s. And every other element I tried. Even when I put them directly into the `<body>`, Safari complained that they are not allowed to be inside it! It turned out that this was a bug in a build of Webkit, and coincidentally, this build was the one Safari 5 uses.

There wasn't much to think about in this one: They're not in the DOM, so I can't do anything about them. It's mission impossible.

## Happy(?) end

After IE8's and Safari5's cruel rejection, I was quite dispirited. IE8 had already caused me to make my code uglier and more verbose, and now Safari 5 flat out refuses to accept any treatment. It worked flawlessly in Firefox 3.5, but that didn't cheer me up much. I decided that this has already taken up too much of my time. It's now the community's turn. Have any ideas about how further improvement? Maybe some more unit tests? I’ll be waiting for your pull requests! :) [Github repo](https://github.com/LeaVerou/HTML5-Progress-polyfill)

## Appendix: Why do some unit tests fail in browsers that natively support `<progress>`?

While developing this, I discovered 2 browser bugs: One in Webkit's implementation and in for Opera's. I plan to report these soon.
