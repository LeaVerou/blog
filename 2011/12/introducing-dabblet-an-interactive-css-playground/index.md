---
title: "Introducing dabblet: An interactive CSS playground"
date: "2011-12-15"
tags:
  - "original"
  - "releases"
  - "css"
  - "css"
  - "dabblet"
---

[![](images/Screen-shot-2011-12-14-at-23.32.02--300x183.png "Dabblet screenshot")](images/Screen-shot-2011-12-14-at-23.32.02-.png)I loved [JSFiddle](http://jsfiddle.net) ever since I first used it. Being able to test something almost instantly and without littering my hard drive opened new possibilities for me. I use it daily for experiments, browser bug testcases, code snippet storage, code sharing and many other things. However, there were always a few things that bugged me:

- JSFiddle is very JS oriented, as you can tell even from the name itself
- JSFiddle is heavily server-side so there's always at least the lag of an HTTP request every time you make an action. It makes sense not to run JS on every keystroke (JSBin does it and it's super annoying, even caused me to fall in an infinite loop once) but CSS and HTML could be updated without any such problems.
- I'm a huge tabs fan, I hate spaces for indenting with a passion.
- Every time I want to test a considerable amount of CSS3, I need to include [\-prefix-free](http://leaverou.github.com/prefixfree/) as a resource and I can't save that preference or any other (like "No library").

Don't get me wrong, I LOVE JSFiddle. It was a pioneer and it paved the way for all similar apps. It's great for JavaScript experiments. But for pure CSS/HTML experiments, we can do better.

The thought of making some interactive playground for CSS experiments was lingering in my mind for quite a while, but never attempted to start it as I knew it would be a lot of fascinating work and I wouldn't be able to focus on anything else throughout. While I was writing [my 24ways article](http://24ways.org/2011/css3-patterns-explained), I wanted to include lots of CSS demos and I wanted the code to be editable and in some cases on top of the result to save space. JSFiddle's embedding didn't do that, so I decided to make something simple, just for that article. It quickly evolved to something much bigger, and yes I was right, it was lots of fascinating work and I wasn't able to focus on anything else throughout. I even delayed my 24ways article for the whole time I was developing it, and I'm grateful that Drew was so patient. After 3 weeks of working on it, I present [dabblet](http://dabblet.com).

### Features

So what does dabblet have that similar apps don't? Here's a list:

- Realtime updates, no need to press a button or anything
- Saves everything to [Github gists](https://gist.github.com/), so even if dabblet goes away (not that I plan to!) you won't lose your data
- No page reloads even on saving, everything is XHR-ed
- Many familiar keyboard shortcuts
- Small inline previewers for many kinds of CSS values, in particular for: [colors](http://dribbble.com/shots/338667-Mystery-upcoming-project-UI-detail-CSS-color-preview), [absolute lengths](http://dribbble.com/shots/339917-Mystery-upcoming-project-UI-detail-Length-preview), durations, [angles](http://dribbble.com/shots/346253-Mystery-upcoming-project-UI-detail-Angle-preview), [easing functions](http://dribbble.com/shots/349045-Mystery-upcoming-project-UI-detail-Easing-previewer) and [gradients](http://dribbble.com/shots/346247-Mystery-upcoming-project-UI-detail-CSS-gradient-preview). Check them all in [this dabblet](http://dabblet.com/gist/1441328).
- Automatically adds prefixes with [\-prefix-free](http://leaverou.github.com/prefixfree/), to speed up testing
- Use the Alt key and the up/down arrows to increment/decrement `<length>`, `<time>` and `<angle>` values.
- Dabblet is [open source](https://github.com/LeaVerou/dabblet) under a NPOSL 3.0 license
- You can save anonymously even when you are logged in
- Multiple view modes: Result behind code, Split views (horizontal or vertical), separate tabs. View modes can be saved as a personal preference or in the gists (as different demos may look better with different view modes)
- Editable even from an embedded iframe (to embed just use the same dabblet URL, it will be automatically adjusted through media queries)

Here's a rough screencast that I made in 10 minutes to showcase some of dabblet's features. There's no sound and is super sloppy but I figured even this lame excuse of a screencast is better than none.

<iframe width="600" height="500" src="http://www.youtube.com/embed/ztMJQJgTMSE" frameborder="0" allowfullscreen></iframe>

I'm hoping to make a proper screencast in the next few days.

However, dabblet is still very new. I wouldn't even call it a beta yet, more like an Alpha. I've tried to iron out every bug I could find, but I'm sure there are many more lingering around. Also, it has some limitations, but it's my top priority to fix them:

- It's currently not possible to see or link to older versions of a dabblet. You can of course use Github to view them.
- It currently only works in modern, CORS-enabled browsers. Essentially Chrome, Safari and Firefox. I intend to support Opera too, once Opera 12 comes out. As for IE, I'll bother with it when a significant percentage of web developers start using it as their main browser. Currently, I don't know anyone that does.
- It doesn't yet work very well on mobile but I'm working on it and it's a top priority
- You can't yet add other scripts like LESS or remove -prefix-free.
- Hasn't been tested in Windows very much, so not sure what issues it might have there.

I hope you enjoy using it as much as I enjoyed making it. Please report any bugs and suggest new features in [its bug tracker](https://github.com/LeaVerou/dabblet/issues).

## Examples

Here are some dabblets that should get you started:

- [http://dabblet.com/gist/1441328](http://dabblet.com/gist/1441328)
- [http://dabblet.com/gist/1454230](http://dabblet.com/gist/1454230)
- [http://dabblet.com/gist/1454409](http://dabblet.com/gist/1454409)
- [http://dabblet.com/gist/1457668](http://dabblet.com/gist/1457668)
- [http://dabblet.com/gist/1457677](http://dabblet.com/gist/1457677)
- [http://dabblet.com/gist/1421054](http://dabblet.com/gist/1421054)
- [http://dabblet.com/gist/1454889](http://dabblet.com/gist/1454889)

## Credits

[Roman Komarov](http://kizu.ru/en/) helped tremendously by doing QA work on dabblet. Without his efforts, it would have been super buggy and much less polished.

I'd also like to thank [David Storey](http://twitter.com/dstorey) for coming up with the name "dabblet" and for his support throughout these 3 weeks.

Last but not least, I'd also like to thank [Oli Studholme](http://oli.jp/) and [Rich Clark](http://richclarkdesign.com/) for promoting dabblet in their .net magazine articles even before its release.

**Update:** Dabblet has its own twitter account now: Follow [@dabblet](http://twitter.com/dabblet)
