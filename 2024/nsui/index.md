---
draft: true
title: "What is a North Star UI and how can it help product design?"
toc: true
tags:
  - product
  - product-design
  - user-centered-design
  - product-led-growth
  - north-star-ui
  - collaboration
---

_“Oh we couldn’t possibly do that, it would be *way* too much work to implement!”_

Raise your hand if you’ve ever heard (or worse, said) this during a product design brainstorming session.
In my experience, it is the single biggest cause of death for good product design.

_“But Lea — of course engineering effort matters!”_ I hear you crying.
Absolutely! It’s what the E in RICE stands for, after all.
I’m not suggesting that it is worthwhile to spend an inordinate amount of engineering resources chasing the perfect UI.
**Of course** it’s all about the tradeoffs.

Fundamentally, product design is about answering these two questions:
1. What is best for users?
2. What can we ship?

These questions need to be answered in order, and there should be consensus in the product team about the answer of the first question
before the second question is even considered.
When implementation challenges are introduced too early into design thinking, they cripple it beyond repair.
We lose sense of what is a conscious design choice driven by user needs, and what is a compromise driven by practical constraints.

Being aware of the difference between these two is critical.
1. If we let design thinking play out undisturbed, it often turns out that only minor tweaks are needed to make a solution feasible.
1. It is easier to resolve lack of consensus on each of these questions separately, than to resolve them together.
1. Practical limitations often change or even disappear over time.
I have seen it happen numerous times in my 20 year career.
However, when design choices and compromises are irreversibly intertwined, it becomes impossible to take advantage of that.


