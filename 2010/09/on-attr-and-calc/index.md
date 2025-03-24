---
title: "On attr() and calc()"
date: "2010-09-11"
tags:
  - "thoughts"
  - "attr()"
  - "calc()"
  - "css"
  - "css-values"
---

I recently posted my first suggestion to [www-style](http://lists.w3.org/Archives/Public/www-style/), the official W3 mailing list for CSS development. It was about [allowing attr() values inside calc()](http://lists.w3.org/Archives/Public/www-style/2010Sep/0019.html). In this post I'll describe in greater detail why I believe this is necessary, since not everyone follows www-style. If anyone has something to add in the discussion, you may post in the list, it's public.

### attr()

As you can easily [find out in the specification](http://www.w3.org/TR/css3-values/#attribute), the W3 is planning for attr() to play a much bigger role in tomorrow's CSS than it played in CSS 2.1, [where it was originally defined](http://www.w3.org/TR/CSS2/generate.html#propdef-content), which opens up exciting possibilities. In a nutshell, we're going to be able to use `attr()` in any property, for any type of value, let it be `<length>`, `<number>`, `<color>` or anything else. If the type is not obvious, we're able to define it, via the second parameter and include a fallback value in the 3rd one. We might even be able to do things like `float: attr(X`); (keywords are still under consideration).

### calc()

On the other hand, as you're probably already aware of, since [calc()](http://www.w3.org/TR/css3-values/#calc) is one of the hyped CSS3 features, we're finally going to be able to do calculations with different types of units, for example `calc(100% - 30px)`, which is something web designers requested for years.

### calc(attr())

You can easily see from the grammar presented in the specification for calc() that it does not allow attr() values to be used as operands in the calculations. To me, this is an obvious oversight. Since attr() values can be used anywhere, including where lengths and numbers are allowed, not being able to use them in calc() is absurd. As [David Storey pointed out](http://lists.w3.org/Archives/Public/www-style/2010Sep/0072.html), this could be enormously useful when used in conjunction with the new form control attributes (min, max, step and the like) or HTML5 custom data attributes (data-x).

Philosophically, it makes perfect sense that attr() should be allowed anywhere a `<length>` or `<number>` or `<angle>` or ... is. **We can't expect attributes to only hold semantic and not presentational data, but expect these data to be ready to be utilized for presentation purposes, without any calculations whatsoever**.

The first use case I can think of is the one that inspired me to suggest this. A while ago, I was researching CSS-based bar charts and progress bars. It turned out that there is no practical and purely semantic solution for specifying the bar widths. Either you have to [include](http://www.alistapart.com/articles/accessibledatavisualization) inline [styles](http://www.standards-schmandards.com/exhibits/barchart/) or you bloat your CSS [with](http://meyerweb.com/eric/css/edge/bargraph/demo.html) countless classes or [ids](http://csswizardry.com/2010/02/css-bar-charts-styling-data-with-css3-and-progressive-enhancement/), one for each width or —even worse— bar. In cases where you just want to use the displayed percentage of the bar as its width as well, attr() can actually help. However, as you can see, this is not always the case. Most of the times the bar values are not percentages or you want to also perform calculations on the percentage, for example include padding (because usually you display the number as well) or cut it in half to prevent the bar chart from appearing very big, etc, in which calc() combined with attr() could be a lifesaver.

One could argue that bar charts and progress bars are not legitimate CSS use cases but hacks that work around the lack of cross-browser SVG support, and it's very possible that they are right (although the addition of elements like [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) in HTML5 is by itself an argument for the opposite). However, the use cases are not limited to that. Αny kind of stylistic treatment that is supposed to convey some kind of fraction or number (progress, temperature, distance etc) will benefit from keeping the actual data in a data-x attribute and utilize them via attr() and calc().

Admittedly, coming up with more generic use cases is not very easy, since they greatly depend on the particular application. However, the same difficulty arises when trying to come up with use cases for the attr() function by itself when used for the numerical types (`<number>`, `<length>` etc), in properties other than content. Perhaps this is the reason that not even the specification contains any practical examples for it either. I guess almost any real-life use case for attr(\*, number|integer|length|angle|frequency|em|px|..., \*) is also a use case for this.

So far I'm optimistic about it, since almost all participants in the discussion were positive. However, calc() has already started being implemented (by Mozilla), so as time goes by, it will be increasingly harder to make changes to its grammar.

What do you think? How would you use it if it's implemented?

**Edit:** Sometime in Spring 2012, the issue was brought up again, and the CSS WG agreed that `attr()` should be permitted in `calc()`. Now it’s just a matter of browsers catching up to the spec. :)
