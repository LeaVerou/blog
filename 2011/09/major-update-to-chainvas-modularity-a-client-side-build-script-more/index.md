---
title: "Major update to Chainvas: modularity, a client side build script & more"
date: "2011-09-18"
categories:
  - "original"
  - "releases"
---

[![](images/Screen-shot-2011-11-15-at-14.57.17--300x187.png "Chainvas project page screenshot")](images/Screen-shot-2011-11-15-at-14.57.17-.png)A week ago, [I released Chainvas](http://lea.verou.me/2011/09/chainvas-make-apis-chainable-enhance-the-canvas-api/). It was a spin-off script I wrote while developing [my cubic-bezier tool](http://lea.verou.me/2011/09/a-better-tool-for-cubic-bezier-easing/), to make using the Canvas API a bit less painful. However, unlike similar attempts to make the Canvas API chainable, most of my code was written in a very generic manner, and was actually able to make every API chainable. However, when I released it, even though I mentioned that it can be used for other APIs and provided some examples, practically everyone that shared the link on twitter or other means (thank you .net magazine for the newsletter mention btw!) focused on what Chainvas did for Canvas.

![](http://lea.verou.me/chainvas/img/madewith.png)Actually, while using Chainvas myself, I found it immensely more useful for chaining DOM methods and setting multiple element properties at once. Chainvas had a lot of potential, that most people were missing. And then it dawned on me: I should modularize the library! A generic chaining library at its core and additional modules for making the different APIs chainable. And I did it.

On the way to that, I added IE8 compatibility, and tested in many other browsers, thanks to [Browserstack](http://www.browserstack.com/). I actually found that Chainvas' core even works in IE6! I also wrote [unit tests](http://lea.verou.me/chainvas/unit-tests.html), a much more extensive [documentation](http://lea.verou.me/chainvas/#documentation), added a script generated table of contents and designed [a logo](http://lea.verou.me/chainvas/img/logo.svg) and a [Chainvas pride banner](http://lea.verou.me/chainvas/img/madewith.svg).

Also, since it was now modular, it needed a build script. I badly wanted to make this client side, so I followed this architecture:

- Every module is included in chainvas.js and chainvas.min.js, along with a header comment that follows [a specific syntax](http://lea.verou.me/chainvas/#making-your-own-modules).
- The user selects a compression level and then, the relevant script is downloaded through XHR and split into parts according to the module headers. Then a module list is generated with checkboxes for the user to select the ones they want to include.
- When the user checks and unchecks those checkboxes, the URL of the download link changes to a data URI that contains the script.

This approach has the disadvantage that there is no default filename, and the "Save page as..." link is deactivated in Chrome (why Chrome??). However, I like the idea so much, I don't mind these shortcomings.

That's about it. [Enjoy](http://lea.verou.me/chainvas/#documentation) and let me know about any bugs.
