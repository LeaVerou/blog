---
draft: true
title: A framework for User-Centered Decision-making
date: 2024-01-02
---

I was recently asked to describe the guiding principles I would use to weigh three different solutions to a specific user pain point,
with an emphasis on the user/customer.
There are typically other factors to consider, such as engineering effort, business goals, etc.,
but these were out of scope in that particular case.

Since most prioritization frameworks include a user-centered / impact component, the framework discussed here can complement them nicely, by simply replacing some of the factors with its outcome.
For example, if using [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/), you can use this framework to calculate R×I,
then proceed to multiply by C/E as usual.

## The Three Pilars: Utility, Usability, Evolution

1. **Utility** (aka *Impact*):
How many use cases and user pain points does it address, how well, and how prominent are they?
2. **Usability**: How easy is it to use?
Evaluating usability at the idea stage is tricky, as overall usability will vary depending on how each idea is implemented, and there is often a lot of wiggle room within the same idea. At this stage, we are *only* concerned with aspects of usability inherent in the idea itself.
3. **Evolution** (aka *Bigger Picture*):
How does it relate to features that we have shipped in the past and features we may ship in the future?
Being mindful of this prevents feature creep and ensures the mental models exposed via the UI remain coherent.

<aside>

Nielsen groups Utility and Usability under a single term: [*Usefulness*](https://www.nngroup.com/articles/usability-101-introduction-to-usability/).

</aside>

Now let’s discuss each factor in more detail, including subcategories and specific questions to help us assess it.

## Utility

Utility is a measure of how much value a feature brings to users.
It can be further broken down to:

- [**Increasing the ceiling**](../eigensolutions/#floor-ceiling): What becomes *possible*? Does it enable any use cases for which there is no workaround?
- [**Reducing the floor**](../eigensolutions/#floor-ceiling): What becomes *easier*? Does it provide a better way to do something for which there is already a workaround? How big is the delta?
- [**Widening the walls**](https://mres.medium.com/designing-for-wide-walls-323bdb4e7277): Does it serve an ignored audience or market? Does it broaden the set of use cases served by the product?
- **Use Case Significance**: How *important* are the use cases addressed?

While this applies more broadly, it is particularly relevant and top priority for [creative tools](https://lea.verou.me/blog/2023/eigensolutions/).

In evaluating the overall Utility of an idea, it can often be helpful to list *primary* and *secondary* use cases separately,
and evaluate significance for them separately.

### Primary & Secondary use cases { #primary-secondary-use-cases }

*Primary use cases* (in relation to a solution) are those for which a solution is optimal (or close), and have often been the driving use cases behind its design.
This is to contrast with *secondary use cases*, for which a solution is a workaround (involving varying levels of friction).

We may occasionally decide to ship a feature with a low number of primary use cases, simply because it has a high number of secondary use cases.
In other words, a feature that may not the best solution for much, but it's an excellent low-friction workaround for many use cases, buying us time to work on better solutions for them.
In these cases, [Evolution](#evolution) is even more important: later on, when we have addressed all these use cases head-on,
we don’t want to be stuck with a feature that now serves no purpose.

### Use Case Significance

This is a rough measure of how *important* the features addressed are.
Some ways to reason about it may be:

* **Frequency**: How commonly do these use cases come up?
* **Criticality**: How much do they matter to users? Are they a nice-to-have or a dealbreaker?
* **Vision**: How do the use cases relate to the software’s high level goals?

<div class=note>

*Vision* may at first seem more related to the business than the user. However, when software design loses sight of its vision by trying to cater to too many unrelated use cases, the result can be a confusing, cluttered user experience that doesn’t cater to any of them well.

</div>

## Usability

There are many ways to break usability down into independent, quantifiable dimensions.
I tend to go with a tweaked version of the one I first learned at [MIT’s UI Design & Implementation](http://web.mit.edu/6.813/) course I took in 2016 *(and then [taught](http://web.mit.edu/6.813/www/sp18/general/#course_staff) in 2018 and [replaced](https://designftw.mit.edu/) in 2020 😅)*,
bringing it one step closer to the original [Nielsen](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) dimensions by re-adding Satisfaction:

1. **Learnability**: How easy is it for users to understand?
2. **Efficiency**: Once learned, is it fast to use?
3. **Safety** (aka *Errors*): Are errors few and recoverable?
4. **Satisfaction**: How pleasant is it to use?

Some examples of usability considerations and how they relate to these dimensions:

<dl>
<dt>

**Learnability**
</dt>
<dd>

* **Compatibility**: Does it re-use existing concepts or introduce new ones?
* **Internal Consistency**: How consistent is it with the way the rest of the product works?
* **External Consistency**: How consistent is it with the environment (other products, related domains, etc.)?
* **Memorability**: When users return to the design after a period of not using it, how easily can they reestablish proficiency?
</dd>
<dt>

**Efficiency**
</dt>
<dd>

* **Speed**: How many steps does it take to accomplish a task and how long does each step take?
* **Cognitive Load**: How much mental effort does it require?
* **Physical Load**: How much physical effort does it require?
</dd>
<dt>

**Safety**
</dt>
<dd>

* **Error-proneness**: How hard is it for users to make mistakes?
* **Error severity**: How severe are the consequences of mistakes?
* **Recoverability**: How easy is it to recover from mistakes?
</dd>
<dt>

**Satisfaction**
</dt>
<dd>

* **Aesthetics**: How visually pleasing is it?
* **Ergonomics**: How comfortable is it to use?
* **Enjoyment**: How fun is it to use?
</dd>
</dl>

Different usability breakdowns generally converge to similar components, altough they may disagree on which of these are top-level, or may consider some out of scope.
For example [Nielsen](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) uses a narrower definition of Learnability, and considers *Memorability* a separate component, whereas in our courses we consider a boroader view of Learnability that includes Memorabilty as well.

*Satisfaction* is also a bit of an oddball.
First, it has limited applicability to certain types of UIs, e.g. non-interactive text-based UIs (programming languages, APIs, etc.).
Even where it applies, it can be harder to quantify.
But most importantly for this, it's primarily useful when evaluating the usability of an existing design, not when deciding between ideas,
where there is rarely enough signal to gauge satisfaction.
Therefore, for the purposes of User-Centered Decision-making, it’s fine to leave it out.

Each idea will rarely have universally worse or better usability than another.
More commonly, it will be better in some dimensions and worse in others.
To evaluate these tradeoffs, we need to understand the user and the situation (the use case and the conditions around it).

### The user

As a general rule of thumb, novices need learnability whereas for experts other dimensions of usability are more important.
But who is novice and who is expert?
At the extreme end of this are cases where the user has to go through lengthy training before they can use the software, such as pilots using airplane coockpits.
For one, there are two different types of skill.
There is **domain expertise**; a professional accountant has different needs from tax software than a regular taxpayer doing their taxes once a year.
There is **application expertise**; for example learnability should the top priority for an oboarding UI whereas an advanced customization feature can be tucked away to reduce clutter.
But even these are not uniform. A power user for a given appication may still be a novice when it comes to some of its features.
*(Food for thought: Would they be a novice or an expert when trying out a new application in the same domain?)*

This distinction can apply to the **product as a whole** (see tax software example above), **individual product areas** (see onboarding example above), or even more granularly to different parts of the same functionality.

<div class=note>

That said, there is often an opportunity for **disruption** here, by taking a product that has the potential to bring value to many but currently requires lengthy training, and creating one that requires little to none.
Creator tools are prime candidates for this, with no-code/low-code tools being a flagship example right now.
However, almost every technology we use on a daily basis went through this kind of democratization at some point: computers, cameras, photo editing, video production, etc.

</div>

### The situation

The more **repetitive or common the task**, the higher the importance of efficiency.
For example text entry is an area where efficiency needs to be optimized down to individual keystrokes or minute pointing movements.
On the other end of the spectrum, for highly **infrequent tasks** where users don't have time to develop transferable knolwedge across uses, learnability tends to be top priority.
Last, Safety tends to be higher priority **when there is a lot at stake**: missile launches, airplane navigation, healthcare software on a macro scale, or provacy, data integrity, finances on a micro scale.

There is granularity here as well.
For example, a visa application is used infrequently enough that learnability matters far more than efficiency for the product in general.
However, if it includes a question where it expects the user to enter their last 20 international trips, efficiency for trip entry is important.

Sometimes, two factors may genuinely be equally important.
Consider a stock trading program used on a daily basis by expert traders. Lost seconds translate to lost dollars, but mistakes also translate to lost dollars.
Is Efficiency or Safety more important?

Note that there are also interplays between different dimensions: the more effort a task involves (efficiency), the more high stakes a mistake is perceived to be (safety).
You have likely experienced this: making a mistake that makes you lose your answers in a form feels *a lot* more frustrating when you had spent 10 minutes filling it out rather than 10 seconds.

## Evolution

This can also be broken down into two subcategories:
- **Past & Present**: How does this relate to features we have already shipped?
- **Future**: How does this relate to features we may ship in the future?

The former overlaps a bit with Learnability (Internal Consistency), so the meat of this factor is the latter: the future.

When evaluating compatibility with potential future evolution, it’s important to not hold back.
Ten years down the line, today’s implementation constraints, technology limitations, or resource limits may not be issues anymore.
What *might* we ship if we had near-infinite resources and no constraints?
How does this feature relate to it?
Does this feature have a place in that future, or is it entirely unnecessary?
Or, worse, does it actively conflict with it?

There are many valid ways a feature could connect to the product’s past, present, and future.
For example:
* **Level of abstraction** (See [Layering](../eigensolutions#layering)):
  * Is it a shortcut to a present or future lower level primitive?
  * Is it a lower level primitive that explains existing functionality?
* **Power**: Is it a less powerful version of a future feature?
* **Granularity**: Is it a less granular version of a future feature?
* **North star UI**: If we have a [north star UI](../eigensolutions#nsui), is it compatible with it, or does it actively diverge?

## Overall

While all three are very important, they are not *equally* important.
In broad strokes, usually:

* [**Utility > Usability**](https://elezea.com/2016/01/utility-is-more-important-than-usability/):
If a product does not provide value, *people leave*, even if it provides a fantastic user experience for the few and/or niche use cases it actually serves.
* **Usability > Evolution**, since the latter is a long-term / more speculative concern, whereas the former a more immediate / higher confidence one.

I would suggest 3:2:1 ratio between Utility, Usability, and Evolution as a starting point,
tweaking depending on the product and its environment. For example:
- **Competition**: If a product is competing in a space where use cases are already covered very well, by products with poor usability, usability becomes more important.
In fact, many successful products were actually usability innovations: The Web, Dropbox, the iPhone, Zoom, and many others.
- **Ease of changes**: [Change is always hard](https://www.intercom.com/blog/navigating-the-complexity-of-change-aversion/).
However, for some products, it‘s a lot harder, making a solid evolution path more important.
Web technologies are an extreme example: it is almost impossible to remove or change anything, ever, as there are billions of uses in the wild, no way to migrate them, and no control over them.
- **Complexity**: Similarly, the more complexity increases, the more important it becomes to keep further increase at bay, so Evolution becomes more important

It is also important to be cognizant of the interplays between these various factors:
- *Evolution* affects *Usability*: Features that fit poorly into the product’s past and future eventually create usability issues.
However, but treating it as a separate factor helps us catch these issues much earler.
- *Utility* and *Usability* can often be at odds: the more powerful a feature is, the more challenging it is to make it usable.
But they can also be synergetic: often improving usability is *exactly* what the user needs!