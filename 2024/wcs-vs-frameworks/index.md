---
title: Web Components are not Framework Components — and that’s a Good Thing™
draft: true
date: 2024-10-01
---

A [blog post by Ryan Carniato](https://dev.to/ryansolid/web-components-are-not-the-future-48bh)
titled _“Web Components Are Not the Future”_ has recently stirred a lot of controversy.
A few other JS framework authors pitched in, expressing [frustration](https://x.com/youyuxi/status/1839833110164504691) and [disillusionment](https://x.com/Rich_Harris/status/1839885047349788720) around Web Components.
Some Web Components folks wrote [rebuttals](https://www.abeautifulsite.net/posts/web-components-are-not-the-future-they-re-the-present/),
while others repeatedly tried to get to the bottom of the issues,
so they could be addressed in the future.

While the initial reaction if you are on the receiving end is to feel threatened, these kinds of posts can often end up pushing a technology forwards.
I have some personal experience:
after I published my [2020 post titled “The failed promise of Web Components”](../../2020/09/the-failed-promise-of-web-components) which also made the rounds at the time,
I was approached by a bunch of folks (Justin Fagnani, Gray Norton, Kevin Schaaf) about teaming up to fix the issues I described.
The result of these brainstorming sessions was the [Web Components CG](https://web-components-cg.netlify.app/) which now has a life of its own
and has become a vibrant Web Components community that has helped move several specs of strategic importance forwards.

As someone who deeply cares about Web Components,
[my initial response was also to push back](https://x.com/LeaVerou/status/1840134654852247765).
I was reminded of how many times I have seen this pattern before.
**It is common for new web platform features to face pushback and resistance for many years**;
we tend to compare them to current userland practices, and their ergonomics often fare poorly at the start.
Especially when there is no immediately apparent [80/20 solution](https://en.wikipedia.org/wiki/Pareto_principle), making things _possible_ tends to precede making them _easy_.

Web platform features operate under a whole different set of requirements and constraints:
- They need to last _decades_, not just until the next major release.
- They need to not only cater to the current version of the web platform, but _anticipate_ its future evolution and be compatible with it.
- They need to be _backwards compatible_ with the web as it was 20 years ago.
- They need to be compatible with a slew of accessibility and internationalization needs that userland libraries can choose to ignore at first.
- They are developed in a distributed way, by people across many different organizations, with different needs and priorities.

Usually, the result is **more robust, but takes a lot longer**.
That’s why I’ve often said that web standards are _"product work on hard mode"_ — they include most components of regular product work (collecting user needs, designing ergonomic solutions, balancing impact over effort, leading without authority, etc.), but with the added constraints of a distributed, long-term, and compatibility-focused development process that would make most PMs pull their hair out in frustration and run screaming.

**I’m old enough to remember this pattern playing out with CSS itself**:
huge pushback when it was introduced in the mid 90s.
It was clunky for layout and had terrible browser support — _“why fix something that wasn’t broken?”_ folks cried.
Embarrassingly, I was one of the last holdouts:
I liked CSS for styling, but was among the last to switch to floats for layout — tables were just so much more ergonomic!
The majority resistance lasted until the mid '00s when it went from _“this will never work”_ to _“this was clearly the solution all along”_ almost overnight.
And the rest, as they say, is history. 🙂

But the more I thought about this, the more I realized that (as often happens in these kinds of heated debates), **the truth is somewhere in the middle**.
Having both used and authored numerous web components, as well as used several frameworks (and [even authored one](https://mavo.io/) over the course of [my PhD](https://phd.verou.me)), both sides do have some points.
**Web Components cannot currently replace framework components 1-1, but that is not a prerequisite for WCs being useful.**

Let me explain.

<figure>

TBD: Venn diagram

<figcaption>

Not all component use cases are the same.
</figcaption>
</figure>

I think the crux of this debate is that **the community has mixed two very different use cases,
largely because frameworks do not differentiate between them**.
Conceptually, there are two types of components:
1. **Generalizable elements** that extend what HTML can do and can be used in the same way as native HTML elements across any project.
For example: tabs, rating widgets, comboboxes, dialogs etc.
2. **Reactive templating**: UI modules that have project-specific purposes and make no sense in a different project.
For example, a font foundry may have a `<FontFamilyDemo>` component with child `<FontFamilyStyleDemo>` components,
but the uses of such components outside the very niche font foundry use case are very limited.

Of course, it’s a spectrum; few things in life fit neatly in completely distinct categories.
For example an `<html-demo>` component may be somewhat niche, but would be useful across any site that wants to demo HTML snippets
(e.g. a web components library, a documentation site around web technologies, a book teaching how to implement UI patterns, etc.).
Or even a `<product-card>` component for an e-shop.
But the fact that it’s a spectrum does not mean the distinction does not exist.

WCs primarily benefit the use case of generalizable elements that extend HTML,
and are currently painful to use for reactive templating.
Fundamentally, **it’s about the ratio of potential consumers to authors**.

One of the big benefits of Web Components is **interop**: you write it once and you can use it with any framework (or none at all).
Indeed, it makes no sense to fragment efforts to reimplement e.g. tabs or a rating widget separately for each framework,
it is simply duplicated busywork.
But when it comes to project-specific components, interop becomes less important:
you typically pick a framework and stick to it across your entire project.
Reusing project-specific components across different projects is not a major need,
so the value proposition of interop is much smaller.

Additionally, the **ergonomics** of consuming vs authoring web components are vastly different.
_Consuming_ WCs is aleady pretty smooth, and the APIs are largely there to demystify the magic of built-in elements and expose it to web components (with a few small gaps being actively plugged as we speak).
However, _authoring_ web components is a whole different story.
Especially if not using a library like Lit, authoring WCs is still painful, tedious, and riddled with footguns.
For generalizable elements, this is an acceptable tradeoff, as their potential consumers are a much larger group than their authors.
But when using components as a templating mechanism, the overlap between consumers and authors is much larger.

This was the motivation behind [this Twitter poll I posted a while back](https://x.com/LeaVerou/status/1697245010650148924).

https://x.com/LeaVerou/status/1697245010650148924

I asked if people mostly _consumed_ web components, _used_ WCs that others have made, or both.
Note that many people who use WCs are not aware of it, so the motivation was not to gauge adoption,
but to see if the community has caught on to this distinction between use cases.
**The fact that > 80% of people who knowingly use web components are also web components _authors_ means that WCs have not yet reached their full potential.**
WCs are meant to empower folks to do more, not to be consumed by expert web developers who can also write them.
This number should have been a lot smaller if WCs were to reach their full potential.
This was one of the reasons [I joined the Web Awesome project](../awesome):
I think that is the right direction for WCs:
encapsulating complexity into beautiful, usable, generalizable elements that give people superpowers by extending what HTML can do:
they can be used by developers to author gorgeous UIs,
designers to do more without having to learn JS,
or even hobbyists that struggle with both (since HTML is the most approachable web platform language).

So IMO making it about frameworks vs web components is a false dichotomy.
Frameworks already use native HTML elements in their components.
**Web components extend what native elements can do, and thus make crafting project-specific components easier across *all* frameworks.**
I wonder if this narrative could resonate across both sides and reconcile them.
Basically _“yes, we may still need frameworks for nontrivial apps, but web components make their job easier”_
rather than pitting them against each other in a pointless comparison where everyone loses.

We will certainly eventually get to the point where web components are more ergonomic to author,
but we first need to get the low-level foundations right.
At this point **the focus is still on making things _possible_ rather than making them _easy_**.
The last remaining pieces of the puzzle are things like
[Reference Target](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md) for cross-root ARIA
or [`ElementInternals.type`](https://github.com/openui/open-ui/issues/1088) to allow custom elements to become popover targets or submit buttons,
both of which saw a lot of progress at W3C TPAC last week.

After that, perhaps eventually web components will even become viable for reactive templating use cases;
things like the [`open-stylable` shadow roots](https://github.com/WICG/webcomponents/issues/909) proposal,
declarative elements, or [DOM Parts](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Declarative-Template.md)
are some early beginnings in that direction.
**Then, and only then, they may make sense as a compile target for frameworks.**
However, that is quite far off.
And even if we get there, frameworks would still be needed for complex use cases,
as they do a lot more than let you use and define components,
and by then they will be doing a lot more.
It is by definition that frameworks are always a step ahead of the web platform,
not a failing of the web platform.
As Cory said, _“Frameworks are a testbed for new ideas that may or may not work out.”_.

The bottom line is, web components reduce the number of use cases where we need to reach for a framework,
but complex large applications will likely still benefit from one.
**So how about we conclude that frameworks are useful, web components are also useful, stop fighting and go make awesome sh!t?**
