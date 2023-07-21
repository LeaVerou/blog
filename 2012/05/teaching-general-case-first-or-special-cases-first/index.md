---
title: "Teaching: General case first or special cases first?"
date: "2012-05-09"
tags:
  - "thoughts"
  - "teaching"
---

A common dilemma while teaching (I’m not only talking about teaching in a school or university; talks and workshops are also teaching), is whether it's better to first teach some easy special cases and then generalize, or first the general case and then present special cases as merely shortcuts.

I've been revisiting this dilemma recently, while preparing the slides for [my upcoming regular expressions talks](http://lea.verou.me/speaking/). For example: Regex quantifiers.

## 1\. General rule first, shortcuts after

You can use {m,n} to control how many times the preceding group can repeat (m = minimum, n = maximum). If you omit n (like {m,}) it’s implied to be infinity (="at least m times", with no upper bound).

- {m, m} can also be written as {m}
- {0,1} can also be written as ?
- {0,} can also be written as \*
- {1,} can also be written as +

### Advantages & disadvantages of this approach

- Harder to understand the general rule, so the student might lose interest before moving on to the shortcuts
- After understanding the general rule, all the shortcuts are then trivial.
- If they only remember one thing, it will be the general rule. That's good.

## 2\. Special cases first, general rule after

- You can add ? after a group to make it optional (it can appear, but it may also not).
- If you don't care about how many times something appears (if at all), you can use \*.
- If you want something to appear at least once, you can use +
- If you want something to be repeated exactly n times, you can use {n}
- If you want to set specific upper and lower bounds, you can use {m,n}. Omit the n for no upper bound.

### Advantages & disadvantages of this approach

- Easy to understand the simpler special cases, building up student interest
- More total effort required, as every shortcut seems like a separate new thing until you get to the general rule
- Special cases make it easier to understand the general rule when you get to it

## What usually happens

In most cases, educators seem to favor the second approach. In the example of regex quantifiers, pretty much every regex book or talk explains the shortcuts first and the general rule afterwards. In other disciplines, such as Mathematics, I think both approaches are used just as often.

What do you think? Which approach do you find easier to understand? Which approach do you usually employ while teaching?
