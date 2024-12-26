---
draft: true
title: "Survey Design: Okay, but how does it _feel_?"
date: 2024-12-25
toc: true
tags:
  - product
  - product-design
  - design-thinking
  - case-study
  - ux
  - survey-design
---

One would think that we've more or less figured survey UI out by now.
Multiple choice questions, checkbox questions, matrix questions, dropdown questions, freeform textfields, numerical scales,
what more could one possibly need?

And yet, every time I led one of the [State Of ... surveys](https://devographics.com), and _especially_ the inaugural [State of HTML 2023 Survey](../../2023/state-of-html-2023/),
I kept hitting the same wall: how the established options for answering UIs were woefully inadequate for balancing good user experience with good insights for stakeholders.
Since the [State Of](https://www.devographics.com/) surveys used a custom survey app, in many cases I could convince the engineering team to implement a new answering UI, but not always.
After [joining Font Awesome](../awesome/), I somehow found myself leading [yet another survey](https://survey.awesome.me/?from=lv_blog), despite swearing never to do this again. 🥲
Alas, building a custom survey UI was simply not justifiable in this case; I had to make do with the existing options out there [^tally], so I was once again reminded of this exact pain.

[^tally]: I ended up going with [Tally](https://tally.so), mainly due to the flexibility of its conditional logic.

So what are these cases, and how could better answering UI help?
This case study is Part 1 of (what I’m hoping will be) a series around how survey UI innovations could help balance tradeoffs between user experience and data quality.

<!-- more -->

## The Problem

For context, the body of State Of surveys is a series of *"Feature"* questions:
questions that present the respondent with a certain web platform feature and ask if they had heard of it or used it.
Feature questions look like this:

<figure>

![alt text](images/feature.png)
<figcaption>
An example of a feature question from the State of CSS 2022 survey.
</figcaption>
</figure>

Respondents get a score in the end, based on how many of these they had heard of or used.
Each survey had dozens of these questions.
Based on initial estimates, State of HTML was going to have at least fifty.

Respondents *love* these questions.
They learn about new things they may not have heard of, and get to test their knowledge.
But also, from the survey designer’s perspective, they gamify a (very long) survey, increasing completion rates,
and provide users incentive to share their score on social media, spreading the word.

One would expect that they also provide valuable data, yet browser vendors had repeatedly mentioned that this data was largely useless to them.
Surveys were all about what people _felt_, not what they knew or had used — they had better ways to gauge those.
Instead, the reason they funneled thousands into funding these surveys every year was the 1-2 pain points questions towards the end.
That was it.
Survey data on experience and awareness _could_ be useful, but only if it was accompanied with subjective sentiment data:
if they hadn't used it or heard about it, Were they interested? If they had used it, how did it feel?

As an attempt to address this feedback, a button that opened a freeform comment field had been introduced the year prior, but response rates were abysmally low,
starting from **0.9%** for the first question [^1] and dropping further along the way.
This was no surprise to me: freeform questions have a dramatically lower response rate than structured questions,
and hidden controls get less interaction (*"out of sight, out of mind"*).
But even if they had a high response rate, freeform comments are notoriously hard to analyze, especially when they are so domain specific.

<figure>

<video src="videos/comments.mp4" loop muted loading="lazy" autoplay></video>
<figcaption>
Optional freeform comments had been added the year prior, but got an abysmally low response rate,
and being entirely freeform, were hard to analyze.
</figcaption>
</figure>

[^1]: Meaning out of the people who responded to that question about their experience with a feature, only 0.9% left a comment.

## Ideation

Essentially, the data we needed to collect was a combination of two variables: **experience** and **sentiment**.
Collecting data on two variables is common in survey design, and typically implemented as a matrix question.

<figure>

| 		| 🤷 | 👍 | 👎 |
|-------|----|----|----|
| Never heard of it | <input type=radio name=matrix> | <input type=radio name=matrix> | <input type=radio name=matrix> |
| Heard of it | <input type=radio name=matrix> | <input type=radio name=matrix> | <input type=radio name=matrix> |
| Used it  | <input type=radio name=matrix> | <input type=radio name=matrix> | <input type=radio name=matrix> |

<figcaption>
If user experience and cognitive load were not a concern, the same data could actually be collected with a matrix question.
</figcaption>
</figure>

Indeed, if there were only a couple such questions, a matrix could have been acceptable.
But …could you imagine filling out 50 of these?

However, an acceptable solution needed to add **minimal friction for end-users**:
there were at least 50 such questions, so any increase in friction would quickly add up — even one extra click was pushing it.
And we needed a sufficiently **high response rate** to have a good <abbr title="Confidence Interval">CI</span>.
But it also needed to facilitate **quantitative** data analysis.

Oh, and all of that should involve **minimal engineering effort**, as the engineering team was tiny and stretched thin.
Did I hear anyone say _overconstrained_? 😅

### Idea 1: Quick context

Initially, I took these constraints to heart.
Misguided as it may have been, the comment field and the infrastructure around it already existed, so I designed a UI that revealed relevant positive/negative sentiment options using contextual [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/).
These inserted predefined responses into the comment field with a single click.
Being a purely client-side interaction meant it could be implemented in a day, and it _still_ kept end-user friction to a minimum:
1 optional extra click to provide sentiment.
Quantitative data analysis was not optimally covered in theory, as entering freeform responses are notoriously hard to analyze.
However, based in the psychology of user behavior, I hypothesized that the vast majority of users would not edit these at all, a minority would append context, and an even tinier minority would actually edit the responses.
This meant we could analyze them via simple string matching and only lose a few false negatives.

<figure>
<video src="videos/quick-context.mp4" loop muted loading="lazy" autoplay></video>
<figcaption>
Mockup of the quick context idea.
</figcaption>
</figure>

I was very proud of myself: I had managed to design a solution that satisfied all constraints, a feat that initially seemed impossible!
Not to mention this design gently guided users towards using the comment field, which could motivate them to add even more context.

Yet, when I presented my mocks to the team, engineering _hated_ it with a passion.
The lead engineer found the idea of turning a structured interaction into unstructured data deeply unsettling.
So much it motivated him to implement a whole backend to store these followups properly, something I had initially thought was out of the question.

So now what?
I was once again reminded that product design should be a two stage process:
first you design the ["north star UI"](../../2023/eigensolutions/#nsui), and _then_ you apply any ephemeral constraints you are under.
By incorporating ephemeral constraints too early, one does not even know what the best solution is.
Often, constraints are negotiable or get lifted entirely, but **without a north star design, you cannot adapt: you’re either stuck with a subpar UI, or need to start all over** — which is what I did.

### Ideas 2 & 3: Followups and sentiment radios

This new backend came with a UI proposal which both me and the Google PM that was one of the survey’s main stakeholders had serious reservations about:
even *seeing* the followup UI required an extra click, so it was guaranteed to have a low response rate.
It would have been better than the 0.9% of the comment field (clicking is easier than typing!), but still pretty low (I would estimate < 15%).
And even when users were intrinsically motivated to leave feedback, two clicks and a popover was a steep price to pay.

<aside>

#### "Two clicks and a popover"

Perceived friction is not just about the number of clicks and keystrokes, but also about the number of *context switches*.
The bigger the UI shift, the more cognitive overhead it adds, as the action is *perceived* as more substantial, even when in terms of user interaction it involves exactly the same number of steps (using simplistic models like KLM).
This is the reason why it feels smoother to have a text field that expands when you click on it,
rather than a button that makes a text field appear:
an existing control changing form is perceived as a smaller UI shift than one control disappearing and another appearing.
</aside>

Another idea came from the Google PM: **sentiment radios**.
It was an attempt to simplify the interaction by framing it as a two step process:
first experience, then sentiment, through radio buttons that slid down once a main answer was selected.
However, I was very concerned that such a major UI shift after every single answer would quickly become overwhelming over the course of the survey.

<figure>
<img src="images/followups.gif" alt="">
<img src="images/sentiment-radios.png" alt="" style="flex: 1.38">

<figcaption>
Mockups of intermediate ideas.
Left: Followups (by lead engineer)
Right: Sentiment radios (by Google PM)
</figcaption>
</figure>

### Idea 4: Sentiment chips

Back to the drawing board, I asked myself: if I had infinite engineering resources, what UI would I design?
The biggest challenge was reducing friction.
All ideas so far had required at least one extra (optional) click to select sentiment.
Could we do better?
**What if users could select _both_ experience _and_ sentiment with a single click?**

Guided by this, I designed a UI where selecting sentiment is done via "sentiment chips" which are **actually part of the answer**,
so clicking them _also_ selects the answer they are accompanying, allowing users to express an answer across both variables with a single click, or just select the answer itself to express no sentiment.
To reduce visual clutter, these only faded in on hover.
Additionally, clicking on the selected chip a second time would deselect it, fixing a longstanding UX issue with radio buttons.

Over the course of designing this, I became so convinced it was the right solution, that I implemented a high fidelity prototype myself, complete with code that could be easily adapted to the infrastructure used by the survey app.

<figure>
	<video src="videos/feature-desktop.mp4" loop muted loading="lazy" autoplay style="flex: 2.75"></video>
	<video src="videos/feature-mobile.mp4" loop muted loading="lazy" autoplay></video>
<figcaption>

The sentiment chips prototype on desktop and mobile.
</figcaption>
</figure>

There were so many things I loved about this design, even beyond the core idea of answering both variables with a single click.
There were no layout shifts, the followups were in close proximity to the main answer, and the styling of the chips helped build a visual association to reduce friction even more as you go.
I was not a huge fan of the mobile version, but I couldn't think of a much better way to adapt this UI to mobile.

<figure>
<video src="videos/in-answer.mp4" loop muted loading="lazy" autoplay></video>
<figcaption>

Early alternative concept that supported followups.
This was deemed too complicated and was abandoned early on.
</figcaption>
</figure>

Reception of sentiment chips was not what I had hoped at first.
I had expected pushback due to the engineering effort needed, but folks also had other concerns:
that users would find things appearing on hover distracting and feel "ambushed",
that the UI was too "weird",
and that users would not discover the 1-click interaction and use it as a two-step process anyway.

#### Mini-feature questions

Around the same time I had a relevant realization: we don’t actually need to know *both* awareness and usage for all features.
For old, widely supported features, awareness doesn’t matter, because even when it’s low, it has plateaued.
And for features that are so new they have not yet been implemented in browsers, usage is largely meaningless.
If we don’t need all three options, experience can be expressed with a checkbox.
This insights plus sentiment chips would allow us to introduce a new question type that merges multiple feature questions in one!

<figure>
	<video src="videos/minifeature-desktop.mp4" loop muted loading="lazy" autoplay style="flex: 2.75"></video>
	<video src="videos/minifeature-mobile.mp4" loop muted loading="lazy" autoplay></video>
<figcaption>

The mini features prototype on desktop and mobile.
</figcaption>
</figure>

However, due to the way sentiment chips worked, this means it is not possible to select sentiment for features you have not checked (depending on context, checked could mean either used or heard):
once you click on a chip, it also *selects* the feature, as if you clicked on its label.
I guess it would be possible to click on a chip and then *uncheck* the feature, but that would be a very weird interaction.

### Idea 5: Existing 5-point question template

At this point, the eng lead dredged up a question template that had been used to ask about the respondent’s experience with various types of tooling.
Instead of separating experience and sentiment, it used a 5-point scale where each answer except the first answered *both* questions.

<figure>
<img src="images/5-point.png" alt="">

<figcaption>

The existing 5-point question template.
</figcaption>
</figure>

The eng lead was sold: zero engineering effort!
The Google PM was also sold: 100% response rate! (since it was **not possible to *avoid* expressing sentiment** for features you had heard or used).

I had serious reservations.
- There are arguments for even numbered [Likert scales](https://en.wikipedia.org/wiki/Likert_scale) (no neutral option), but these always involve scales of at least 4 points.
If you force people to select between two states, positive or negative, you’re simply going to get garbage data.
Neutral votes get pushed into positive votes, and the data around positive sentiment becomes useless.
- These did not allow users to express sentiment for features they had not heard of, despite these questions often including enough info for users to know whether they were interested.
- I was worried that increasing the number of upfront answers to 5 would increase cognitive overhead (and even scrolling distance!) too much.


## Usability testing to the rescue!

Despite the lead engineer being adamant that Idea 5 was too much work and being unconvinced about its merits, since I had built a prototype, we could user test it and see how it compares to the alternative: the 5-point question.

We ran a [within-subjects](https://www.nngroup.com/articles/between-within-subjects/) usability study
with 6 participants ([no, they are not too few](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/))
recruited via social media.
Half of the survey used the 5-point template, the other half sentiment chips.
To avoid order effects, we randomized the order of the two conditions.

### What worked well: Sentiment chips

I have ran many usability studies in the last ten years, and I have never seen results as resounding as this one.
In fact, after the 5th participant we unanimously agreed to switch to sentiment chips.

All of my concerns about the 5-point template were brought up by participants on their own accord:

- Participants *really* liked being able to express sentiment, and were vocal about their frustration when they could not express it (such as for features they had never heard of in the 5-point condition).
- Participants *really* disliked being forced into selecting a sentiment when they had no opinion.
- Some participants even mentioned it felt overwhelming to have to select among 5 options.

Furthermore, none of the team’s concerns about sentiment chips were validated:
- No one found the chips appearing on hover distracting or felt "ambushed"
- Everyone discovered the 1-click interaction pretty fast (within the first 2-3 questions).
But interestingly, they still *chose* to use it as a two-step process for some of the questions, to reduce cognitive load by breaking down the decision into two smaller ones.
The fact that this UI allowed users to make *their own* efficiency vs cognitive overhead tradeoffs was an advantage I had not even considered when designing it.
- Response rate was generally high — when people did not select sentiment, it was because they **genuinely** had no opinion.

### What worked okay: Mini-feature questions

Mini-feature questions did successfully help cut down response time per feature by 75%,
though this came at a price:
Once more, we saw that participants *really* wanted to express sentiment, and were frustrated when they couldn’t
and these questions did not allow them to express sentiment for features they had not used.
Regardless, we agreed that the benefits outweighed the costs.

### What did not work: Sentiment chips on mobile

A blind spot in our testing was that we did not test the UI on mobile.
Usability tests were conducted remotely via video call, so it was a lot easier to get participants to use their regular computers.
Additionally, stats for previous surveys showed that mobile use was a much smaller percentage than for the web in general (~25%), so we did not prioritize it.
That said, we should have at least done a couple sessions on mobile!

Once responses started coming in, we realized that participants had trouble understanding what the up and down arrows meant, since on mobile these are shown without labels until selected.
This would have been an easy fix had it had been caught early, e.g. thumbs up/down icons could have been used instead.

## Aftermath: Sentiment Chips in the Wild

In our usability testing, we had seen a high response rate for sentiment (% of question respondents who selected sentiment),
but that is no guarantee things will play out that way post-launch as well.
When participants know they are being watched they are always more willing to engage and pay a lot more attention,
no matter how much you emphasize that they should act naturally when briefing them.
That's not their failing; it's simply human nature.

Indeed, sentiment response rates in the wild were lower than in the usability study, but they were still very high: 38% on average (same median), ranging from 24% to 59%, which is plenty to draw conclusions.
While the expectation was that people would be more likely to express sentiment for features they had used or at least heard of,
this was not really the case:
participants expressed sentiment on 39% (median = 40%) of the features they had used, 37% of the features they had heard of, and 37% of the features they had not heard of.
