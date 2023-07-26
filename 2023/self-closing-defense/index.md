---
title: "In Defense of Self-Closing Tags in HTML"
date: 2023-07-26
draft: true
reply: "https://jakearchibald.com/2023/against-self-closing-tags-in-html/"
tags:
  - "replies"
---

Surprisingly, I disagree with @jaffathecake. 😀
Code conventions exist to minimize cognitive overhead and minimize the need for memorization.

We don’t use semicolons in JS or quotes around HTML attributes because they are necessary, but to avoid having to internalize the rules about omitting them.

When one sees `<input>` or `<img>`, they need to remember that it’s self-closing to be able to tell that this is not an authoring mistake.
`/>` communicates the author intent.
Sure, to anyone that has been writing HTML for a while this knowledge is practically in their BIOS, but