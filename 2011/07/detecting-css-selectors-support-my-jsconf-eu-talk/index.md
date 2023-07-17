---
title: "Detecting CSS selectors support + my JSConf EU talk"
date: "2011-07-21"
categories:
  - "news"
  - "original"
  - "personal"
tags:
  - "feature-detection-css-selectors"
  - "js"
---

I'll start with a little backstory, if you want to jump straight to the meat, skip the next 4 paragraphs.

In the past few months, my CSS research has been getting some attention and I've been starting to become somewhat well-known in the CSS industry. A little known fact about me is that JavaScript has always been one of my loves, almost as much as CSS (even more than it in the past). Ironically, [the first time I was asked to speak in a big conference](http://front-trends.com/), it was about JavaScript, even though I ended up choosing to speak about CSS3 instead.

Lately, I've started wanting to get more into the JavaScript industry as well. I'm quite reluctant to submit speaking proposals myself (every conference or meetup I've given a talk so far has asked me to speak, not the other way around) and most JavaScript conferences expect you to submit a proposal yourself. I also couldn't think of a good topic, something I was passionate about and hasn't already been extensively covered.

This changed a few weeks ago. While I was writing [my <progress> polyfill](http://lea.verou.me/2011/07/a-polyfill-for-html5-progress-element-the-obsessive-perfectionist-way/), it dawned on me: Polyfills is something that's JS-related and I'm passionate about! I love studying them, writing them, talking about them. I quickly searched if there were any talks about polyfill writing already and I couldn't find any. So, I decided to submit a proposal to [JSConf EU](http://jsconf.eu), even though the call for speakers had passed 10 days ago. When I read [@cramforce's tweet](http://twitter.com/#!/cramforce/status/90737580466896896) that they had decided on most of the speakers, I spent a few days stressed as hell, checking my inbox every few minutes and hoping that my gut feeling that I would get accepted was right.

And it was! 3 days ago I received an email from JSConf EU that my proposal was accepted!! I can't even begin to describe how happy and excited I am about it. And nervous too: What if they know everything I'm going to say? What if they hate my talk? What if the JavaScript industry is really as sexist as some people claim and they dismiss me because of my gender? I decided to put my fears aside and start working on my slides, as I couldn't wait until later (even though I have multiple deadlines creeping up on me right now...).

A big part of writing polyfills is feature detection. Before trying to implement a feature with JavaScript, you first have to check if it's already supported. So, a substantial portion of my talk will be about that. How to detect if APIs, HTML elements, CSS properties/values/selectors etc are supported. There are already established solutions and techniques about most of these, except CSS selectors. [Modernizr](http://www.modernizr.com/) doesn't detect any, and judging from [my Google search](http://www.google.com/webhp?sourceid=chrome-instant&ie=UTF-8&ion=1&nord=1#sclient=psy&hl=en&safe=off&nord=1&site=webhp&source=hp&q=detect%20css%20selector%20support&pbx=1&oq=&aq=&aqi=&aql=&gs_sm=&gs_upl=&fp=39b0a615b729321b&ion=1&ion=1&bav=on.2,or.r_gc.r_pw.&fp=39b0a615b729321b&biw=1280&bih=679&ion=1) nobody has written about any techniques for doing so in a generic fashion.

A really simple way to detect CSS selectors support is using `document.querySelector()` in a `try...catch` statement. If the selector is not supported, an error will be thrown. However, that's not really reliable, as the Selectors API is not supported in IE < 8. So, I thought of another idea: What if I turn the hassle of reading out a stylesheet via the DOM methods (browsers drop stuff they don't understand) into a feature detection method?

The basic idea is creating a new `<style>` element with an empty rule and the selector we want to test support for, and then read out the stylesheet through the DOM methods to see if a rule actually exists. I've so far tested it in Firefox, Opera and Chrome and it seems to work. I haven't tested it in IE yet, as I currently have too many apps running to turn on the vm, so it might need a few fixes to work there (or I might be unlucky and the idea might not work at all).

You can test it out yourself in this [fiddle](http://jsfiddle.net/leaverou/Pmn8m/), just check the console: [http://fiddle.jshell.net/leaverou/Pmn8m/show/light/](http://fiddle.jshell.net/leaverou/Pmn8m/show/light/)

Apologies if this has already been documented elsewhere, I really couldn't find anything.

**Edit:** [James Long worked on fixing my example's issues with IE](http://jsfiddle.net/Skateside/5dKc7/5/)
