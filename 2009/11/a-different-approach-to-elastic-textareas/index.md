---
title: "A different approach to elastic textareas"
date: "2009-11-13"
categories:
  - "original"
tags:
  - "js"
  - "usability"
  - "ux"
---

I loved elastic textareas since the very first moment I used one (at facebook obviously). They let you save screen real estate while at the same time they are more comfortable for the end user. It's one of the rare occasions when you can have your UI cake and eat it too!

However, I never liked the implementation of the feature. In case you never wondered how it's done, let me explain it in a nutshell: All elastic textarea scripts (or at least all that I know of) create a hidden (actually, absolutely positioned and placed out of the browser window) div, copy some CSS properties from the textarea to it (usually padding, font-size, line-height, font-family, width and font-weight) and whenever the contents of the textarea change they copy them to the hidden div and measure it's dimensions. It might be good enough for facebook, where the styling of those textareas is fairly simple and consistent throughout the site, or any other particular site, but as a generic solution? I never liked the idea.

So, I tried to explore a different approach. As Andrea Giammarchi [recently wrote](http://webreflection.blogspot.com/2009/11/google-closure-im-not-impressed.html) _"This is almost intrinsic, as developers, in our DNA: we spot some interesting concept? We rewrite it from scratch pretending we are doing it better!"_ and I'm no exception (although in this case I don't think I did it better, I just think it has potential). The basic idea is quite naive, but it works quite well in most browsers (Internet Explorer being the black sheep as usual): Test if the textarea is scrollable, and if so, increase it's `rows` attribute and try again. If it's not scrollable initially, try decreasing it's `rows` attribute until it becomes scrollable (and then ++ it).

It works flawlessly on Firefox and quite well on Safari, Chrome and Opera (it just slightly twitches when it enlarges in those). Stupid Internet Explorer though repaints too many times, causing a flicker at the bottom when the user is typing, something really disturbing, so I can't consider the script anything above **experimental** at the moment. I'm just posting it in case anyone has an idea of how to fix the aforementioned issues, because apart from those it has quite a few advantages:

- Should work with any CSS styles
- **No** library requirements (unlike all the others I know of)
- Only **800 bytes** minified (2.4KB originally)

So, here it is:

- [Demo](http://lea.verou.me/scripts/elastic-textarea/)
- [elastic-textarea.js](http://lea.verou.me/scripts/elastic-textarea/elastic-textarea.js)
- [elastic-textarea-min.js](http://lea.verou.me/scripts/elastic-textarea/elastic-textarea-min.js)

_For the record, I **don't** think that a script **should** be needed for things like that. This looks like something that should be handled by CSS alone. We basically want the height of an element to adjust as necessary for it's contents to fit. We already use CSS for these things on other elements, why not form controls as well?_
