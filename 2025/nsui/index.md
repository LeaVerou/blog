---
draft: true
title: "What is a North Star UI and how can it help product design?"
toc: true
tags:
  - product
  - product-design
  - product-management
  - user-centered-design
  - product-led-growth
  - north-star-ui
  - collaboration
  - case-studies
---

_“Oh we can’t possibly do that, it would be *way* too much work to implement!”_

Raise your hand if you’ve ever heard (or worse, _said_) this during a product design brainstorming session.
In my experience, **this argument is where a lot of good product design goes to die**.

No, I’m not suggesting you should drain engineering resources chasing the perfect UI!
Yes, in the end it will all boil down to Impact/Effort [^rice].
But bringing ephemeral constraints such as implementation difficulty up too early is counterproductive.

[^rice]: More elaborate prioritization schemes such as [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) are merely about breaking down either the Impact or the Effort or both into more granular components or introducing uncertainty into the equation.
But ultimately, it’s all about the Impact/Effort ratio.

By _ephemeral_ I’m referring to constraints that are not intrinsic to the problem at hand (these are _requirements_!),
but those that have to do with the current state of technology, the team, the company, or the broader environment.

For example, _"This interaction will be very common and needs to be as frictionless and efficient as possible"_ is a requirement, as it is intrinsic to the use case.
Ephemeral constraints are things like:
- Engineering resources
- Performance
- Technical feasibility (to some extent)
- Backwards compatibility

A tool I keep coming back to is what I call a _"North Star UI"_ .
<dfn>**A *North Star UI* is the ideal UI for addressing a set of pain points and use cases in a perfect world with no ephemeral constraints.**</dfn>
It answers the question *“What would we ship if both we and our users had infinite resources, and all our users were new?”*.

