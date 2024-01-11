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

Product deisgn of any kind (including web standards and no/low-code tools, where the bulk of my product design experience comes from) involves a lot of problem solving and balancing constraints and tradeoffs.
A tool I have found useful in this process is the concept of a "North Star UI".
I have often mentioned this concept in discussions, and it seemed to be generally understood.
However, a [a quick google search](https://www.google.com/search?q=%22north+star+UI%22) revealed that outside of this blog,
there are only a couple mentions of the term across the entire web, and the only definition was a [callout in my Eigensolutions essay](../../eigensolutions#nsui).
That needed to be fixed!

## What is a North Star UI? { #definition }

**A *North Star UI* is the ideal UI for addressing a set of pain points and use cases in a perfect world with no practical constraints.**
It’s about answering the question: *If we had infinite resources, and implementation difficulty, performance, backwards compatibility, etc. did not matter, what solution would we ship?*.

As we will see, there are several benefits to finding that North Star UI, documenting it, and getting consensus around it.
You can even do usability testing (using wireframes or prototypes) to validate it.

But why would we spend precious resources on something that’s not feasible?

## Benefits of a North Star UI { #benefits }

### It simplifies problem solving

As the name implies, one of the primary benefits of a North Star UI is that it can serve as a guide to steer us in the right direction.
Even if we can’t get all the way there, maybe we can close enough that the remaining distance won’t matter.
And in the process, you may even find that the closer you get, the more feasible it becomes.

For many problems, it is obvious what the NSUI is, and the crux of the problem is weaving through the various practical constraints.
In other cases, even without practical constraints, it is not obvious what the solution would be.
The concept is useful in both cases, but even more so in the latter as it separates concerns, which can help break down a complex problem into more manageable components:

1. What is the ideal solution?
2. What prevents us from getting there?
3. What compromises can get us close?

Once we have a NSUI, we can use it to evaluate proposed solutions:
How do they relate to a future where the NSUI is implemented?
Are they a milestone along that path, a parallel path, or do they actively prevent us from implementing it?

### Collaboration benefits

A NSUI can be helpful in getting **team alignment**, which is *essential* when trying to decide what compromises to make.
How can we reach consensus on the right tradeoffs if we are not even aligned on what the solution would be if we *didn't* have to make any compromises?

Doing usability testing on a NSUI prototype can build **momentum** both within a team, and especially across teams.
This is assuming the testing revealed that the NSUI is indeed a good user experience; if not, then it’s not a NSUI (or there were flaws in the testing).
Having stakeholders sit through user testing sessions can work wonders for getting them on board, especially if they have previously been skeptical.

This can be especially useful for convincing engineers that a certain solution is worth the implementation cost.
Many engineers have never learned usability principles, or seen usability testing in action (it doesn't help that HCI courses in most CS curricula are elective).
Engineers are not automatons that will blindly implement whatever they are told to.
It is not enough to get them to reluctantly agree to implement something; helping them see the value can get them *excited*, which makes a world of difference.
**Engineering momentum can literally make the difference between what is *possible* and what is *not*.**

### Tomorrow’s constraints may be different

Last, I have often seen **"unimplementable" solutions become implementable** down the line, due to changes in internal or external factors, or simply because someone had a brilliant idea that made the impossible, possible.
In my 11 years of designing web technologies, I have seen this happen so many times, I now interpret "cannot be done" as "really hard — right now".

## Case studies

Below I discuss two distinctly different case studies from the last year, where the concept of a North Star UI was instrumental in getting us to a good solution, but through different paths in each.

### CSS Nesting Syntax

My favorite example, and something I’m proud to have personally helped drive is the current [CSS Nesting syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting), now [shipped in every browser](https://caniuse.com/css-nesting).
We had plenty of signal for what the optimal syntax was for users (North Star UI), but it had been vetoed by engineering across all major browsers due to prohibitive performance, so we had to design around certain parsing constraints.
The [original design](https://www.w3.org/TR/2021/WD-css-nesting-1-20210831/#nesting) was quite verbose, actively conflicted with the NSUI syntax, and had poor compatibility with another related feature (`@scope`).
Instead of completely diverging, I [proposed](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1272373216) a syntax that was a subset of our NSUI, just more explicit in some (common) cases.
[Originally discussed as *“Lea’s proposal”*](https://github.com/w3c/csswg-drafts/blob/2535b93ca241a1db5a29c47c5b22c5b1d0be2e71/css-nesting-1/proposals.md), it was later named "Non-letter start proposal" but became known as [Option 3](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/) from its position among the five options considered.
After some [intense weighing of tradeoffs](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md) and several user [polls](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md#twitter-polls) and [surveys](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/), the <abbr title="Working Group">WG</abbr> resolved to adopt that syntax.

Once we got consensus on that, I [started trying](https://github.com/w3c/csswg-drafts/issues/7961) to get people on board to explore ways (and brainstorm potential algorithms) to bridge the gap.
A few other WG members joined me, with my co-TAG member Peter Linss perhaps being most vocal.
We initially faced a lot of resistance from browser engineers, until eventually a couple Chrome engineers closed on a way to implement the north star syntax 🎉, and as they say, *the rest is history*.

It was not easy to get there, and required weighing *Evolution* as a factor.
There were diverging proposals that in some ways had better syntax than that intermediate milestone.
If we only looked at the next move, **if we had only used *Utility* and *Usability* to guide us, we would have made a suboptimal long-term decision.**

### State of HTML Sentiment Chips UI

This spun out as a separate [case study about this challenge](../case-study-sentiment-ui/).

In this case, it took until the usability study to get consensus that what I thought was a NSUI was indeed a NSUI.
But even if there were, engineering had all but vetoed it.
By prototyping it anyway, and demonstrating that it was indeed a superior user experience by testing it with actual users, I was able to get everyone on board.
If we had simply ruled it out as "not feasible", we would have ended up with a suboptimal solution.