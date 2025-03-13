---
draft: true
title: "What is a North Star UI and how can it help you ship?"
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

You may be familiar with this wonderful [illustration and accompanying
blog post by Henrik Kniberg](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp):

<img src="images/mvp.png" alt="Henrik Kniberg's MVP illustration">

It’s a very visual way to illustrate the age-old concept that
that a good MVP is not the one developed in isolation over months or years,
grounded on assumptions about user needs and goals,
but one that delivers value to users as early as possible,
so that future iterations can take advantage of the lessons learned from real users.

## The MVP as a range { #mvp-range }

While not quite what Henrik intended,
I love this metaphor so much, I have been using it to describe shipping goals when writing product specs.
I find they are understandable to anyone who has seen Henrik’s illustration,
and fit nicely into a [fixed time, variable scope](https://basecamp.com/shapeup/1.2-chapter-03#fixed-time-variable-scope) development process,
such as the [Shape Up methodology](https://basecamp.com/shapeup) that we use at Font Awesome.

1. 🛹 **The Skateboard (aka the Pessimist’s MVP):**
What is the absolute minimum we _can_ ship, if need be?
This is the most bare-bones set of features, without which we cannot ship at all.
It skews more utilitarian: it has the basic _functionality_ we need, but its UX is very rough, even embarrassing.
Anything that can be [flintstoned](https://stackingthebricks.com/the-fine-art-of-flintstoning/) is flintstoned.
This is meant to be less-than a traditional MVP.
2. 🛴 **The Scooter (aka the Realist’s MVP):**
It is the minimum set of features we want to ship that will still provide value and fulfill enough user needs across enough user segments to be worth it.
Its UX is more well thought out than the skateboard but anything nontrivial to implement is punted unless essential.
This is closer to a traditional MVP.
3. 🚲 **The Bicycle (aka the Optimist’s MVP):**
The wishlist or stretch goals.
If everything goes _really_ well, what else can we ship?
This may include UX improvements, "sprinkles of delight", and features that are nonessential but have high I/E ratios.
This is where we aspire to be, but we are not going to be heartbroken if we don’t get there.
4. 🏍️ **The motorcycle:**
These are improvements that are beyond even the optimistic MVP, but we want to get to sometime in the near future.
5. 🚗 **The car:**
Improvements that we can ship in the medium to longer term future.
6. 🏎️ **The race car (aka the North Star UI):**
This is the ideal product we would ship if we were not bound by ephemeral constraints like time, resources, performance considerations, or backwards compatibility.

The meat is the first three stages, since they directly affect what is being worked on.
The more we go down the list, the less fleshed out specs are, since we _know_ they will change once we have input to customers.

The most controversial of these is the last one: the race car, i.e. the North Star UI.
It is the very antithesis of the MVP.
The MVP describes what we can ship ASAP,
whereas the North Star describes the most idealized goal, one we may _never_ be able to ship.

It is easy to dismiss that as a waste of time, a purely academic exercise.
_“We’re all about shipping. Why would we spend time on something that’s not even feasible?”_ I hear you say.
However, in the rest of this essay I will argue that it is one of the most important milestones,
and fleshing it out pays dividends in the long run.

## More deliberate product design { #deliberate }

<figure>
TODO: Race car with arrows pointing to car, motorcycle, bike, scooter, skateboard.
</figure>

Whether you realize it or not, **the North Star is the only actual input into this process.**
Every other stage, the skateboard, the scooter, the bike, the motorcycle, the car, are all outputs.
They are all derived from the North Star, like peeling layers off an onion.
In fact in some contexts the process of breaking down a bigger shipping goal into milestones that can ship independently is literally called _layering_.

The process is so ingrained, so automatic, that most product designers don’t realize that they are doing it.
They go from race car to car, or even motorcycle so quickly they barely realize there was anything else there to begin with.
Thinking about the North Star feels like a guilty pleasure — who has time for this daydreaming?
We gotta ship, yesterday!

But the race car is **fundamental**.
Without it, there is no skateboard — you can’t reduce the unknown.
Without a solid North Star, your MVP is a confused jumble of design decisions and compromises, so tangled it becomes impossible to tell them apart.

To stick with the transportation metaphor,
a skateboard might be a good MVP if your ultimate vision is a race car,
but it would be a _terrible_ minimum viable ferry boat — you might want to try a wooden raft for that.

<figure>
TODO: first, the most basic raft possible. Then a simple sailboat, then a speedboat, then a yacht, and finally a ship.
</figure>


This North Star may (and likely, will) change down the line, informed by customer feedback.
That’s okay and par for the course.
We don’t need to wander aimlessly with no destination, to be able to course correct.

Perhaps counterintuitively, spending time fleshing out a North Star UI can actually help you ship.
Allow me to explain.

## Simplify problem solving { #problem-solving }

A common problem-solving strategy in every domain, is to break down a complex problem into smaller, more manageable components and solving them separately.
Product design is no different.
The concept of a North Star UI breaks down tough product design problems into three more manageable components:

1. **North Star UI (NSUI)**: What is the ideal solution?
2. **Ephemeral constraints**: What prevents us from getting there?
3. **Compromises**: How close can we reasonably get given these constraints?

In many simpler problems, their difficulty is concentrated in only one of these components, in which case this framework does not help much.
Where it really shines is the really tough product problems, where the first and third question are _both_ hard.
Far easier to answer them separately than trying to answer both at once.

## Facilitate team alignment { #consensus }

<figure>
TODO: Two people arguing.
One has a speech bubble with a skateboard, the other a speech bubble with a wooden raft.
The first also has a thought bubble with a car, the second a thought bubble with a ship.
</figure>

When the North Star UI is not clearly articulated, it doesn't mean it doesn’t exist.
It just means that **everyone is following a different North Star.**

Since MVPs are products of the North Star, this will manifest as difficulty reaching consensus at every step of the way.

Debating at a different level of abstraction than what produced the original disconnect is generally a recipe for nonterminating divergence.
It pays off to zoom out and resolve the root cause separately,
rather than waste time and energy debating its byproducts one after another,
like fighting off a [Lernaean Hydra](https://en.wikipedia.org/wiki/Lernaean_Hydra) one head at a time.

Having the space to flesh out the North Star UI separately not only eliminates future disagreements before they happen,
it also strips away a lot of noise.

Often, what is fundamentally a North Star disagreement will masquerade as a disagreement about practical constraints.
It feels easier to cite practical constraints than to debate the merits of an idea directly.
Fleshing out the North Star UI separately eliminates this deflection at the root.
Here is a story that may sound familiar:
Alice has designed an [eigensolution](../../2023/eigensolutions/), — an elegant solution that addresses several user pain points at once.
She is aware it would be a little tricky to implement, but she thinks the tremendous improvement in user experience is worth it and she can layer it in such a way that it can ship incrementally.
When she presents her idea to the product team, Bob dismisses it as _"this is way too much work, it’s not worth doing"_.
However, what he is _actually_ thinking is _"this is a bad idea and any amount of work towards it is a waste"_.
Instead of spending time figuring out whether Alice’s concept is a good idea,
they spend their time discussing how much work it is and whether it could be reduced.
As a result, they fail to reach consensus because the amount of work was not the core issue.

It is important to answer the questions above in order, and reach consensus on what the North Star UI is before moving on to the compromises.
This way, we are aware of what is an actual design decision and what is a compromise driven by practical constraints.
Articulating these separately, allows us to debate them separately.
It is very hard to evaluate tradeoffs collaboratively if you are not on the same page about what we are trading off and how much it’s worth.
You need to know _both_ the cost _and_ the benefit to do a cost-benefit analysis.

## North Star UIs can improve MVPs via user testing

Conventional wisdom is that we strip down the North Star to an MVP, ship that, and then iterate based on input from real users.
But did you know you can actually get input from real users without writing a single line of code?

![alt text](images/user-test-wireframe.png)

While common knowledge among usability folks, this seems unheard of in product management circles.
You don't need to wait until an implemented MVP to do user testing.
You can do user testing as early as a low-fi paper prototype, with the user telling you where they would click or tap and the facilitator mocking the response.
This allows you to user test your North Star UI directly and adjust your MVP accordingly without having to wait for a whole deployment cycle.

Obviously, this works better for some types of products than others (it is notably hard to mock rich interactions or UIs with too many possible responses), but it is a powerful tool to have in your arsenal.
It can be particularly useful useful when there are vastly different perspectives within a team about what the North Star UI is, or when the problem is so novel that every potential solution is on shaky ground.
Even the best product intuition can be wrong, and there is no point in evaluating compromises if it turns out that even the "perfect" solution is not actually a good one.


<!--

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


-->


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

## Conclusion

Hopefully by now you’re convinced that it is worthwhile to begin product problems by fleshing out the North Star.
If not, here’s a recap of the benefits:

1. Simplifies problem solving, by breaking down hard product problems into more manageable components.
2. Facilitates team alignment and helps build consensus.
3. Makes our design process more resilient and adaptable.
4. Paves the way for getting there (someday).

What do you think? Pointless thought experiment or valuable tool?
Do you spend the time to flesh out and document North Star UIs in your team?