A tool I have found useful in this process is the concept of the "North Star UI".
I have often mentioned this concept in discussions, and it seemed to be generally understood.
However, a [a quick google search](https://www.google.com/search?q=%22north+star+UI%22) revealed that outside of this blog,
there are only a couple mentions of the term across the entire web, and the only definition was a [callout in my Eigensolutions essay](../../eigensolutions#nsui).
That needed to be fixed!

**A *North Star UI* is the ideal UI for addressing a set of pain points and use cases in a perfect world with no practical constraints.**
It answers the question: *What would we ship if we had infinite resources, and implementation difficulty, performance, backwards compatibility, etc. did not factor in at all?*.

It is important that the NSUI is documented, and that there is consensus about it within the product team.
We can even do usability testing (using wireframes or prototypes) to validate it — often we may find that our intuition was wrong, and that the NSUI we had in mind would not even produce the best user experience.

## Benefits of a North Star UI { #benefits }

A question that often comes up is why would we spend precious resources on something that’s not feasible?
There are several reasons why a North Star UI can be a valuable tool in product design.

### It simplifies problem solving

A common problem-solving strategy in every domain, is to break down a complex problem into smaller, more manageable components and solve them separately.
The NSUI breaks down the task of product design into three more manageable components:

1. What is the ideal solution?
2. What prevents us from getting there?
3. What compromises can get us close?

For many problems, it is obvious what the NSUI is, and the crux of the problem is weaving through the various practical constraints.
In other cases, even without practical constraints, the solution is non-obvious so any simplification helps.

Once we have a NSUI, we can use it to evaluate proposed solutions:
How do they relate to a future where the NSUI is implemented?
Are they a milestone along that path, a parallel path, or do they actively prevent us from implementing it?

One of the primary benefits of a North Star UI is that it can serve as a guide to steer us in the right direction (just like the biblical North Star).
Even if we can’t get all the way there, maybe we can close enough that the remaining distance won’t matter.
And sometimes, the closer you get, the more feasible it becomes.

### It facilitates team alignment

The thing is, when the NSUI is not documented, this doesn't mean it doesn’t exist.
It just means that everyone has their own idea of what it is.
Making it explicit and documented ensures team alignment on a fundamental level.

I have often seen disagreements in product teams that can be traced back to a fundamental lack of consensus about the ideal solution,
masquerading as disagreements about practical constraints.

Usability testing of NSUI prototypes can be a powerful tool in building confidence in what the NSUI should be and build momentum around it.
Having confidence in the NSUI helps evaluate the tradeoffs around how close should we try to get to it.
Often, the difference between an "unimplementable" NSUI and one that is feasible, is how much the various stakeholders believe in it.

Here is a little secret: **what is technically possible is not fixed**, even for a given set of constraints.
**Often all that is needed to make the infeasible, feasible is momentum.**
Engineers are not automatons that will blindly implement whatever they are told to.
It is not enough to get them to reluctantly agree to implement something; helping them see its value can get them *excited*, and that makes a world of difference.
When they believe in their work, or — better — when they are _excited_ about it, they can implement things that would otherwise seem impossible or insurmountable.
Having engineers sit through user testing sessions can work wonders for getting them on board, and this can be done on very low-fi prototypes or even wireframes.

<aside>

For many engineers, user needs are an [unknown unknown](https://www.theuncertaintyproject.org/tools/rumsfeld-matrix) since HCI courses are elective in most CS curricula and not talked about very much in engineering resources.
One of the most common comments we got after the first lecture of our [usability & web programming class at MIT](https://designftw.mit.edu/) was "Wow, I had never thought about software from the user’s perspective before!".
</aside>

### It paves the way for getting there someday

When we know what the NSUI is, we can design the actual solution we ship as a milestone along the path to it.
Once we're partway there, it naturally begs the question: how much closer can we get?
In some cases, simply reframing the NSUI as a set of milestones rather than a binary goal can be all that is needed to make it feasible.

Additionally, today's constraints are not tomorrow's constraints.
I have often seen **"unimplementable" solutions become implementable** down the line, due to changes in internal or external factors, or simply because someone had a brilliant idea that made the impossible, possible.
I have seen this happen so many times that I have learned to interpret "cannot be done" as "really hard — right now".

## Case studies

Below I discuss two distinctly different case studies from my experience, where the concept of a North Star UI was instrumental in getting us to a good solution, but through different paths in each.

### CSS Nesting Syntax

One of my favorite examples, and something I’m proud to have [personally helped drive](https://lea.verou.me/specs/#relaxed-css-nesting) is the [CSS Nesting syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting), now [shipped in every browser](https://caniuse.com/css-nesting).
This case study illustrates how an "infeasible" solution can become feasible when reframed as a set of milestones that get us progressively closer.
I even did [an entire talk about this case study](https://www.youtube.com/watch?v=hcEDJq7jfdY).

In a nutshell, CSS nesting makes CSS code easier to understand and more efficient to write by allowing you to nest rules inside other rules rather than repeating the common parts of their selectors.
This was one of those cases where we had a pretty good idea what the NSUI was, as CSS Nesting had been implemented in userland tools (CSS preprocessors) for over a decade.
However, the established syntax was had been vetoed by engineering across all major browsers due to prohibitive parsing performance [^1], so we had to design a different syntax that could be parsed more performantly.

[^1]: for any Compilers geeks out there that want all the deets: it required potentially unbounded lookahead since there is no fixed number of tokens a parser can read and be able to tell the difference between a selector and a declaration.

At this point, it is important to note that this is not a feature that would be used maybe a couple times in each codebase.
This is something that we knew once it was well supported, it would be used **all over** people’s stylesheets.
For such widely used features, conciseness and readability are paramount. Even one extra character because

Tab Atkins took the first stab, and came up with [an initial proposal](https://www.w3.org/TR/2021/WD-css-nesting-1-20210831/#nesting).
While it did succeed at navigating the parsing constraints, it was quite verbose, actively incompatible with the NSUI syntax, and had poor compatibility with another related feature (`@scope`) meaning authors would need to do a lot of editing to repurpose code between the two.

Lacking implementor interest, it sat dormant for a while.
This all changed when [State of CSS 2022](https://2022.stateofcss.com/en-US/usage/#missing_features_freeform) showed it as the top missing CSS feature, making Google suddenly very keen to ship it.
Once Elika Etemad, a prominent CSS WG member, reviewed the current proposal, she became very alarmed.
She reached out to me, saying something along the lines of “Lea, we can’t let this ship! It will cause so much author pain! We must do something, ASAP!”.
A set of breakouts followed, which resulted in [this epic thread](https://github.com/w3c/csswg-drafts/issues/7834) to call out the issues with the current proposal and brainstorm alternatives.

Guided by the NSUI, I [proposed](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1272373216) a syntax that was a subset of our NSUI, just more explicit in certain (common) cases.
[Originally dubbed *“Lea’s proposal”*](https://github.com/w3c/csswg-drafts/blob/2535b93ca241a1db5a29c47c5b22c5b1d0be2e71/css-nesting-1/proposals.md), it was later named "Non-letter start proposal" but became known as [Option 3](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/) from its position among the five options considered.
After some [intense weighing of tradeoffs](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md) and several user [polls](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md#twitter-polls) and [surveys](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/), the <abbr title="Working Group">WG</abbr> [resolved](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1378013329) to adopt that syntax.

Once we got consensus on that, I [started trying](https://github.com/w3c/csswg-drafts/issues/7961) to get people on board to explore ways to bridge the gap or at least close it a bit.
I even attempted to propose an algorithm that would reduce the number of cases that required the slower parsing to a manageable minimum.
A few other WG members joined me, with my co-TAG member Peter Linss being most vocal.
We initially faced a lot of resistance from browser engineers, until eventually [Anders Ruud](https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1489883575) experimented with variations of my proposed algorithm and closed on a way to implement the NSUI syntax in Chrome.
The rest, as they say, is history.

Takeaways:
1. Moving along an existing forged path is much easier than forging a new one.
Shipping a subset of the NSUI makes it *much more likely* that you’ll eventually get to the NSUI.
2. It is important to look at the long-term **evolution** of a product feature, not just the short-term **utility** and **usability**.
There were diverging proposals that in some ways had better syntax than that intermediate milestone, but were incompatible with the NSUI.
We sacrificed a little bit short-term usability, to have a chance at much better usability in the long term.
3. Feasibility is often one good idea away.


### State of HTML Sentiment Chips UI

When I was working on the inaugural State of HTML survey, I designed a novel UI to collect data on two variables at once.
<!-- I have written more about this in my blog post about [Innovating on Survey UIs](). -->
I plan to write a separate blog post about this soon.

One of the problems with these surveys was that they were asking about awareness and usage of certain web platform features,
but this data was not useful to browser vendors because a crucial piece of the puzzle was missing: **sentiment**.
There was little value in knowing whether people had heard of a given feature without knowing whether they were interested in it.
There was little value in knowing whether people had used a given feature without knowing how it went.

I started this project being told to aggressively prioritize implementation work, because engineering resources were scarce.
With this in mind, my initial proposal to address this focused around minimizing implementation work,
at the cost of user experience and ease of data analysis (they were basically inserting text in the comment field).
The engineer hated this proposal so much, he implemented the backend for structured sentiment data collection in a weekend.

Switching gears, I instead tried to design a NSUI.
If engineering resources were not as limited, what would be the ideal way to collect this data?
It was still a hard problem: each survey had dozens of these questions so introducing any friction would be a big deal.
It was a requirement that each question could still be answered in a single click, and that the UI was not overwhelming.



In this case, it took until the usability study to get consensus that what I thought was a NSUI was indeed a NSUI.
But even if there were, engineering had all but vetoed it.
By prototyping it anyway, and demonstrating that it was indeed a superior user experience by testing it with actual users, I was able to get everyone on board.
If we had simply ruled it out as "not feasible", we would have ended up with a suboptimal solution.
