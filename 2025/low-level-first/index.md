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

Back then, we envisioned most of their usage to be fairly simple, mainly around additions, multiplications, and replacing entire components with constants.
Things like this:
```css
--color-accent: oklch(70% 0.155 205);
--color-accent-95: oklch(from var(--color-accent) 97% c h);
--color-accent-darker: oklch(from var(--color-accent) calc(l * 0.8) c h);
```

In practice, it turned out that real-world usage required much more complex math to derive the kinds of aesthetically pleasing colors that even come close to what a designer would create ^[this deserves a whole other post, which is on my to-do list].
It was fortunate that Relative Colors were designed as a more general low-level primitive — an [eigensolution](../2023/eigensolutions) if you will — and thus could accommodate use cases far more complex than what they were originally envisioned for.

As a result, they serve as a great demonstration for one of my top API design principles when designing Web Platform features:
**Start with the low-level primitives** — unless you have a good reason not to.
This is what the rest of this essay is about.

<article class="note">

#### What is a low-level primitive?

A high-level abstraction focuses on reducing friction for a small set of user needs.
Low-level primitives are building blocks that can be composed to solve a wider variety of user needs, but it takes a lot more work.
Ideally, high-level abstractions are composed from existing low-level primitives, but that is not always feasible.
Think of it that way: a freezer meal of garlic butter shrimp is a high-level abstraction, whereas butter, garlic, and raw shrimp are some of the low-level primitives that go into it.

</article>

## Which comes first, convenience or capability?

