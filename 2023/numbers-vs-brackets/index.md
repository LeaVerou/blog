---
title: "Numbers or Brackets for numeric questions?"
date: 2023-08-03
social_posts:
tags:
  - survey-design
  - ux
  - "surveys"
  - "data-analysis"
  - "state-of-html"
---


As you may know, this summer I am leading the design of the inaugural [State of HTML](../design-state-of-html/) survey.
Naturally, I am also exploring ways to improve both survey UX, as well as all questions.

*Shaine Madala*, a data scientist working on the survey design team [proposed](https://github.com/Devographics/surveys/discussions/166#discussioncomment-6625819) using numerical inputs instead of brackets for the income question.
While [I was initially against it](https://github.com/Devographics/surveys/discussions/166#discussioncomment-6626156),
I decided to explore this a bit further, which changed my opinion.

<!-- more -->

There are actually four demographics questions in *State of X* surveys where the answer is essentially a number, yet we ask respondents to select a bracket:
age, years of experience, company size, and income.

The arguments for brackets are:
1. They are more privacy preserving for sensitive questions (e.g. people may feel more comfortable sharing an income bracket than their actual income)
2. They are more efficient to input (one click vs homing to keyboard and hitting several keystrokes).
3. In some cases respondents may not know the precise number offhand (e.g. company size)

The arguments for numerical input are:
1. Depending on the specifics, these can actually be faster to answer overall since they involve lower cognitive overhead (for known numbers).
2. The brackets are applied at the analysis stage, so they can be designed to provide a better overview of the dataset
3. More elaborate statistics can be computed (e.g. averages, medians, stdevs, the sky is the limit)

## Which one is faster?

We can actually calculate this!
Average reading speed for non-fiction is around 240 wpm (= 250ms/word)  [^1]
Therefore, we can approximate reading time for each question by multiplying number of brackets × average words per bracket (wpb) × 250ms.

However, this assumes the respondent reads all brackets from top to bottom, but this is a rare worst case scenario.
Usually they stop reading once they find the bracket that matches their answer, and they may even skip some brackets, performing a sort of manual binary search.
We should probably **halve these times** to get a more realistic estimate.

Average typing speed is 200 cpm [^2] (≈ 300ms/character).
This means we can approximate typing time for each question by multiplying the number of digits on average × 300ms.

[^1]: https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
[^2]: https://www.typingpal.com/en/blog/good-typing-speed

Let’s see how this works out for each question:

| Question | Brackets | WPB | Reading time | Avg Digits | Typing time |
| -------- | -------- | --- | ------------ | ------ | ----------- |
| Age      | 8 | 4 | 4s | 2 | 0.6s |
| Years of Experience | 6 | 4 | 3s | 2 | 0.6s |
| Company size | 9 | 4 | 4.5s | 3 | 0.9s |
| Income | 7 | 2 | 1.75s | 5 | 1.5s |

As you can see, despite our initial intuition that brackets are faster, the time it takes to read each bracketed question **vastly** outweighs typing time for all questions!

Of course, this is a simplification.
There are models in [HCI](https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction), such as [KLM](https://en.wikipedia.org/wiki/Keystroke-level_model) that can more accurately estimate the time it takes for certain UI flows.
For example, here are some of the variables we left out in our analysis:
- When answering a numerical question, most users need to home from mouse to keyboard, which takes time (estimated as 0.4s in KLM)
and then focus the input so they can write in it, which takes an additional click (estimated as 0.2s in KLM)
- When answering a bracketed question, users need to move the mouse to the correct bracket, which takes time (KLM estimates all pointing tasks as a flat 1.1s, but this can be more accurately estimated using [Fitts’ Law](https://en.wikipedia.org/wiki/Fitts%27s_law))

However, given the vast difference in times, I don't think a more accurate model would change the conclusion.

## `<input type=number>` all the things?

Efficiency is not the only consideration here.
Privacy is a big one. These surveys are anonoymous, but respondents are still often concerned about entering data they consider sensitive.
Also, for the efficiency argument to hold true, the numerical answer needs to be top of mind, which is not always the case.

I summarize my recommendations below.

### Age

This is a two digit number, that is always top of mind. **Number input.**

### Years of experience

This is a 1-2 digit number, and it is either top of mind, or very close to it. **Number input.**

### Company size

While most people know their rough company size, they very rarely would be able to provide an exact number without searching.
This is a good candidate for **brackets**.
However, the number of brackets should be reduced from the current 9 (does the difference between 2-5 and 6-10 employees really matter?),
and their labels should be copyedited for scannability.

We should also take existing data into account.
Looking at the [State of CSS 2022 results for this question](https://2022.stateofcss.com/en-US/demographics/#company_size),
it appears that about one third of respondents work at companies with 2-100 people,
so we should probably not combine these 5 brackets into one, like I was planning to propose.
101 to 1000 employees is also the existing bracket with the most responses (15.1%), so we could narrow it a little,
shifting some of its respondents to the previous bracket.

![Chart of responses for company size](images/company-size-results.png)

Taking all these factors into consideration,
I proposed the following brackets:

- Just me!
- Small (2 - 50)
- Medium (51 - 200)
- Large (200 - 1000)
- Very Large (1000+)

### Income

The question tht started it all!

This is a number that people know (or can approximate).
It is faster to type, but only marginally (1.75s vs 1.5s).
We can however reduce the keystrokes further (from 1.5s to 0.6s on average) by asking people to enter thousands.

The biggest concern here is **privacy**.
Would people be comfortable sharing a more precise number?
I wonder if we could mitigate this by explicitly instructing respondents to round it further, e.g. to the nearest multiple of 10.

Overall, something like this:

<blockquote>
<strong>What is your approximate yearly income (before taxes)?</strong><br>
<small>
Feel free to round to the nearest multiple of 10 if you are not comfortable sharing an exact number.
If it varies year to year, please enter an average.
</small>
<br>
<label>$<input type=number size=3>,000</label>
</blockquote>

## Conclusion

I’m sure there is a lot of prior art on the general dilemma on numerical inputs vs brackets,
but I wanted to do some analysis with the specifics of this case and outline an analytical framework for answering these kinds of dilemmas.

That said, if you know of any relevant prior art, please share it in the comments!
Same if you can spot any flaws in my analysis or recommendations.