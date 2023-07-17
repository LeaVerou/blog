---
title: "Poll: ¿Is animation-direction a good idea?"
date: "2012-05-06"
categories:
  - "news"
tags:
  - "css-animations"
  - "poll"
  - "web-standards"
---

## ¿animation-direction?

Lets assume you have a CSS animation for `background-color` that goes from a shade of yellow (#cc0) to a shade of blue (#079) and repeats indefinitely. The code could be something like this:

```css
@keyframes color {
  from { background: #cc0 }
  to { background: #079 }
}

div {
  animation: color 3s infinite;
}
```

If we linearize that animation, the progression over time goes like this (showing 3 iterations):

[![](images/Screen-shot-2012-05-05-at-19.53.52-.png "No animation-direction specified")](images/Screen-shot-2012-05-05-at-19.53.52-.png)

As you can see, the change from the end state to the beginning state of a new iteration is quite abrupt. You could change your keyframes to mitigate this, but there’s a better way. A property with the name `animation-direction` gives a degree of control on the direction of the iterations to smooth this out. It also reverses your timing functions, which makes it even smoother.

In early drafts, only the values `normal` and `alternate` were allowed. `normal` results in the behavior described above, whereas `alternate` flips every other iteration (the 2nd, the 4th, the 6th and so on), resulting in a progression like this (note how the 2nd iteration has been reversed):

[![](images/Screen-shot-2012-05-05-at-20.04.21--1024x80.png "animation-direction: alternate;")](images/Screen-shot-2012-05-05-at-20.04.21-.png)

The latest draft also adds two more values: `reverse` which reverses **every** iteration and `alternate-reverse`, which is the combination of both `reverse` and `alternate`. Here is a summary of what kind of progression these four values would create for the animation above:

[![](images/Screen-shot-2012-05-05-at-20.19.05--1024x362.png "animation-direction values")](images/Screen-shot-2012-05-05-at-20.19.05-.png)

## The problem

I was excited to see that `reverse` and `alternate-reverse` were finally added to the spec, but something in the syntax just didn't click. I initially thought the reason was that these four values essentially set 2 toggles:

- ¿Reverse all iterations? yes/no
- ¿Reverse even iterations? yes/no

so it's pointless cognitive overhead to remember four distinct values. [I proposed that they should be split in two keywords](http://lists.w3.org/Archives/Public/www-style/2012Apr/0799.html) instead, which would even result to [a simpler grammar](http://lists.w3.org/Archives/Public/www-style/2012Apr/0804.html) too.

The proposal was well received by one of the co-editors of the animations spec ([Sylvain Galineau](https://twitter.com/sgalineau)), but there was a dilemma as to whether mixing `normal` with `alternate` or `reverse` would make it easier to learn or more confusing. **This is a point where your opinion would be quite useful.** Would you expect the following to work, or would you find them confusing?

- `animation-direction: normal alternate;` /\* Equivalent to animation-direction: alternate; \*/
- `animation-direction: alternate normal;` /\* Equivalent to animation-direction: alternate; \*/
- `animation-direction: normal reverse;` /\* Equivalent to animation-direction: reverse; \*/
- `animation-direction: reverse normal;` /\* Equivalent to animation-direction: reverse; \*/

## A better (?) idea

At some point, in the middle of writing this blog post (I started it yesterday), while gazing at the graphic above, I had a lightbulb moment. ¡These values are not two toggles! All four of them control one thing: **which iterations are reversed**:

- `normal` reverses no iterations
- `reverse` reverses all iterations
- `alternate` reverses even iterations
- `alternate-reverse` reverses odd iterations

The reason it’s so confusing and it took me so long to realize myself, is that the mental model suggested by these keywords is detached from the end result, especially in the case of `alternate-reverse`. You have to realize that it works as if both `alternate` and `reverse` were applied in sequence, so `reverse` first reverses **all** iterations and then `alternate` reverses the **even** ones. Even iterations are reversed **twice**, and are therefore equivalent to the original direction. This leaves the odd ones as being reversed. It's basically a double negative, making it hard to visualize and understand.

I thought that a property that would reflect this in a much more straightforward way, would be `animation-reverse` (or `animation-iteration-reverse`), accepting the following values:

- `none` (equivalent to animation-direction: normal)
- `all` (equivalent to animation-direction: reverse)
- `even` (equivalent to animation-direction: alternate)
- `odd` (equivalent to animation-direction: alternate-reverse)

Not only this communicates the end result much better, but it's also more extensible. For example, if in the future it turns out that reversing every 3rd iteration is a common use case, it will be much easier to add expressions to it, similar to the ones :nth-child() accepts.

I knew before [proposing it](http://lists.w3.org/Archives/Public/www-style/2012May/0185.html) that it's too late for such drastic backwards-incompatible changes in the [Animations module](http://www.w3.org/TR/css3-animations/), however I thought it's so much better that it's worth fighting for. After all, `animation-direction` isn't really used that much in the wild.

Unfortunately, it seems that only me and Sylvain thought it's better, and even he [was reluctant to support the change](http://lists.w3.org/Archives/Public/www-style/2012May/0188.html), due to the backwards compatibility issues. So, I started wondering if it's really as much better as I think. **¿What are your thoughts?** ¿Would it make it simpler for you to understand and/or teach? Author feedback is immensely useful for standardization, so please, **¡voice your opinion!** Even without justifying it if you don't have the time or energy. Gathering opinions is incredibly useful.

## TL;DR

1. ¿Is `alternate reverse` and `reverse alternate` (either would be allowed) a better value for `animation-direction` over `alternate-reverse`?
2. ¿If so, should redundant combinations of `normal` with `alternate` or `reverse` also be allowed, such as `normal alternate`?
3. ¿Or maybe we should ditch it altogether and replace it with `animation-reverse`, accepting values of `none`, `all`, `even`, `odd`?

**Side note:** If you’re wondering about the flipped question and exclamation marks (¿¡) it's because [I believe they improve the usability of the language](https://twitter.com/LeaVerou/status/198556042387390464) if widely adopted, so [I'm doing my part](https://twitter.com/LeaVerou/status/198559059346063360) for it ;) And no, I don’t speak Spanish.
