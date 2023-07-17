---
title: "CSS3 structural pseudo-class selector tester"
date: "2010-03-14"
categories:
  - "original"
  - "releases"
tags:
  - "selectors"
  - "educational"
  - "nth-child"
  - "nth-last-child"
  - "nth-last-of-type"
  - "nth-of-type"
---

[![](images/Screen-shot-2011-09-20-at-14.13.13--300x187.png)](images/Screen-shot-2011-09-20-at-14.13.13-.png)I was doing some research today about how people explain the CSS3 structural\* pseudo classes and I stumbled upon this demo by CSS tricks: [http://css-tricks.com/examples/nth-child-tester/](http://css-tricks.com/examples/nth-child-tester/)

I thought the idea is **awesome**, but lacks a few features:

- It doesn't use the native browser algorithm for selecting the elements. Granted, it's not that tough to code your own properly, but I trust a browser implementation more (IE doesn't support these altogether, so it's out of the question anyway).
- Doesn't allow you to test for nth-last-child, nth-of-type, nth-last-of-type (and especially the last two are a lot harder to understand for most people)
- Doesn't allow you to add/remove list items to see the effects of the selector with different numbers of elements (especially needed if nth-last-child, nth-of-type, nth-last-of-type were involved)

So, I decided to code my own. It allows you to test for all 4 nth-something selectors, supports adding/removing elements (the selected elements update instantly) and uses the native browser implementation to select them (so it won't work on IE and old browsers).

Enjoy: [**CSS3 structural pseudo-class selector tester**](http://lea.verou.me/demos/nth.html) :)

\*Yes, :root and :empty also belong to those, but are rarely used. All other structural pseudoclasses are actually shortcuts to some particular case of the aforementioned 4 :)
