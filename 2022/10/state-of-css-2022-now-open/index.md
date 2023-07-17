---
title: "State of CSS 2022 now open!"
date: "2022-10-03"
categories:
  - "news"
tags:
  - "css"
  - "surveys"
  - "data-analysis"
  - "state-of-css"
---

[Take State of CSS 2022 survey](https://survey.devographics.com/survey/state-of-css/2022?source=leaverou)

A while ago I posted a [call for feedback to inform the design of the State of CSS 2022 survey](https://lea.verou.me/2022/07/help-design-the-state-of-css-survey-2022/). The response has been overwhelming and it was glorious. We got quite a lot of [proposals](https://github.com/Devographics/surveys/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc), [feedback](https://github.com/Devographics/surveys/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc), [votes](https://projects.verou.me/mavoice/?repo=devographics/surveys&labels=State%20of%20CSS%202022). But that also meant we had to make some tough decisions about what gets in the survey and what doesn’t, otherwise we'd end up with a survey so long nobody would want to finish it!

In the end we [added questions about 15 new CSS features based on proposals in that repo, and decided against adding 9](https://github.com/orgs/Devographics/projects/1/views/1). Overall, there are 30 new CSS features the 2022 survey asks about. To make space for all of that, we also [removed a few](https://github.com/Devographics/surveys/issues/37) that were not really shining much light into what developers do anymore, and also [a couple others that were not actually about CSS](https://github.com/Devographics/surveys/issues/11).

However, CSS features are not the only — or even the most important questions being asked.

Last year, some of the freeform questions about pain points were particularly useful to browser vendors for prioritizing implementation and standards work, and we expect this to be true this year as well. We put considerable effort into [redesigning these freeform questions to make them more intuitive](https://github.com/Devographics/surveys/issues/36), while maintaining their helpfulness for browser vendors:

![](images/image-3.png)

We hope the new wording makes it more clear that these are mutually exclusive, so that respondents do not feel they need to duplicate their answers.

One of the new questions I’m excited about is this question to gauge whether the respondent spends more time writing JS or CSS:

![](images/image-1.png)

A focus of this year's State of CSS survey is to reach a broader range of developers; a majority of respondents of past surveys has been JS developers who also write CSS, rather than developers that focus on CSS equally or even primarily. This is a natural consequence of this having been spun off the [State of JS survey](https://stateofjs.com/en-us/). To truly see what the _State of CSS_ is in 2022, we need input from all types of developers, as developers with different focus have different needs and priorities. This question will allow us to evaluate how well we have reached this goal, and going forward, whether we are improving every year.

Another thing I’m excited about in this year's survey is the ability to add freeform comments to _any_ question.

<figure>

![](images/comments.gif)
<figcaption>Adding freeform comments to a question</figcaption>

</figure>



It's often hard to tell what the background is behind each of the three answers: are people not using a given feature due to poor browser support, poor ergonomics, or some other reason? When people _do_ use a feature, was their experience good or bad? Would they use it again?

We [went back and forth](https://github.com/Devographics/surveys/issues/41) [many times](https://github.com/Devographics/Monorepo/issues/99) about having a more structured followup question there, but in the end settled on a simple freeform field for this first iteration. Maybe next year it will be more structured, depending on how people use it this year.

So, without further ado, the survey is finally open for responses:

[Take State of CSS 2022 survey](https://survey.devographics.com/survey/state-of-css/2022?source=leaverou)

This survey is not just for fun: **the results actually inform what browsers prioritize for implementation**. So by spending a few minutes on a thoughtful and comprehensive response, you can actually make both your and other developers' lives better! What are you waiting for?
