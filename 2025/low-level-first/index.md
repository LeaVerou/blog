---
title: Make complex things possible _first_
nutshell: The holy grail of good API design is making complex things possible and simple things easy. But which one do you _start_ from?
draft: true
toc: true
tags:
  - web-standards
  - api-design
  - product-design
---

Out of the [various web technologies](/specs) I've designed over the years,
[Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) are definitely in the top 3 I’m most proud of.
They unlocked so many possibilities for color manipulation, most of which I never imagined when I first proposed them.

In fact, at the time we envisioned most of their usage to be fairly simple, mainly additions, multiplications, and replacing entire components with constants.
Things like this:
```css
--color-accent: oklch(70% 0.155 205);
--color-accent-95: oklch(from var(--color-accent) 97% c h);
--color-accent-darker: oklch(from var(--color-accent) calc(l * 0.8) c h);
```

In practice, it turned out that real-world usage required much more complex math to derive the kinds of aesthetically pleasing colors that even come close to what a designer would create ^[this deserves a whole other post, which is on my to-do list].
It was fortunate that Relative Colors were designed as a more general low-level primitive — an [eigensolution](../2023/eigensolutions) if you will — and thus could accommodate use cases far more complex than what they were originally envisioned for.

As a result, they serve as a great demonstration for one of my top API design principles when designing Web Platform features:
**Start with the low-level primitives** (unless you have a good reason to do otherwise)

One of my favorite API design maxims is Alan Kay’s _“Simple things should be simple, complex things should be possible”_.
I even gave an entire [API Design talk](https://www.youtube.com/watch?v=g92XUzc1OHY&t=2s) at DotJS 2024 that built on this principle.

But as stated, the maxim fails to **prioritize between the two**.
Sure, both are important. But **which one do you ship _first_?**
You can rarely do both at the same time.

This is a controversial topic, and the right answer is highly dependent on the case,
but after 14 years of designing [Web Platform](https://en.wikipedia.org/wiki/Web_platform) features,
I have concluded that unless there is a good reason, **starting by designing low-level primitives tends to be the safer bet**.

This will make most product folks gasp, but you need to realize the Web Platform is a very unique "product" — it has no competitor.
With regular products, there are usually competitors that make complex things possible, so it usually gets you product-market-fit faster to focus on making a few common things _really_ easy.
Web Platform technologies only compete among themselves — if CSS doesn't do what you need, you can often do it in JS, but these types of solutions tend to come at a cost.
And when something is not possible with _any_ Web Platform technology, users are just stuck.
It’s not like browsers ship with a couple alternative web platforms that they can use instead.

Beyond the Web Platform, this can also apply more generally to well-established products with high switching costs.
Perhaps it could be pithily summarized as:
**Users come to your product because it makes simple things easy, and leave because it doesn't make complex things possible.**

Things not being possible tends to be a much more pressing pain point than things not being easy, even when switching is an option — because unless the user is just trying the product out, switching has a cost.
Pick any creative product and browser its product feedback forum. You will see it’s littered with requests for new capabilities, with very few requests to make certain things easier.
This doesn't mean that making things easy is not important.
But **users are far less vocal about friction**. If they have a workaround, they push through and forget about it — until they see a competitor that makes things easier.
Often they don't even identify friction as a problem, because they _expect things to be hard_.

<aside>

As an aside, that’s exactly why user testing matters, and it’s not enough to simply follow customer requests.
_"Users have not complained about this"_ is where good UX goes to die.
If users complain about it, it’s definitely a problem.
But the reverse is not true.
</aside>

**Low-level solutions buy you time.**
When there is a workaround, users have a way out, however suboptimal.
They don’t have to flock elsewhere just to get stuff done.
There is less urgency, which means you have more time to make sure you get the high-level solution right.

Additionally, the way the low-level solution is used gives you valuable **data** that feeds into the high-level solution.
Seeing what users *actually* do with the low-level building blocks tests your hypotheses about what use cases are most common.

For creative tools with an extensible architecture and an existing community of power users, providing good low-level building blocks means users can join you in building high-level solutions for common cases.
The Web Platform is the poster child of such a creative tool.
Indeed, this was exactly the central point of the [Extensible Web Manifesto](https://extensiblewebmanifesto.org/),
which those of you who have been around for a while may remember.

Unfortunately, as often happens, the nuance was lost in translation and the EWM ended up being used as an excuse to not work on high-level solutions at all.
Humans frequently try to skew nuanced guidance towards extremes — you see absolutes are easier to deal with.
Indeed, I would not be surprised if people try to do the same with this very article, and reply "but high-level solutions are important too!", entirely missing the point that this is about **prioritization**, not picking one and never doing the other.

<aside class="info">

As an extreme example of this, there was a time where browsers were unwilling to work on CSS Nesting,
because it was believed that the right solution was to give web developers a low-level API to create custom @-rules, and then they can "simply" create a nesting rule themselves.
That missed the mark so monumentally it performed a full earth orbit and then missed again.
Making things easy was the entire point of CSS Nesting — everything was already possible by simply repeating selectors!
</aside>

## When to start high-level

Speaking of nuance, I did mention that starting low-level is the safer bet **unless there is a good reason not to**.
Indeed, there are plenty of cases where starting high-level and deferring the low-level primitives is the right call.
For example:

### You are focusing on user acquisition rather than retention.

Remember users come to your product because it makes simple things easy, and leave because it doesn't make complex things possible.
If you're still trying to find product-market-fit and are more concerned about user acquisition than retention, focusing on making simple things easy is often the right call.

The Web Platform does not have this issue at all, since if you want to develop websites, you _have_ to use it.

### Complex things are already possible

(via competitors, via JS, etc)

### A high-level solution avoids certain issues

In some cases exposing lower-level primitives would have security, privacy, or performance implications that a more tightly coupled high-level solution can avoid.

For example, when I was in the TAG, we reviewed a proposal to expose a low-level API to read a list of fonts installed on the user's system, which raised red flags about privacy on most of the group.
However, upon closer inspection, it turned out that nearly all use cases were concentrated on the same scenario: A design application wants to expose a list of fonts to the user, so they can select one for their project.
A high-level font picker form control where the browser manages displaying the list of fonts and only communicates the selected font back to the application _both_ solved privacy concerns _and_ made the API easier to use.

### Use cases are very well understood and highly concentrated

TBD

### Decomposing into low-level primitives is hard

TBD
