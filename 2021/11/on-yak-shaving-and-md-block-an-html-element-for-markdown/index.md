---
title: "On Yak Shaving and <md-block>, a new HTML element for Markdown"
date: "2021-11-26"
categories:
  - "original"
  - "personal"
  - "releases"
tags:
  - "js"
  - "esm"
  - "markdown"
  - "stretchy"
  - "web-components"
  - "yak-shaving"
---

This week has been [Yak Shaving](https://americanexpress.io/yak-shaving/) Galore. It went a bit like this:

1. I've been working on a web component that I need for the project I’m working on. More on that later, but let’s call it `<x-foo>` for now.
2. _Of course_ that needs to be developed as a separate reusable library and released as a separate open source project. No, this is not the titular component, this was only level 1 of my multi-level yak shaving… 🤦🏽‍♀️
3. I wanted to showcase various usage examples of that component in its page, so I made another component for these demos: `<x-foo-live>`. This demo component would have markup with editable parts on one side and the live rendering on the other side.
4. I wanted the editable parts to autosize as you type. Hey, I’ve written a library for that in the past, it’s called [Stretchy](https://github.com/leaverou/stretchy/)!
5. But Stretchy was not written in ESM, nor did it support Shadow DOM. I must rewrite Stretchy in ESM and support Shadow DOM first! Surely it won’t take more than a half hour, it’s a tiny library.
6. _(It took more than a half hour)_
7. Ok, now I have a nice lil' module, but I also need to export IIFE as well, so that it's compatible with Stretchy v1. Let's switch to Rollup and npm scripts and ditch Gulp.
8. Oh look, Stretchy’s CSS is still written in Sass, even though it doesn’t really need it now. Let’s rewrite it to use CSS variables, use PostCSS for nesting, and use `conic-gradient()` instead of inline SVG data URIs.
9. Ok, Stretchy v2 is ready, now I need to update its docs. Oooh, it doesn’t have a README? I should add one. But I don’t want to duplicate content between the page and the README. Hmmm, if only…
10. I know! I’ll make a web component for rendering both inline and remote Markdown! I have an unfinished one lying around somewhere, surely it won’t take more than a couple hours to finish it?
11. _(It took almost a day, two with docs, demos etc)_
12. _Done!_ Here it is! [https://md-block.verou.m](https://md-block.verou.me/)[e](https://md-block.verou.me/)
13. _Great!_ Now I can update [Stretchy’s docs](https://stretchy.verou.me/) and [release its v2](https://github.com/LeaVerou/stretchy/releases/tag/v2.0.0)
14. _Great!_ Now I can use Stretchy in my `<x-foo-live>` component demoing my `<x-foo>` component and be back to only one level of yak shaving!
15. _Wow, it’s already Friday afternoon?!_ 🤦🏽‍♀️😂

Hopefully you find [<md-block>](https://md-block.verou.me/) useful! Enjoy!
