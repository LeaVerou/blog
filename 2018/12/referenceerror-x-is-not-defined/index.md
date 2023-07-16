---
title: "ReferenceError: x is not defined?"
date: "2018-12-14"
categories:
  - "articles"
tags:
  - "javascript"
---

Today for a bit of code I was writing, I needed to be able to distinguish "x is not defined" `ReferenceError`s from any other error within a `try...catch` block and handle them differently.

Now I know what you're thinking. Trying to figure out exactly what kind of error you have programmatically is a well-known fool's errand. If you express a desire to engage in such a risky endeavor, any JS veteran in sight will shake their head in remembrance of their early days, but have the wisdom to refrain from trying to convince you otherwise; they know that failing will teach you what it taught them when they were young and foolish enough to attempt such a thing.

Despite writing JS for 13 years, today I was feeling adventurous. "But what if, just this once, I could get it to work? It's a pretty standard error message! What if I tested in so many browsers that I would be confident I've covered all cases?"

I made [a simple page on my server that just prints out the error message](https://codepen.io/leaverou/pen/aPdGeN?editors=0110#0) written in a way that would maximize older browser coverage. Armed with that, I started visiting every browser in my [BrowserStack](https://browserstack.com) account. Here are my findings for anyone interested:

- Chrome (all versions, including mobile): `x is not defined`
- Firefox (all versions, including mobile): `x is not defined`
- Safari 4-12 : `Can't find variable: x`
- Edge (16 - 18): `'x' is not defined`
- Edge 15: `'x' is undefined`
- IE6-11 and Windows Phone IE: `'x' is undefined`
- UC Browser (all versions): `x is not defined`
- Samsung browser (all versions): `x is not defined`
- Opera Mini and Pre-Chromium Opera: `Undefined variable: x`

Even if you, dear reader, are wise enough to never try and detect this error, I thought you may find the variety (or lack thereof) above interesting.

I also did a little bit of testing with a different UI language (I picked Greek), but it didn't seem to localize the error messages. If you're using a different UI language, please open the page above and if the message is not in English, let me know!

In the end, I decided to go ahead with it, and time will tell if it was foolish to do so. For anyone wishing to also dabble in such dangerous waters, this was my checking code:

```js
if (e instanceof ReferenceError
    && /is (not |un)defined$|^(Can't find|Undefined) variable/.test(e.message)) {
    // do stuff
}
```

Found any cases I missed? Or perhaps you found a different `ReferenceError` that would erroneously match the regex above? Let me know in the comments!

One thing that's important to note is that even if the code above is bulletproof for today's browser landscape, **the more developers that do things like this, the harder it is for browser makers to improve these error messages**. However, until there's a better way to do this, pointing fingers at developers for wanting to do perfectly reasonable things, is not the solution. **This is why HTTP has status codes**, so we don't have to string match on the text. Imagine having to string match "Not Found" to figure out if a request was found or not! Similarly, many other technologies have error codes, so that different types of errors can be distinguished without resulting to flimsy string matching. I'm hoping that one day JS will also have a better way to distinguish errors more precisely than the general error categories of today, and we'll look back to posts like this with a nostalgic smile, being so glad we don't have to do crap like this ever again.