I have often mentioned this concept in discussions, and it seemed to be generally understood.
However, [a quick google search](https://www.google.com/search?q=%22north+star+UI%22) revealed that outside of this blog,
there are only a couple mentions of the term across the entire Web, and the only actual definition seems to be a [callout in my Eigensolutions essay](../../eigensolutions#nsui).
That needed to be fixed — if I’ve found this concept so useful, it’s highly likely that others would too!

For the uninitiated, designing a solution that ignores essential constraints seems like a pointless academic exercise.
_“Why would we spend precious resources on something that’s not feasible?
We should be pragmatic, not chase pipe dreams!”_ I often hear.
And yet, perhaps counterintuitively, a solid NSUI can provide so many benefits that over time it actually _reduces_ the amount of resources spent on product design.

What benefits?
Let’s dive in.

## 1. Simplifies problem solving { #problem-solving }

A common problem-solving strategy in every domain, is to break down a complex problem into smaller, more manageable components and solving them separately.
Product design is no different.
The concept of a North Star UI breaks down product design tasks into three more manageable components:

1. **North Star UI (NSUI)**: What is the ideal solution?
2. **Ephemeral constraints**: What prevents us from getting there?
3. **Compromises**: How close can we reasonably get given the timeframe we have?

These subproblems do not always have the same level of difficulty.
Sometimes the NSUI is obvious, and the big product design challenge is navigating the compromises.
Other times, the big challenge is figuring out what the NSUI should be and once this is clear, it turns out it’s also perfectly feasible.
And most of the time, both are hard, so solving them separately can be a huge help.


## 2. Facilitates team alignment and helps build consensus { #consensus }

This is a pattern I’ve seen very frequently, across many different teams:
disagreements about the NSUI will often masquerade as disagreements about practical constraints,
so people will waste time and energy debating the wrong issue.

Here is a story that may sound familiar:
Bob will say "X is way too much work, it’s not worth doing",
but what are they actually thinking is "X is a bad idea, so any nontrivial amount of work towards it is a waste",
while Alice thinks that X is an elegant solution that would create an incredible user experience, and is worth a somewhat higher implementation cost.
Instead of spending time figuring out whether X is a good idea in itself,
they spend their time debating how much work it is and how that could be simplified,
but fail to reach consensus because that is not actually the root issue.
_(Any similarity to real persons, living or dead, is purely coincidental.)_ 😅

The thing is, **when the NSUI is not documented, it still exists, but everyone has their own version.**
It is important to answer these questions in order, and reach consensus on what the North Star UI is before moving on.
**We need to be _aware_ of what is an actual design decision and what is a compromise driven by practical constraints.**

By articulating these separately, they can also be debated separately,
so that when we are at the stage of evaluating compromises, we are all on the same page about what we are trading off and how much it’s worth.
How can you do a cost-benefit analysis, without knowing _both_ the cost _and_ the benefit?

**NSUIs can even be user tested**, using wireframes or prototypes, which can be particularly useful when there are vastly different perspectives within a team about what the NSUI is, or when the problem is so novel that every potential solution is on shaky ground.
Even the best product intuition can be wrong, and there is **no point in evaluating compromises if it turns out that even the "perfect" solution is not actually a good one.**

## 3. Paves the way for getting there (someday) { #evolution }

Just like the mythical North Star, a NSUI can serve as a guide to steer us in the right direction.
**Simply articulating what the NSUI is can in itself make it more feasible.**
No, it’s not magic, just human psychology.

First, once we have a NSUI, we can use it to evaluate proposed solutions:
How do they relate to a future where the NSUI is implemented?
Are they a milestone along that path, or do they actively prevent us from ever getting there?

Prioritizing solutions that are milestones that get us closer to the NSUI can be a powerful tool in building momentum.
Once we're partway there, it naturally begs the question: how much closer can we get?
**it is _much_ easier to convince people to move a little further along on the path they are already on, than to move to a completely different path.**
Even if we can’t get all the way there, maybe we can close enough that the remaining distance won’t matter.
And often, the closer you get, the more feasible it becomes.
In some cases, **simply reframing the NSUI as a sequence of milestones rather than a binary goal can be all that is needed to make it feasible.** (perhaps I should call this )

<aside>

For an example of this, check out the [CSS Nesting case study](#css-nesting) below.
</aside>

## 4. Today's constraints are not tomorrow's constraints { #adaptability }

NSUIs make our design process more resilient and adaptable.
I have often seen **"unimplementable" solutions become implementable** down the line, due to changes in internal or external factors, or simply because someone had a brilliant idea that made the impossible, possible.
I have seen this happen so many times that I have learned to interpret _"cannot be done"_ as _"really hard — right now"_.

When this happens, it’s important to have a solid foundation to fall back on, rather than having to go back to the drawing board because design and constraints were so intertwined we didn’t know where our actual design choices ended and the practical compromises began.
With a solid NSUI in place, when constraints are lifted we only need to re-evaluate the compromises.


### Change in Engineering Momentum: Sentiment Chips { #sentiment-chips }

Here is a little secret that applies to nearly all software engineers:
**neither feasibility nor effort are fixed for a given task.**

Engineers are not automatons that will blindly implement whatever they are told to.
Product managers are often content to get engineering to reluctantly agree to implement, but then you’re getting very poor ROI out of your engineering team.

**Often all that is needed to make the infeasible, feasible is engineering momentum.**
Investing the extra time and energy to get engineers *excited* can really pay off.
**When good engineers are excited, they become miracle workers.**
The difference is not small, it is orders of magnitude.
Things that were impossible or insurmountable become feasible, and things that would normally take weeks or even months can be prototyped in days.

One way to get engineers excited is to convince them about the value and utility of what they are building.
It helps a lot to have them [observe usability testing sessions](../context-chips/) and to be able to back product decisions up with data.

As I [discovered last year by accident](../context-chips/), there is also another, more …Machiavellian way to build engineering momentum:
The NSUI is too hard? Propose a much easier solution that you know engineers would hate,
such as one that turns a structured interaction into unstructured data.
As much as I wish I could be _that_ strategic 😅, this was not something I had planned in advance, but it was very effective in retrospect: I got an entire backend to work with that I had thought was entirely out of the question!

### Change in the Environment: CSS Conic Gradients { #conic-gradients }

<figure class="float" id="hue-wheel">
<style>
#hue-wheel {
	width: min-content;
	flex-flow: column;
	pre {
		width: auto;
		font-size: 75%;
	}
}
</style>
<div style="
  width: min(300px, 50vmin); aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(in hsl, red, orange, yellow, lime, cyan, blue, magenta, red);"></div>

```css
background: conic-gradient(in hsl,
	red, orange, yellow, lime,
	cyan, blue, magenta, red);
```
<figcaption>
Conical gradients are often used to render hue wheels.
</figcaption>
</figure>

Sometimes, the environment changes and a previously infeasible or high effort feature becomes feasible or even trivial.
An example that comes to mind is [CSS conic gradients](/specs/#conical-gradients).
Conic gradients are the type of gradient that is created by (conceptually) rotating a ray around a center point.

I originally proposed adding conic gradients to CSS in 2011, and they first shipped in 2018 (in Chrome 69)!
Someone observing this timeline without context may just conclude "pffft, standards just take _forever_ to ship".
But there is *always* a reason, either technical, human, or both.
In this case, the reason was technical.
Browsers do not implement things like shadows and gradients from scratch, they use graphics libraries such as [Skia](https://skia.org/), [Cairo](https://www.cairographics.org/), or [Core Graphics](https://developer.apple.com/documentation/coregraphics), which in turn are also abstractions over the OS-provided graphics APIs.

At the time these libraries did not support any primitive that could be used to render conic gradients (e.g. sweep gradients, mesh gradients, etc.).
In the years that followed, one after the other added support for some kind of gradient primitive that could be used to easily render conic gradients, which took the proposal from high to low effort.
I also created a [polyfill](../../2015/06/conical-gradients-today/) which stimulated developer demand, increasing Impact.
These two things together took the Impact/Effort ratio from "not worth it" to "let’s do this, stat" and in 2 years the feature was implemented in every major browser.

### Someone has a Lightbulb Moment: Relaxed CSS Nesting Syntax { #css-nesting }

Sometimes high effort things just take a lot of hard work and there is no way around it.
Other times they are one good idea away.

One of my favorite examples, and something I’m proud to have [helped drive](/specs/#relaxed-css-nesting) is the [relaxed CSS Nesting syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting), now [shipped in every browser](https://caniuse.com/css-nesting).
It is such an amazing case study on the importance of having a North Star UI,
I even did [an entire talk about it at Web Unleashed](https://www.youtube.com/watch?v=hcEDJq7jfdY),
with a lot more technical details that I have included here.

In a nutshell, CSS nesting is a syntax that allowed CSS developers to reduce repetition and better organize their code by allowing them to nest rules inside other rules.

<figure id="css-nesting-example" class="float">
<style>
#css-nesting-example {
	pre {
		font-size: 50%;
		font-weight: 600;
		width: auto;
	}
}
</style>

```css
table.browser-support {
	border-collapse: collapse;
}
table.browser-support th,
table.browser-support td {
	border: 1px solid silver;
}
@media (width < 600px) {
	table.browser-support,
	table.browser-support tr,
	table.browser-support th,
	table.browser-support td {
		display: block;
	}
}
table.browser-support th {
	border: 0;
}
table.browser-support td {
	background: yellowgreen;
}
table.browser-support td:empty {
	background: red;
}
table.browser-support td > a {
	color: inherit;
}
```
```css
table.browser-support {
	border-collapse: collapse;

	@media (width < 600px) {
		&, tr, th, td {
			display: block;
		}
	}

	th, td {
		border: 1px solid silver;
	}
	th {
		border: 0;
	}
	td {
		background: yellowgreen;

		&:empty {
			background: red;
		}

		> a {
			color: inherit;
		}
	}
}
```

<figcaption>
Example of CSS code, with (right) and without (left) nesting.
Which one is easier to read?
</figcaption>

</figure>

This is one of the few cases where the NSUI was well known in advance,
since the syntax was well established in developer tooling (CSS preprocessors).
Instead, the big challenge was navigating the practical constraints,
since CSS implemented in browsers has different performance characteristics,
so a syntax that is easily feasible for a preprocessor may be out of reach for a browser.
In this case, the NSUI syntax had been ruled out by browser engineers due to prohibitive parsing performance [^1],
so we had to design a different, more explicit syntax that could be parsed more efficiently.

[^1]: for any Compilers geeks out there that want all the deets: it required potentially unbounded lookahead since there is no fixed number of tokens a parser can read and be able to tell the difference between a selector and a declaration.

[Initial attempts](https://www.w3.org/TR/2021/WD-css-nesting-1-20210831/#nesting) for a syntax that satisfied these requirements introduced a lot of noise,
in the form of an awkward, noisy `@nest` token that needed to be placed in the beginning of many nested rules.

At this point, it is important to note that CSS Nesting is a feature that once available,
it is used all over a stylesheet, not just a couple times here and there.
For such widely used features, every character counts.
Conciseness and readability of syntax are paramount,
especially when conciseness is the sole purpose of this feature in the first place!

Worse yet, these attempts were actively incompatible with the NSUI syntax, as well as other parts of CSS (namely, the `@scope` rule).
This meant that even if the NSUI became feasible later,
CSS would need to forever support syntax that would then have no purpose,
it would exist just as a wart from the past, just like HTML doctypes.

This proposal sat dormant for a while, since implementors were not exactly in a hurry to ship it.
This all changed when [State of CSS 2022](https://2022.stateofcss.com/en-US/usage/#missing_features_freeform) showed Nesting as the top missing CSS feature, making Google suddenly very keen to ship it.

A small subset of the CSS Working Group, led by Elika Etemad and yours truly organized a number of breakouts to explore alternatives,
an effort that produced not one, not two, but four competing proposals.
The one that the group voted to adopt [^option3] was the one I [designed](https://github.com/w3c/csswg-drafts/issues/7834#issuecomment-1272373216) with the NSUI in mind, by asking the question:
**If the NSUI is out of the question _right now_, how close can we get and still be compatible with it in case it becomes feasible later on?**

[^option3]: Originally dubbed [*“Lea’s proposal”*](https://github.com/w3c/csswg-drafts/blob/2535b93ca241a1db5a29c47c5b22c5b1d0be2e71/css-nesting-1/proposals.md), and later ["Non-letter start proposal"](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md), but became known as [Option 3](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/) from its position among the five options considered (including the original syntax).

<aside>

This highlights the importance of taking into account the long-term **evolution** of a product in addition to the short-term **utility** and **usability** (although they are more important).
Some of the other proposals had slightly better ergonomics than that the intermediate milestone we went with, but were incompatible with the NSUI so they would have ruled it out.
*We took a bet: we sacrificed **a little bit of short-term usability**, to have a chance at **much better usability in the long term**.*
Sacrificing _a lot_ of short-term utility or usability for a better future evolution trajectory is _generally_ a bad idea, because you are risking being stuck with the poor intermediate solution, but can still be acceptable when you have very high confidence that you’ll get there, especially if that future is not very far.
</aside>

Once we got consensus on this intermediate syntax, I [started exploring whether we could get any closer to the NSUI](https://github.com/w3c/csswg-drafts/issues/7961), even attempting to propose an algorithm that would reduce the number of cases that required the slower parsing to essentially an edge case.
A few other WG members joined me, with my co-TAG member Peter Linss being most vocal.
**This is a big advantage of NSUI-compatible designs: it is _much_ easier to convince people to move a little further along on the path they are already on, than to move to a completely different path.**
With a bit of luck, you may even find yourself implementing an "infeasible" NSUI without even realizing it, one step at a time.

We initially faced a lot of resistance from browser engineers, until eventually [Anders Ruud](https://github.com/w3c/csswg-drafts/issues/7961#issuecomment-1489883575) and his team experimented with variations of my proposed algorithm and actually closed in on a way to implement the NSUI syntax in Chrome.
The rest, as they say, is history.
