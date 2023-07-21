---
title: "The Cicada Principle, revisited with CSS variables"
date: "2020-07-07"
tags:
  - "articles"
  - "original"
  - "css"
  - "css-variables"
---

Many of today's web crafters were not writing CSS at the time Alex Walker's landmark article [The Cicada Principle and Why it Matters to Web Designers](https://www.sitepoint.com/the-cicada-principle-and-why-it-matters-to-web-designers/) was published in 2011. Last I heard of it was in 2016, when it was [used in conjunction with blend modes](https://css-tricks.com/cicada-principle-css/) to pseudo-randomize backgrounds even further.

So what _is_ the Cicada Principle and how does it relate to web design in a nutshell? It boils down to: when using repeating elements (tiled backgrounds, different effects on multiple elements etc), using prime numbers for the size of the repeating unit maximizes the _appearance_ of organic randomness. Note that this only works when the parameters you set are independent.

When I [recently redesigned my blog](https://lea.verou.me/2020/06/new-decade-new-theme/), I ended up using a variation of the Cicada principle to pseudo-randomize the angles of code snippets. I didn't think much of it until I saw [this tweet](https://twitter.com/StuRobson/status/1273904521132072960):

https://twitter.com/StuRobson/status/1273904521132072960

This made me think: hey, maybe I should actually write a blog post about the technique. After all, the technique itself is useful for way more than angles on code snippets.

The main idea is simple: You write your main rule using CSS variables, and then use `:nth-of-*()` rules to set these variables to something different every N items. If you use enough variables, and choose your Ns for them to be prime numbers, you reach a good appearance of pseudo-randomness with relatively small Ns.

In the case of code samples, I only have two different top cuts (going up or going down) and two different bottom cuts (same), which produce 2\*2 = 4 different shapes. Since I only had four shapes, I wanted to maximize the pseudo-randomness of their order. A first attempt looks like this:

```
pre {
	clip-path: polygon(var(--clip-top), var(--clip-bottom));
	--clip-top: 0 0, 100% 2em;
	--clip-bottom: 100% calc(100% - 1.5em), 0 100%;
}

pre:nth-of-type(odd) {
	--clip-top: 0 2em, 100% 0;
}

pre:nth-of-type(3n + 1) {
	--clip-bottom: 100% 100%, 0 calc(100% - 1.5em);
}
```

This way, the exact sequence of shapes repeats every 2 \* 3 = 6 code snippets. Also, the alternative `--clip-bottom` doesn't really get the same visibility as the others, being present only 33.333% of the time. However, if we just add one more selector:

```
pre {
	clip-path: polygon(var(--clip-top), var(--clip-bottom));
	--clip-top: 0 0, 100% 2em;
	--clip-bottom: 100% calc(100% - 1.5em), 0 100%;
}

pre:nth-of-type(odd) {
	--clip-top: 0 2em, 100% 0;
}

pre:nth-of-type(3n + 1),
pre:nth-of-type(5n + 1) {
	--clip-bottom: 100% 100%, 0 calc(100% - 1.5em);
}
```

Now the exact same sequence of shapes repeats every 2 \* 3 \* 5 = 30 code snippets, probably way more than I will have in any article. And it's more fair to the alternate `--clip-bottom`, which now gets 1/3 + 1/5 - 1/15 = 46.67%, which is almost as much as the alternate `--clip-top` gets!

You can explore this effect in [this codepen](https://codepen.io/leaverou/pen/8541bfd3a42551f8845d668f29596ef9?editors=1100):

https://codepen.io/leaverou/pen/8541bfd3a42551f8845d668f29596ef9?editors=1100

Or, to better explore how different CSS creates different pseudo-randomness, you can use [this content-less version](https://codepen.io/leaverou/pen/NWxaPVx) with three variations:

https://codepen.io/leaverou/pen/NWxaPVx

Of course, the illusion of randomness is much better with more shapes, e.g. if [we introduce a third type of edge](https://codepen.io/leaverou/pen/dyGmbJJ?editors=1100) we get 3 \* 3 = 9 possible shapes:

https://codepen.io/leaverou/pen/dyGmbJJ?editors=1100

I also used primes 7 and 11, so that the sequence repeats every 77 items. In general, the larger primes you use, the better the illusion of randomness, but you need to include more selectors, which can get tedious.

## Other examples

So this got me thinking: What else would this technique be cool on? Especially if we include more values as well, we can pseudo-randomize the result itself better, and not just the order of only 4 different results.

So I did a few experiments.

#### [Pseudo-randomized color swatches](https://codepen.io/leaverou/pen/RwrLPer)

https://codepen.io/leaverou/pen/NWxXQKX

Pseudo-randomized color swatches, with variables for hue, saturation, and lightness.

And [an alternative version](https://codepen.io/leaverou/pen/RwrLPer):

https://codepen.io/leaverou/pen/RwrLPer

Which one looks more random? Why do you think that is?

#### [Pseudo-randomized border-radius](https://codepen.io/leaverou/pen/ZEQXOrd)

Admittedly, this one can be done with just longhands, but since I realized this after I had already made it, I figured eh, I may as well include it 🤷🏽‍♀️

https://codepen.io/leaverou/pen/ZEQXOrd

It is also really cool when [combined with pseudo-random colors](https://codepen.io/leaverou/pen/oNbGzeE) (just hue this time):

https://codepen.io/leaverou/pen/oNbGzeE

#### [Pseudo-randomized snowfall](https://codepen.io/leaverou/pen/YzwrWvV?editors=1100)

Lots of things here:

- Using [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) and transform together to animate them separately without resorting to [CSS.registerPropery()](https://developer.mozilla.org/en-US/docs/Web/API/CSS/RegisterProperty)
- Pseudo-randomized horizontal offset, animation-delay, font-size
- Technically we don't need CSS variables to pseudo-randomize `font-size`, we can just set the property itself. However, variables enable us to pseudo-randomize it via a multiplier, in order to decouple the base font size from the pseudo-randomness, so we can edit them independently. And then we can use the same multiplier in `animation-duration` to make smaller snowflakes fall slower!

https://codepen.io/leaverou/pen/YzwrWvV?editors=1100

#### Conclusions

In general, the larger the primes you use, the better the illusion of randomness. With smaller primes, you will get more variation, but less appearance of randomness.

There are two main ways to use primes to create the illusion of randomness with `:nth-child()` selectors:

The first way is to set each trait on `:nth-child(pn + b)` where p is a prime that increases with each value and b is constant for each trait, like so:

```
:nth-child(3n + 1)  { property1: value11; }
:nth-child(5n + 1)  { property1: value12; }
:nth-child(7n + 1)  { property1: value13; }
:nth-child(11n + 1) { property1: value14; }
...
:nth-child(3n + 2)  { property2: value21; }
:nth-child(5n + 2)  { property2: value22; }
:nth-child(7n + 2)  { property2: value23; }
:nth-child(11n + 2) { property2: value24; }
...
```

The benefit of this approach is that you can have as few or as many values as you like. The drawback is that because primes are sparse, and become sparser as we go, you will have a lot of "holes" where your base value is applied.

The second way (which is more on par with the original Cicada principle) is to set each trait on `:nth-child(pn + b)` where p is constant per trait, and b increases with each value:

```
:nth-child(5n + 1) { property1: value11; }
:nth-child(5n + 2) { property1: value12; }
:nth-child(5n + 3) { property1: value13; }
:nth-child(5n + 4) { property1: value14; }
...
:nth-child(7n + 1) { property2: value21; }
:nth-child(7n + 2) { property2: value22; }
:nth-child(7n + 3) { property2: value23; }
:nth-child(7n + 4) { property2: value24; }
...
```

This creates a better overall impression of randomness (especially if you order the values in a pseudo-random way too) without "holes", but is more tedious, as you need as many values as the prime you're using.

What other cool examples can you think of?
