---
title: "Exactly how much CSS3 does your browser support?"
date: "2012-02-02"
categories:
  - "original"
  - "releases"
tags:
  - "browsers"
  - "css3"
  - "standards"
---

[![](images/Screen-shot-2012-02-02-at-14.20.15--300x187.png "Screen shot 2012-02-02 at 14.20.15")](images/Screen-shot-2012-02-02-at-14.20.15-.png)This project started as an attempt to improve [dabblet](http://dabblet.com) and to generate data for the book chapter I'm writing for Smashing Book #3. I wanted to create a very simple/basic testsuite for CSS3 stuff so that you could hover on a e.g. CSS3 property and you got a nice browser support popup. While I didn't achieve that (turns out BrowserScope doesn't do that kind of thing), I still think it's interesting as a spin-off project, especially since the results will probably surprise you.

### How it works

css3test (very superficially) tests pretty much everything in the specs mentioned on the sidebar (not just the popular widely implemented stuff). You can click on every feature to expand it and see the exact the testcases run and whether they passed. **It only checks what syntax the browser recognizes, which doesn't necessarily mean it will work correctly when used.** WebKit is especially notorious for cheating in tests like this, recognizing stuff it doesn't understand, like the values "round" and "space" for background-repeat, but the cheating isn't big enough to seriously compromise the test.

**Whether a feature is supported with a prefix or not doesn't matter for the result.** If it's supported without a prefix, it will test that one. If it's supported only with a prefix, it will test the prefixed one. For properties especially, if an unprefixed one is supported, it will be used in all the tests.

**Only stuff that's in a W3C specification is tested.** So, please don't ask or send pull requests for proprietary things like -webkit-gradient() or -webkit-background-clip: text; or -webkit-box-reflect and so on.

**Every feature contributes the same to the end score**, as well as to the score of the individual spec, regardless of the number of tests it has.

### Crazy shit

Chrome may display slightly different scores (1% difference) across pageloads. It seems that for some reason, it fails the tests for border-image completely on some pageloads, which doesn't make any sense. Whoever wants to investigate, I'd be grateful. Edit: Fixed (someone found and submitted an even crazier workaround.).

### Browserscope

This is the first project of mine in which I've used [browserscope](http://www.browserscope.org/user/settings). This means that your results will be sent over to its servers and aggreggated. When I have enough data, I'm gonna built a nice table for everyone to see :) In the meantime, check the [results](http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnINCxIEVGVzdBidzawNDA) page.

### It doesn't work on my browser, U SUCK!

The test won't work on dinosaur browsers like IE8, but who cares measuring their CSS3 support anyway? "For a laugh" isn't a good enough answer to warrant the time needed.

If you find a bug, please remember you didn't pay a dime for this before nagging. Politely report it on Github, or even better, fix it and send a pull request.

### Why did you build it?

To motivate browsers to support the less hyped stuff, because I'm tired of seeing the same things being evangelized over and over. There's much more to CSS3.

### Current results

At the time of this writing, these are the results for the major modern browsers:

- Chrome Canary, WebKit nightlies, Firefox Nightly: **64%**
- Chrome, IE10PP4: **63%**
- Firefox 10: **61%**
- Safari 5.1, iOS5 Safari: **60%**
- Opera 11.60: **56%**
- Firefox 9: **58%**
- Firefox 6-8: **57%**
- Firefox 5, Opera 11.1 - 11.5: **55%**
- Safari 5.0: **54%**
- Firefox 4: **49%**
- Safari 4: **47%**
- Opera 10: **45%**
- Firefox 3.6: **44%**
- IE9: **39%**

Enjoy! [css3test.com](http://css3test.com) [Fork css3test on Github](https://github.com/LeaVerou/css3test) [Browserscope results](http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnINCxIEVGVzdBidzawNDA)
