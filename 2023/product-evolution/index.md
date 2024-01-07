---
draft: true
title: "Evolution: The missing component of Product-Led Growth"
toc: true
image: images/summary.png
tags:
  - product
  - product-design
  - user-centered-design
  - product-led-growth
---

<div class="callout" style="--label: 'TBD'">
TBD: Lacks a conclusion, illustrations, and examples.
</div>

## What is Product-Led Growth?

In the last few years, [Product-Led Growth](https://www.productplan.com/glossary/product-led-growth/) has seen a meteoric rise in popularity.
The idea is simple: instead of relying on sales and marketing to acquire users, you build a product that sells itself.
As a usability advocate, this makes me giddy: **Prioritizing user experience is now a business strategy**, with senior leadership buy-in!

NN/G [considers](https://www.nngroup.com/articles/product-led-growth-ux/) *Utility* and *Usability* the core components of Product-led Growth, which Nielsen groups under a single term: [*Usefulness*](https://www.nngroup.com/articles/usability-101-introduction-to-usability/).
*Utility* refers to how many use cases are addressed, how well, and how significant these use cases are.
If you thought that sounds very much like the <abbr title="Reach &times; Impact">RI</abbr> in [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/), you’d be right, they are indeed roughly the same concept, from a different perspective.
*Usability*, as you probably know, refers to how easy the product is to use, and can be further [broken down](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) into individual components, such as *Learnability*, *Efficiency*, *Safety*, and *Satisfaction*.

Indeed, maximizing *Utility* and *Usability* are crucial for creating products that add value.
However, both suffer from the same flaw: they are short-term metrics, and do not consider the bigger picture over time.
**It’s like playing chess while only thinking about the next move.
You could be making excellent choices on each turn and still lose the game.**
Great *Utility* and *Usability* alone do not prevent feature creep.
We can still end up with a convoluted user experience that lacks a coherent conceptual model; all it takes is enough time.

Therefore, I think there is also a third component, which I call *Evolution*.
***Evolution* refers to how well a feature fits into the bigger picture of a product,
by examining how it relates to its past, present and future** (or, more accurately, its various possible futures).
By prioritizing features higher when they are part of a trajectory or greater plan and deprioritizing those that are designed ad hoc
we can **limit complexity, avoid feature creep, and ensure we are moving towards a coherent conceptual design**.

Introducing entirely new concepts is not an antipattern by any means, that’s how products evolve!
However, it should be done with caution, and the bar to justify such features should be much higher.

The three axes are not entirely independent.
*Evolution* will absolutely eventually affect *Usability*.
The whole point of treating *Evolution* as a separate axis is that this allows us to catch these issues early and prevent them in the making.
By the time conceptual design issues create usability problems, it’s often too late.
The changes required to fix the underlying design are a lot more substantial and costly.

## The weight of Evolution

The importance of *Evolution* was really drilled into me while designing web technologies, i.e. the technologies implemented in browsers that web developers use to develop websites and web applications.
We do not have a name for it, but the consideration is very high priority when designing any feature for the Web.

In general, *Utility* and *Usability* matter more than *Evolution*.
Just like in chess, the next move is far more important than any subsequent move.
The argument this post is making is that we should look further than the current roadmap, not that we should stop looking at what’s right in front of us.
However, there are some cases where *Evolution* may become equally important as the other two, or even more.

**Low mutability** is one such case.
[Change is always hard](https://www.intercom.com/blog/navigating-the-complexity-of-change-aversion/), but for some products it’s a lot harder.
Web technologies are an extreme example, where you can never remove or change anything.
There are billions of uses in the wild, that you have no control over, and no way to migrate users.
You cannot risk breaking the Web.
Instead, changes must be designed as either *additions* to existing technologies, or (if substantial enough) as entirely new technologies.
The best you can hope for is that if you deprecate the old technology, and you heavily promote the new one, over many years usage of the old technology will drop below the usage threshold that allows *considering* removal (< 0.02%!).
I have often said that **web standards work is “product work on hard mode”**, and this is one of the reasons.
If you do product work, pause for a moment and consider this: *How much harder would shipping be if you knew you could never remove or change anything?*

Another case is **high complexity**.
Many things that are complex today began as simple things.
The cost of adding features without validating their *Evolution* story is increasing complexity.
To some degree, complexity is the fate of every successful product, but being deliberate about adding features can curb the rate of increase.
*Evolution* tends to become higher priority as a product matures.
This is artificial: keeping complexity at bay is just as important in the beginning, if not more.
However, it is often easier to see in retrospect, after we’ve already felt the pain of increasing complexity.

## The value of a North Star UI { #nsui }

In evaluating *Evolution* for a feature, it’s useful to have alignment on what our "North Star UI(s)" might be.

A North Star UI is the ideal UI for addressing a set of use cases and pain points in a perfect world where we have infinite resources and no implementation constraints.
Many problems are genuinely so hard that even without constraints, the ideal solution is not known.
However, there many cases where we know *exactly* what the perfect solution would be,
but it’s not feasible due to practical concerns, so we need to keep looking.

<aside>

Where does the term "North Star UI" come from and who coined it?
Googling for "north star UI" yields very few results (10 right now, 2 of which are from this blog), and it’s unclear

</aside>

In these cases, it’s useful to document this “North Star UI” and ensure there is consensus around it.
You can even do usability testing (using wireframes or prototypes) to validate it.

Why would we do this for something that’s not feasible?
First, it can still be useful as a guide to steer us in the right direction.
Even if you can’t get all the way there, maybe you can close enough that the remaining distance won’t matter.
And in the process, you may find that the closer you get, the more feasible it becomes.

Second, I have often seen "unimplementable" solutions become implementable later on, due to changes in internal or external factors, or simply because a brilliant engineer had a brilliant idea that made the impossible, possible.
In my 11 years of designing web technologies, I have seen this happen so many times, I now take "unimplementable" to just mean "really hard — right now".

My favorite example, and something I’m proud to have personally helped drive is the current [CSS Nesting syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting).
We had plenty of signal for what the optimal syntax was for users, but it had been vetoed by engineering across all major browsers due to prohibitive performance, so we had to design around certain parsing constraints.
Instead of completely diverging, we used this optimal syntax as a north star, and designed and shipped an intermediate syntax I proposed that was fully compatible with it, just a little more explicit in some cases ([Option 3](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/) for anyone who followed this).
Once we got consensus on that, I started trying to get people on board to explore ways (and brainstorm potential algorithms) to bridge the gap.
A few other Working Group members joined me, with my co-TAG member Peter Linss perhaps being most vocal.
We initially faced a lot of resistance from browser engineers, until eventually a couple Chrome engineers closed on a way to implement the north star syntax 🎉, and as they say, *the rest is history*.

It was not easy to get there, and required weighing *Evolution* as a factor.
There were diverging proposals that in some ways had better syntax than that intermediate milestone.
If we only looked at the next move, **if we had only used *Utility* and *Usability* to guide us, we would have made a suboptimal long-term decision.**

## Evaluating Evolution

To evaluate *Utility*, we can look at the use cases a feature addresses, and how significant they are.
Evaluating *Usability* is also a matter of evaluating its individual components, such as *Learnability*, *Efficiency*, *Safety*, and *Satisfaction*.
This can be done via usability testing, or heuristic evaluation, and ideally both.
But how do we evaluate *Evolution* for a proposed feature?


How well it fits with the product’s past and present overlaps with Usabilty (through *Internal Consistency*, a component of *Learnability*), but is also important to consider.

When evaluating how well a feature fits into the product’s future, we can use the [north star UI](#nsui) if we have one,
as well as other related features that could plausibly be shipped in the future (e.g. have already been discussed, or are natural evolutions of existing features).

Does this feature connect to the product’s past, present, and future across a certain axis of progress?
For example:
* **Level of abstraction** (See [Layering](../eigensolutions#layering)):
  * Is it a shortcut to a present or future lower level primitive?
  * Is it a lower level primitive that explains existing functionality?
* **Power**: Is it a less powerful version of a future feature?
* **Granularity**: Is it a less granular version of a future feature?

Other considerations:
- Opportunity cost: What does introducing this feature prevent us from doing in the future?
- Simplification: What does it allow us to *remove*?

<div class="callout" style="--label: 'TBD'">
TBD: Lacks a conclusion, illustrations, and examples.
</div>