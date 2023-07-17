---
title: "Help design the State of CSS Survey 2022!"
date: "2022-07-28"
categories:
  - "news"
tags:
  - "css"
  - "surveys"
  - "data-analysis"
  - "state-of-css"
---

Since 2019, the annual [State of CSS survey](https://stateofcss.com/en-us/) has collected feedback from web developers from across the world to try and take the pulse of the CSS ecosystem, and it's become a valuable resource not only for CSS developers, but also for browser vendors. This summer, one of my side projects is helping out with survey design and outreach for the [State of CSS survey](https://stateofcss.com/en-us/), thanks to a generous Google [UI fund](https://web.dev/ui-fund/) grant.

The target is for the survey to launch in mid September, and we are currently working on the outline. So far we have created a preliminary outline based on last year's survey and early research. All our work happens is in the open, in [this repo](https://github.com/Devographics/Surveys). Here are some of the [changes from last year's survey](https://github.com/Devographics/Surveys/issues/1):

- Removed the Pre-processors category as it feels like there isn't too much debate around that area.
- Got rid of "which browser do you primarily develop in?" question as we already ask which browsers people test in.
- Merged "Opinions" and "Environments" sections into new "Usage" section.
- Moved browsers question to "Other Tools".
- New features:
    - currentcolor
    - `color-mix()`
    - Wide gamut colors
    - `scroll-behavior`
    - `scroll-padding`
    - `font-palette`
    - `:focus-visible`
    - `:has()` pseudo-class
    - `:where()` pseudo-class
    - Cascade Layers
    - Houdini Paint API
    - and there are [several others we are considering](https://github.com/Devographics/Surveys/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

We are currently looking for feedback from the community, including suggesting CSS features to ask about, libraries and tools, or even new questions altogether.

There are also [some design issues](https://github.com/Devographics/Monorepo/issues/99) to flesh out, you're welcome to weigh in there too.

If you want to quickly vote on which features are most important for you to make it into the survey, you can do that either via GitHub 👍🏼reactions, or [here](https://projects.verou.me/mavoice/?repo=devographics/surveys&labels=State%20of%20CSS%202022) (which uses GitHub reactions behind the scenes). Do note that reactions are only one metric among many we will use to consider items.

The feedback period will be open until **August 20**, then we will start working on launching the survey.

Do note that **browser makers are looking at this** and similar surveys to prioritize what to implement. This is why Google is sponsoring this project. So any effort you put into survey outline feedback, and on responding to the survey when it's ready, could come back to you tenfold when your favorite CSS features get implemented faster!
