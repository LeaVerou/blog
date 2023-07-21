---
title: "Contrast Ratio has a new home — and this is great news!"
date: "2023-03-18"
tags:
  - "news"
  - "a11y"
  - "colors"
  - "contrast-ratio-com"
---

It has been over a decade when I [launched](https://lea.verou.me/2012/10/easy-color-contrast-ratios/) [contrast-ratio.com](https://contrast-ratio.com), an app to calculate the WCAG 2.1 contrast ratio between any two CSS colors. At the time, all similar tools suffered from several flaws when being used for CSS editing:

- No support for semi-transparent colors (Since WCAG included no guidance for alpha transparency — I had to do [original research](https://lists.w3.org/Archives/Public/w3c-wai-ig/2012OctDec/0011.html) to calculate the contrast ratio range for that case)

- No support for color formats other than hex or (at best) RGB with sliders. I wanted something where I could just paste a CSS color just like I had it specified in my code (e.g. `hsl(220 10% 90%`), possibly tweak it a bit to pass, then paste it back. I didn't want to use unintuitive hex colors, and I didn't want to fiddle with sliders.

- Poor UX, often calculating the actual ratio required further user actions, making iteration tedious

Over the years, [contrast-ratio.com](https://contrast-ratio.com) grew in popularity: it was recommended in [several books](https://www.google.com/search?q=%22contrast-ratio.com%22+OR+%22leaverou.github.io%2Fcontrast-ratio%22&tbm=bks), talks, and workshops. It basically became the standard URL developers would visit for this purpose.

However, I’ve been too busy to work on it further beyond just merging pull requests. My time is currently split between the [dozens of open source projects](https://github.com/leaverou/) I have started and maintain, [my TAG work](https://lea.verou.me/2022/11/tag-2/), [my CSS WG work](https://github.com/w3c/csswg-drafts/issues?q=is%3Aopen+involves%3Aleaverou+sort%3Aupdated-desc+), and my [teaching](https://designftw.mit.edu) & [research](https://lea.verou.me/2014/02/im-going-to-mit/) at MIT.

Therefore, when [Ross](https://twitter.com/rosshudgens/) and [Drew](https://twitter.com/drewpager) from [Siege Media](https://www.siegemedia.com/) approached me with a generous offer to buy the domain, and a commitment to take over maintainship of the [open source project](https://github.com/siege-media/contrast-ratio/), I was cautiously optimistic. But now, after having seen some of their plans for it, I could not be more certain that the future of this tool is much brighter with them.

Please join me in welcoming them to the project and help them get settled in as new stewards!

ETA: [Siege Media Press Release](https://www.prnewswire.com/news-releases/contrast-ratio-is-now-part-of-siege-media-301790441.html)
