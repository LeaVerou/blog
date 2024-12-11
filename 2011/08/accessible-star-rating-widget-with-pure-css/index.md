---
title: "Accessible star rating widget with pure CSS"
date: "2011-08-18"
tags:
  - "original"
  - "css"
  - "selectors"
---

For ages, we couldn’t utilize the sibling combinators (`~` and `+`) to ease the pain of creating star rating widgets, because of [this stupid Webkit bug](http://css-tricks.com/8439-webkit-sibling-bug/). Nowadays, not only it’s fixed, but the fix has already propagated to Chrome and Safari 5.1. So, we can at least use the sibling combinator to make coloring the stars easier.

But can we use **no JavaScript** for a rating widget and make it just with CSS?

Actually, we can. By adapting [Ryan Seddon's technique for custom radio buttons with CSS](http://www.thecssninja.com/css/custom-inputs-using-css), we can turn a series of radio buttons into stars that change colors (for the purposes of this demo they're just unicode characters that change colors, but in your case they may as well be images) and use the sibling combinator to color the previous stars. [A](http://twitter.com/#!/stephband/status/104159169657053184) [series](http://twitter.com/#!/scottjehl/status/104194465480183808) [of](http://twitter.com/#!/anselmhannemann/status/104176613159206912) [radio](http://twitter.com/#!/hlb/status/104176520939044865) [buttons](http://twitter.com/#!/tomfullerton/status/104165058191433728) [is](http://twitter.com/#!/leads/status/104161288279695360) [what](http://twitter.com/#!/jamygolden/status/104158932267827201) [many](http://twitter.com/#!/thijs/status/104158812684038144) [people](http://twitter.com/#!/rossbruniges/status/104157949064249344) [use](http://twitter.com/#!/maskingtape/status/104157878230843392) [as](http://twitter.com/#!/edge0703/status/104157335756341249) [a](http://twitter.com/#!/rasmusfl0e/status/104157216029949955) [star](http://twitter.com/#!/stephenhay/status/104157128704540672) [rating](http://twitter.com/#!/derSchepp/status/104157124787060737) [widget](http://twitter.com/#!/hzr/status/104160608848584704) [fallback](http://twitter.com/#!/iPaintCode/status/104161792925765633) anyway, so the markup required is not necessarily more than usual. The only thing that needs to be done differently is their reverse ordering: The highest ratings need to go first, due to the way CSS3 selectors work (this limitation might be removed in CSS4, but that's a long way ahead).

Of course, you'd still need JS to attach an event handler if you want the votes to be registered through AJAX, but that's not part of the rating widget per se (it could still work as part of a regular form).

What's best is that it's fully keyboard accessible (focus and then use keyboard arrows) and screen reader accessible (although VoiceOver will also pronounce the generated stars, but that won’t happen if you use images instead of unicode stars). I'm guessing it could become even more accessible with proper ARIA, but I’ll leave that as an exercise to the commenter :D

In browsers that don't support `:checked` (essentially only IE < 9), it degrades to a series of radio buttons (haven’t verified that it does, but it should do).

So, here it is:

<iframe style="width: 100%; height: 180px;" src="https://jsfiddle.net/leaverou/CGP87/embedded/result%2Ccss%2Chtml/" width="320" height="240"></iframe>

Legal note, for those who need it: This code is MIT licensed.
