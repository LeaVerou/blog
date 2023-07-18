---
title: "Introducing Rety: live coding, without the stress"
date: "2022-07-13"
categories:
  - "releases"
  - "news"
tags:
  - "speaking"
  - "js"
---

I recently spoke at CSS Day in Amsterdam. It was only my second f2f talk after the pandemic. It went down really well, both in person, and recently that the video was released:

https://www.youtube.com/watch?v=ZuZizqDF4q8

Here is a sample of tweets about it that made me particularly warm and fuzzy inside:
<!-- more -->
https://twitter.com/CSSDayConf/status/1542778793219301376

https://twitter.com/jonpearse/status/1542490268322103296

https://twitter.com/StuRobson/status/1542461048791384066

https://twitter.com/vlh/status/1544483583544463361

https://twitter.com/pawelgrzybek/status/1546861605824126980

https://twitter.com/parker\_codes/status/1547055116221497344

https://twitter.com/polarbirke/status/1547202631315214338

https://twitter.com/unistyler/status/1544619175796252672

There's [a lot more where these came from too](https://twitter.com/search?q=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DZuZizqDF4q8).

This was not just my second post-pandemic talk, but my first talk using _[Rety](https://rety.verou.me)_, which is what this post is about.

As you may know, I love live coding as a teaching tool, and over the years [it](https://twitter.com/aarongarciah/status/844212506365235200) [has become](https://twitter.com/gumnos/status/1118527972342935552) [part](https://twitter.com/ChrisFerdinandi/status/1027343408187277312) [of](https://twitter.com/LinnOyenFarley/status/1011650208831287296) [my](https://twitter.com/feross/status/928018779115724800) [trademark](https://twitter.com/HenriHelvetica/status/1011630698984361985) [speaking](https://twitter.com/johnallsopp/status/926417129070456832) [style](https://bradfrost.com/blog/post/on-speaking/#:~:text=Don%E2%80%99t%20live%20code%20%E2%80%93%20This%20applies%20to%20everyone%20except%20Lea%20Verou%2C%20who%20is%20an%20absolute%20beast).

When combined with some kind of interactive preview, it allows the speaker to demonstrate not only the final state of a coding snippet, but also how you get there, and what the intermediate results are. **Live coding is to programming what a blackboard is to math or physics.**

But it does create a unique challenge: My live coded slides don’t make sense without me. This may be acceptable for a conference talk, which is usually recorded, but not in other contexts, such as teaching a university course, where all instructors need to be able to teach all lectures, and students need to be able to quickly refer to examples shown.

Back in the fall of 2021, when we were preparing for the second iteration of our course, [Design for the Web: Languages and User Interfaces](https://designftw.mit.edu/), this came up as a pressing issue. The current state of the course _required_ me to be there to teach my lectures, and this may well be the last year I teach it, since I'm finishing up my PhD soon.

I didn’t want to completely remove live coding from my slides, as I truly believe it is the perfect implementation of the _“show, don’t tell”_ teaching adage for certain things, so I thought instead: what if I could _record_ my live coding, and make it replayable?

Doing so manually seemed like cruel and unusual punishment. And thus, **_[Rety](https://rety.verou.me)_** was born (pronounced like the “rety” in “retype”).

While originally the plan was for me to still live code, and have the _[Rety](https://rety.verou.me)_ functionality there for students and future instructors, I ended up using it during my own lectures as well, as I concluded that a well crafted [Rety script](https://rety.verou.me/#rety-actions) was strictly superior to me doing the live coding:

- Same progressive development as a live demo
- It still affords unplanned demonstrations (e.g. to answer a question), since Rety still works with the same editors, and I could always pause it and take over if needed.
- I could record myself and edit the script to maximize education value and minimize typos, delays, fumbling etc.
- People can consume typed text far faster than people can type text. This is why most video tutorials speed up the typing. With Rety, typing speed is adjustable, and doesn't need to match mine.

After test driving it for our course the entire spring 2022 semester, it went through the ultimate test in June 2022: I used it for my [CSSDay](https://cssday.nl/2022) conference talk. You can [watch the talk here](https://www.youtube.com/watch?v=ZuZizqDF4q8) (first live demo at 7:15).

Right now _[Rety](https://rety.verou.me)_ is just a set of two classes: `Recorder` and `Replayer`, which are used entirely independently. The exact UI is left up to the Rety user. E.g. to use it in my slides, I integrated it with the Live Demo plugin of [Inspire.js](https://inspirejs.org) (it is automatically included if a `<script class="demo-script" type="application/json">` is found in a live demo slide).

The library could use more docs and _some_ tests and I have doubts about the API, but I figured I should release it it earlier rather than later (it's already been sitting in a repo for 7 months). After all, what best time to release it than when the first Rety talk is [still making the rounds](https://frontendfoc.us/issues/549)?

My vision is to ultimately evolve and standardize the [Rety script](https://rety.verou.me/#actions) format, so that it can be used to describe a coding interaction across a variety of tools. There are so many possibilities!

- Wouldn't it be cool if CodePen and similar playgrounds supported embedding a _Rety_ script into a pen?
- What if you could store _Rety_ scripts in a repo and editors like VS Code recognized them and let you replay them?

Enjoy: [Rety](https://rety.verou.me)
