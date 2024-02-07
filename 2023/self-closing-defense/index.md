---
title: "In Defense of Self-Closing Tags in HTML"
date: 2023-07-26
draft: true
reply: "https://jakearchibald.com/2023/against-self-closing-tags-in-html/"
tags:
  - "replies"
---

Recently, Jake Archibald wrote a [post](https://jakearchibald.com/2023/against-self-closing-tags-in-html/) arguing against self-closing tags in HTML.
He is of course not arguing against the pressence of self-closing tags in HTML, as that ship has sailed long ago,
but against the practice of signifying that an element is self closing via the `/` character at the end of the opening tag,
a remnant of XHTML that is still valid in HTML5.

Surprisingly, I disagree with him (this may be a first!). 😀
Code conventions exist to minimize cognitive overhead and minimize the need for memorization.

We don’t use semicolons in JS or quotes around HTML attributes because they are necessary, but to avoid having to internalize the rules around omitting them.

When one sees `<input>` or `<img>`, they must remember that these are self-closing tags to be able to tell that this is not an authoring mistake,
while `/>` clearly communicates the author intent.
Sure, to anyone that has been writing HTML for a while the (relatively short) [list of self-closing elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) is practically in their BIOS.
However, it still requires actually *reading* the element name to know that it’s self-closing, while `/>` can be recognized pictorially, as an icon,
which is a much faster neural path.
Reading a word takes ~250ms with an average reading speed of 240 wpm [^1], while recognizing a symbol or icon takes less than 100ms. [^2].
Furthermore, this convention makes HTML markup easier to understand by those without the experience to know the list of self-closing elements by heart.

[^1]: https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
[^2]: https://www.rongallagher.net/wp-content/uploads/2016/06/The-Recognition-Moment-v19.pdf