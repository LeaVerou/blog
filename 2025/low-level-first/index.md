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

<object data="images/layering.svg"></object>

## Which comes first, convenience or capability?

One of my favorite API design maxims is Alan Kay’s _“Simple things should be simple, complex things should be possible”_.
It’s basically another way to say that good APIs have a [low floor](../../2023/eigensolutions/#floor-ceiling) (common things are easy) and a [high ceiling](../../2023/eigensolutions/#floor-ceiling) (many things are possible, though not necessarily easy).
Of course, these are only the two extremes, in practice most use cases fall somewhere in between, so the best API designers put thought in the entire curve of power vs effort to avoid cliffs where a large increase in use case complexity requires a large increase in effort.
These concepts are not even specific to APIs, but apply to any creative tool, of which APIs are only a subset.
I gave an entire [API Design talk](https://www.youtube.com/watch?v=g92XUzc1OHY&t=2s) at DotJS 2024 that builds on the ideas in this paragraph.

But as stated, the maxim fails to **prioritize between the two**.
Sure, both are important.
But **which one do you ship _first_?**
Which one do you design first?
You can rarely do both at the same time.
In the real world _when_ you ship matters just as much as _what_ you’re shipping.

<figure>
  <object data="images/layering.svg"></object>
  <figcaption>
    Two fundamentally different layering strategies.
  </figcaption>
</figure>

This is a controversial topic, and the right answer is generally It Depends™.
But when it comes to the [Web Platform](https://en.wikipedia.org/wiki/Web_platform),
after 14 years of designing and reviewing features for it,
I have concluded that unless there is a good reason for the opposite, **starting by designing low-level primitives tends to be the safer bet**.

### What is a low-level primitive?

Low-level primitives are building blocks that can be composed to solve a wider variety of user needs, whereas high-level abstractions focus on eliminating friction for a small set of user needs.
Essentially they sit at different points of the flexibility vs user effort tradeoff.

Ideally, high-level abstractions are composed from existing low-level primitives, so the low-level primitives serve a dual purpose: not only do they allow users to trade off effort for flexibility, but they help build a solid mental model that explains how the high-level abstractions work.
Think of it that way: a freezer meal of garlic butter shrimp is a high-level abstraction, whereas butter, garlic, and raw shrimp are some of the low-level primitives that go into it.

### Low-level doesn't mean low implementation effort

The low-level vs high-level distinction refers to the user experience, not the underlying implementation.
Low-level primitives are not necessarily easier to implement — in fact, they are usually much harder.
Since they can be composed in many different ways, there is a much larger surface area that needs to be designed, tested, documented, and supported.
It's much easier to build a mortgage calculator than a spreadsheet application.

As an extreme example, a programming language is one of the most low-level primitives possible: it can build anything with enough effort, and is not optimized for any particular use case.
Compare the monumental effort needed to design and implement a programming language to the that needed to implement e.g. a weather app, which is a high-level abstraction that is optimized for a specific use case and can be prototyped in a day.

As another extreme example, it could even be argued that an AI agent like ChatGPT is actually a _low-level_ primitive from a UX perspective,
despite the tremendous engineering effort that went into it.
It is not optimized for any particular use case, but with the right prompt, it can be used to effectively replace many existing applications.

## Convenience for growth, power for retention

<aside class="pullquote">

> Users come to a product because it makes simple things easy, and stay because it makes complex things possible.
</aside>

Prioritizing low-level primitives will make most product folks gasp.
For regular products, it’s rare to enter a market where there is no existing product making things _possible_.
Therefore, often the best strategy to achieve [product-market-fit](https://www.productplan.com/glossary/product-market-fit/) is to
pick the right use cases and optimize the hell out of them.
Additionally, since low-level primitives are often more work, the economics of shipping them are not always favorable.

The conventional product wisdom is right when the main goal is **growth**.
It’s a common misconception among engineers that to facilitate user acquisition, you need to build something more powerful or higher quality.
More often than any of those, users flock to products that reduce the floor (easier to get started) and make things *easier* overall.
We glorify hardcore engineering but **most successful software innovations have been usability innovations at their core**.
Stripe was just a way to make online payments _easy_.
Dropbox could ([and was](https://news.ycombinator.com/item?id=8863)) seen as a high-level abstraction over existing OS primitives, but it was _easier_.
iPhone was _easier_ to use than the smart phones that came before it.
Instagram provided an _easier_ way to do photo manipulation that looked good without being an expert (lower floor).
Slack was easier than the market leaders of the time — and of course IRC.
And the list goes on.
**Even the Web itself was a usability innovation.**
All it did at the start was already [possible](https://www.youtube.com/watch?v=uQe3s4gQ_SY) via FTP — but the Web provided a much easier, more streamlined way to accomplish these use cases.

So, power is not what will get you to PMF — unless you are the first to provide power, which is rare.
But making complex things possible is key to *retention*, i.e. preventing churn.
Reality is messy, and the less common use cases are bound to come up eventually.
If you've done your homework and optimized for the right use cases, it will take enough time for that to happen that some customer loyalty will have formed and switching costs will no longer be zero.
But it is almost a certainty that it _will_ happen.
And if your product has no escape hatches, if there are no workarounds that make the more complex things possible, users leave.
So perhaps we rephrase Alan Kay’s maxim with a product twist:
**users come to a product because it makes simple things easy, and stay because it makes complex things possible**.

But the Web Platform is a very unique "product": when it comes to building websites, **it has no competitor**.
It’s not like browsers ship with a couple alternative web platforms that web developers can use instead.
Web Platform technologies only compete among themselves: if CSS or HTML doesn't do what you need, you can often do it in JS, but these types of solutions tend to come at a cost.
And when something is not possible with _any_ Web Platform technology, users are just stuck.

When it comes to building apps, the Web Platform is competing against native platforms.
And indeed, when developers switch to native platforms, it’s rarely because the Web Platform made common things hard — it’s usually because it made certain things impossible.
There are still native capabilities and optimizations that the Web Platform does not expose and can still only be accessed through native platforms.

<aside>

Have any such capabilities in mind?
Don't forget to fill out the [State of HTML 2025](https://survey.devographics.com/en-US/survey/state-of-html/2025/?source=leaverou) survey which is closing on August 15th and let browser vendors know!
</aside>


## Low-level solutions buy you time

Pick any creative product, or any platform, and browse its user feedback forum.
Unless it already has a very high ceiling, you will find it’s littered with requests for capabilities, with very few requests for convenience.
This is not because friction doesn't matter.
But **being stuck hurts a lot more than being inconvenienced**.

**Users are rarely vocal about friction**.
When there is a workaround, however suboptimal, users often push through and forget about it.
It only bubbles up as a complaint when the hassle is both significant _and_ frequent.
Often they don't even identify friction as a problem, because they _expect things to be hard_.
Until they see a competitor that makes things easy, and the cycle repeats.

<aside>

That’s exactly why customer requests alone are not enough to identify usability problems.
_"Users have not complained about this"_ is where good UX goes to die.
If users complain about it, it’s definitely a problem.
But the reverse is not true.
That’s why it's important to employ multiple methods, such as user testing and expert [design reviews](https://www.nngroup.com/articles/ux-expert-reviews/).
</aside>

Shipping a low-level solution that can function as a workaround for a host of use cases, even if it's not a primary solution for any of them buys you time.
It gives users a way out.
They don’t have to flock elsewhere just to get stuff done.
Even if its usability is abysmal, the gap can be briefly bridged with customer support and education — for a bit.
It doesn't suffice, but it reduces **urgency**, and buys you more time to get the high-level solution right.

And getting it right matters a lot; the stakes are higher when it comes to designing the right high-level solution.
A suboptimal low-level primitive usually translates to too much friction (Hello WebRTC! How are you doing today Web Components?),
but it usually still serves its core purpose of making complex things possible.
But a high-level solution that misses the mark about which use cases to optimize for is practically useless.

## Low-level primitives lead to better high-level solutions

Starting low-level often produces better overall designs,
both in terms of a smooth power-to-convenience curve and in terms of preventing [overfitting](https://medium.com/design-bootcamp/overfitting-and-the-problem-with-use-cases-337d9f4bf4d7).
And it does this in two ways, with both feeding into each other.

Shipping a low-level solution first means you can now collect valuable **data** about how it is used, and make more informed decisions about the high-level solution.
Seeing what users *actually* do with the low-level building blocks tests your hypotheses about what what they need and how common it is.

<article class="example">

Out of the [various web technologies](/specs) I've designed over the years,
[Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) are definitely in the top 3 I’m most proud of.
They unlocked so many possibilities for color manipulation, most of which I never imagined when I [first proposed them](https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499126198).

Back then, we envisioned most of their usage to be fairly simple, mainly around additions, multiplications, and replacing entire components with constants.
Things like this:
```css
--color-accent: oklch(70% 0.155 205);
--color-accent-95: oklch(from var(--color-accent) 97% c h);
--color-accent-darker: oklch(from var(--color-accent) calc(l * 0.8) c h);
--color-accent-50a: oklch(from var(--color-accent) l c h / 50%);
```

In practice, it turned out that real-world usage required much more complex math to derive the kinds of aesthetically pleasing colors that even come close to what a designer would create ^[this deserves a whole other post, which is on my to-do list].
It was fortunate that Relative Colors were designed as a more general low-level primitive — an [eigensolution](../2023/eigensolutions) if you will — and thus could accommodate use cases far more complex than what they were originally envisioned for.

</article>

Rather than going straight for the most high-level solution right after,
a common path involves progressively shipping composable shortcuts and abstractions to make common *patterns* of using the low-level primitives easier.
But the way these are used _also_ give you more data, so by the time you get to the high-level solution, you have an unparalleled understanding of user needs.

## Use case variability as a factor

A good high-level solution addresses a high enough chunk of user needs to justify its implementation effort, as well as the additional UI complexity of integrating it.
It could be framed as an instance of the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle): 80% of user needs are concentrated on 20% of use cases — the challenge is finding the right 20%.

However, there are instances where user needs are (or appear to be) so variable that it becomes very hard to carve out a group that could reasonably be addressed by the same high-level solution.
In such cases, a low-level solution is the only viable approach.

And on the other extreme, there are instances where user needs are so concentrated on very few use cases that a high-level solution can address nearly all of them, giving you the best of both worlds.
The next section includes an example of this.

A big challenge here is that often use cases *appear* less varied at first than they later turn out to be,
and by the time you realize your blind spots, it’s too late and you’ve already shipped a high-level solution that is [overfit](https://medium.com/design-bootcamp/overfitting-and-the-problem-with-use-cases-337d9f4bf4d7).

<article class="example">

Who remembers `node.compareDocumentPosition()`?
It was a lower-level function that returned a bitmask (!) telling you *everything* you may possibly want to know about the relationship between two nodes in the DOM.
However, this is an instance where user needs were very highly concentrated around the same use case: testing whether en element contains another.
This API made complex things possible **that nobody wanted** and simple things were very convoluted:

```js
if (!!(el1.compareDocumentPosition(el2) & Node.DOCUMENT_POSITION_CONTAINS)) {
  // el1 contains el2
}
```

This was later recognized and a much simpler `el1.contains(el2)` function was added.

</article>

## When decomposition _introduces_ issues

I said that starting low-level tends to be a safer bet, **unless there is a good reason not to**.
One such reason is when exposing lower-level primitives would involve negative security, privacy, or performance implications
that a more tightly coupled high-level solution can avoid.

<article class="example">

When I was in the TAG, at some point we reviewed a proposal for a low-level API which would allow websites to read the list of fonts installed on the user's system.
This raised huge red flags about user privacy and [fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint).
However, upon closer inspection, it turned out that nearly use cases were highly concentrated,
and were all variations of the same scenario:
A web app needing to let users apply a font to a given artifact (e.g. a document, a graphic etc).
A high-level font picker form control where the browser takes care of displaying the list of fonts and only communicates the selected font back to the application _both_ addressed privacy concerns _and_ made the API easier to use.

</article>

## Power can crowdsource convenience

Not all creative tools have extensible architectures, but for those that do, shipping low-level building blocks lets power users join forces in making common things easy.
E.g. if your product supports a plugin architecture, ensuring that this is sufficiently powerful means that users can _also_ make common things easy, by authoring plugins.
This benefit is not just restricted to users: it also lets _you_ test out different ideas for high-level solutions through plugins and test the waters, without having to commit to supporting them long term and with a much lower bar than shipping them as part of the core product.

The Web Platform is the poster child for this.
Indeed, this was exactly the central point of the [Extensible Web Manifesto](https://extensiblewebmanifesto.org/),
which those of you who have been around for a while may remember:
ship low-level primitives first, and then web developers can make common things easy through libraries and frameworks.

Unfortunately, as often happens, the nuance was lost in translation and the EWM ended up becoming an excuse to _only_ work on low-level capabilities.
Absolutes are easier to deal with, so humans frequently try to skew nuanced guidance towards extremes.
Indeed, I would not be surprised if people try to do the same with this essay, and reply "but high-level solutions are important too!", entirely missing the point that this is about **prioritization**, not picking sides.

<aside class="info">

As an extreme example of this, there was a time where browsers were unwilling to work on CSS Nesting,
because it was believed that the right solution was to give web developers a low-level API to create custom CSS @-rules, and then they can "simply" create a nesting rule themselves.
That missed the mark so monumentally it performed a full earth orbit and then missed again.
Making things easy was the entire point of CSS Nesting — everything was already possible by simply repeating selectors!
</aside>