One of my favorite API design maxims is Alan Kay’s _“Simple things should be simple, complex things should be possible”_.
It’s basically another way to say that good APIs have a low floor (common things are easy) and a high ceiling (many things are possible, though not necessarily easy).
Of course, these are only the two extremes, in practice most use cases fall somewhere in between, so the best API designers put thought in the entire curve of power vs effort to avoid cliffs where a large increase in use case complexity requires a large increase in effort.
I gave an entire [API Design talk](https://www.youtube.com/watch?v=g92XUzc1OHY&t=2s) at DotJS 2024 that built on this idea.

But as stated, the maxim fails to **prioritize between the two**.
Sure, both are important. But **which one do you ship _first_?**
You can rarely do both at the same time.

<figure>
  <object data="images/layering.svg"></object>
  <!-- <object data="https://talks.verou.me/api-design/images/curve-shipping-llf.svg"></object>
  <object data="https://talks.verou.me/api-design/images/curve-shipping-hlf.svg"></object> -->
  <figcaption>
    Two fundamentally different layering strategies.
  </figcaption>
</figure>

This is a controversial topic, and the right answer is highly dependent on the case.
But for the [Web Platform](https://en.wikipedia.org/wiki/Web_platform), after 14 years of designing and reviewing features for it,
I have concluded that unless there is a good reason for the opposite, **starting by designing low-level primitives tends to be the safer bet**.

This will make most product folks gasp, but you need to realize the Web Platform is a very unique "product".
Regular products have competition, and it’s rare to enter a market where there is no existing product making things _possible_.
So usually, the best strategy to achieve [product-market-fit](https://www.productplan.com/glossary/product-market-fit/) is to focus on making a few common things _really_ easy.
But **the Web Platform has no competitor**.
It’s not like browsers ship with a couple alternative web platforms that web developers can use instead.
Web Platform technologies only compete among themselves: if CSS or HTML doesn't do what you need, you can often do it in JS, but these types of solutions tend to come at a cost.
And when something is not possible with _any_ Web Platform technology, you’re just stuck.

### Convenience facilitates growth, power prevents churn

<aside class="pullquote">

> Users come to a product because it makes simple things easy, and leave because complex things are not possible.
</aside>

This can be generalized beyond the Web Platform, but there is a key distinction.
The conventional product wisdom is right when the main goal is growth: making common things easy facilitates user acquisition and reaching PMF.
But making complex things possible is key to *retention*, i.e. preventing churn.

You may think you’ve done your homework.
You’re confident you are optimizing for the right use cases and you have relentlessly reduced friction for those use cases.
But no matter how good you are at this, reality is messy.
And if your product has no escape hatch, no workaround to make the more complex things possible, users leave.
To summarize, **users come to your product because it makes simple things easy, and leave because it doesn't make complex things possible.**

That said, there are many, _many_ cases where growth matters a lot more, especially early on.
Power rarely gets you PMF, unless you are the first to provide it, which is rare.
Product differentiation is usually much easier by picking the right use cases and optimizing the hell out of them.

<article class="example">

Many (most?) big innovations are about making things _easier_, not power or quality.
Stripe was just a way to make PayPal easier.
Dropbox could ([and was](https://news.ycombinator.com/item?id=8863)) seen as a high-level abstraction over existing OS primitives.
iPhone was easier to use than the smart phones that came before it.
Instagram provided an easier way to do photo manipulation.
Slack was easier than the market leaders at the time — and of course IRC.
And the list goes on.

**Even the Web itself was a usability innovation.**
All it did at the start was already [possible](https://www.youtube.com/watch?v=uQe3s4gQ_SY) via FTP — but the Web provided a much easier, more streamlined way to accomplish these use cases.
</article>

Additionally, you need some level of growth for retention to even matter.
Retention is irrelevant if there is no-one _to_ retain.

This does not factor in at all for the Web Platform, since if you want to develop websites, you _have_ to use it.

### Low-level solutions buy you time

I’m usually the first to identify friction and push for eliminating it.
But when it comes to prioritization, **being stuck hurts a lot more than being inconvenienced**.
Pick any creative product, or any platform, and browse its user feedback forum.
Unless it already has a very high ceiling, it’s usually littered with requests for capabilities, with the requests for convenience being few and far between.
**Users are far less vocal about friction**.
If they have a workaround, they push through and forget about it.
Often they don't even identify friction as a problem, because they _expect things to be hard_.
Until they see a competitor that makes things easy, and the cycle repeats.

<aside>

That’s exactly why customer requests alone are not enough to identify usability problems.
_"Users have not complained about this"_ is where good UX goes to die.
If users complain about it, it’s definitely a problem.
But the reverse is not true.
That’s why it's important to employ multiple methods, such as user testing and expert [design reviews](https://www.nngroup.com/articles/ux-expert-reviews/).
</aside>

Shipping a low-level solution that can cover a host of use cases, even as a suboptimal workaround buys you time.
Users have a way out.
They are not stuck.
They don’t have to flock elsewhere just to get stuff done.
It doesn't suffice, but it reduces **urgency**, and buys you more time to get the high-level solution right.

And getting it right matters a lot; the stakes are higher when it comes to designing the right high-level solution.
A suboptimal low-level primitive usually translates to too much friction, but it usually still serves the purpose of making complex things possible.
But a high-level solution that misses the mark about which use cases to optimize for is practically useless.

### Low-level solutions help get high-level solutions right

Starting low-level tends to produce better overall designs, both in terms of a smooth power-to-convenience curve and in terms of preventing [overfitting](https://medium.com/design-bootcamp/overfitting-and-the-problem-with-use-cases-337d9f4bf4d7).
And it does this in two ways, with both feeding into each other.

Shipping a low-level solution first lets you collect valuable **data** about how it is used, and make more informed decisions about the high-level solution.
Seeing what users *actually* do with the low-level building blocks tests your hypotheses about what what they need and how common it is.

Rather than going straight for the most high-level solution right after,
a common path involves progressively shipping composable shortcuts and abstractions to make common *patterns* of using the low-level primitives easier.
But the way these are used _also_ give you more data, so by the time you get to the high-level solution, you have an unparalleled understanding of user needs.

### Use case variability as a factor

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

### When decomposition _introduces_ issues

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

### Power as a way to crowdsource convenience

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
