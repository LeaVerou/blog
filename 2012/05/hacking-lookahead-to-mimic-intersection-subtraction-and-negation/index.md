---
title: "Hacking lookahead to mimic intersection, subtraction and negation"
date: "2012-05-13"
categories:
  - "tips"
tags:
  - "regexp"
  - "regular-expressions"
---

_**Note:** To understand the following, I expect you to know how regex lookahead works. If you don’t, [read about it first](http://www.regular-expressions.info/lookaround.html) and return here after you’re done._

I was quite excited to discover this, but to my dismay, [Steven Levithan assured me](https://twitter.com/slevithan/status/201340048317227008) it’s actually well known. However, I felt it’s so useful and underdocumented (the only references to the technique I could find was several StackOverflow replies) that I decided to blog about it anyway.

If you’ve been using regular expressions for a while, you surely have stumbled on a variation of the following problems:

- **Intersection**: "I want to match something that matches pattern A AND pattern B" _Example: A password of at least 6 characters that contains at least one digit, at least one letter and at least one symbol_
- **Subtraction**: "I want to match something that matches pattern A but NOT pattern B" _Example:_ _Match any integer that is not divisible by 50_
- **Negation**: "I want to match anything that does NOT match pattern A" _Example: Match anything that does NOT contain the string "foo"_

Even though in ECMAScript we can use the caret (^) to negate a character class, we cannot negate anything else. Furthermore, even though we have the pipe character to mean OR, we have nothing that means AND. And of course, we have nothing that means "except" (subtraction). All these are fairly easy to do for single characters, through character classes, but not for entire sequences.

However, we can mimic all three operations by taking advantage of the fact that lookahead is zero length and therefore does not advance the matching position. We can just keep on matching to our heart’s content after it, and it will be matched against the same substring, since the lookahead itself consumed no characters. For a simple example, the regex `/^(?!cat)\w{3}$/` will match any 3 letter word that is NOT "cat". This was a very simple example of **subtraction**. Similarly, the solution to the subtraction problem above would look like `/^(?!\d+[50]0)\d+$/`.

For **intersection** (AND), we can just chain multiple positive lookaheads, and put the last pattern as the one that actually captures (if everything is within a lookahead, you’ll still get the same boolean result, but not the right matches). For example, the solution to the password problem above would look like `/^(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{6,}$/i`. Note that if you want to support IE8, you have to take [this bug](http://blog.stevenlevithan.com/archives/regex-lookahead-bug ) into account and modify the pattern accordingly.

**Negation** is the simplest: We just want a negative lookahead and a .+ to match anything (as long as it passes the lookahead test). For example, the solution to the negation problem above would look like `/^(?!.*foo).+$/`. Admittedly, negation is also the least useful on its own.

There are caveats to this technique, usually related to what actually matches in the end (make sure your actual capturing pattern, outside the lookaheads, captures the entire thing you’re interested in!), but it’s fairly simple for just testing whether something matches.

Steven Levithan took lookahead hacking to the next level, by using something similar to [mimic conditionals](http://blog.stevenlevithan.com/archives/mimic-conditionals) and [atomic groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups). Mind = blown.
