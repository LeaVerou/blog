---
title: "Use MathML today, with CSS fallback!"
date: "2013-03-21"
tags:
  - "tips"
  - "css"
  - "fallback"
  - "mathml"
---

These days, I’m working on the slides for [my next talk](http://lea.verou.me/speaking), “The humble border-radius”. It will be about how much work is put into CSS features that superficially look as simple as border-radius, as well as what advances are in store for it in [CSS Backgrounds & Borders 4](http://dev.w3.org/csswg/css4-background) (of which I’m an editor). It will be fantastic and you should come, but this post is not about my talk.

As you may know, my slides [are made with HTML, CSS & JavaScript](http://github.com/LeaVerou/CSSS). At some point, I wanted to insert an equation to show how border-top-left-radius (as an example) shrinks proportionally when the sum of radii on the top side exceeds the width of the element. I don’t like LaTeX because it produces bitmap images that don’t scale and is inaccessible. The obvious open standard to use was [MathML](http://www.w3.org/TR/MathML/), and it can even be directly embedded in HTML5 without all the XML cruft, just like SVG. I had never written MathML before, but after a bit of reading and poking around existing samples, I managed to write the following MathML code:

```markup
<math display="block">
    <mrow>
        <msub>
            <mi>r&prime;</mi>
            <mi>top-left</mi>
        </msub>
        <mo>=</mo>
        <mi>min</mi>
        <mo>(</mo>
        <msub>
            <mi>r</mi>
            <mrow>
                <mi>top-left</mi>
            </mrow>
        </msub>
        <mo>,</mo>
        <mi>width</mi>
        <mo>&times;</mo>
        <mfrac>
            <mrow>
                <msub>
                    <mi>r</mi>
                    <mi>top-left</mi>
                </msub>
            </mrow>
            <mrow>
                <msub>
                    <mi>r</mi>
                    <mi>top-left</mi>
                </msub>
                <mo>+</mo>
                <msub>
                    <mi>r</mi>
                    <mi>top-right</mi>
                </msub>
            </mrow>
        </mfrac>
        <mo>)</mo>
    </mrow>
</math>
```

I was very proud of myself. My first MathML equation! It’s actually pretty simple when you get the hang of it: `<mi>` is for identifiers, `<mo>` for operators and those are used everywhere. For more complex stuff, there’s `<mfrac>` for fractions (along with `<mrow>` to denote the rows), `<msqrt>` for square roots and so on.

It looked very nice on Firefox, especially after I applied Cambria Math to it instead of the default Times-ish font:

[![MathML native support in Firefox](images/mathml-firefox.png)](images/mathml-firefox.png) [](images/mathml-chrome-withcss.png)

However, I soon realized that as awesome as MathML might be, [not not all browsers had seen the light](http://docs.webplatform.org/wiki/mathml#Compatibility). IE10 and Chrome are the most notable offenders. It looked like an unreadable mess in Chrome:

[![MathML in Chrome, with no CSS fallback](images/mathml-chrome-nocss.png)](images/mathml-chrome-nocss.png)

There are libraries to make it work cross-browser, the most popular of which is [MathJax](http://www.mathjax.org/). However, this was pretty big for my needs, I just wanted **one** simple equation in **one** goddamn slide. It would be like using a chainsaw to cut a slice of bread!

The solution I decided to go with was to use [Modernizr](http://modernizr.com) to detect MathML support, since apparently [it’s not simple at all](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/mathml.js). Then, I used the `.no-mathml` class in conjunction with selectors that target the MathML elements, to mimic proper styling with simple CSS. It’s not a complete CSS library by any means, I just covered what I needed for that particular equation and tried to write it in a generic way, so that if I need it in future equations, I only have to _add_ rules. Here’s a screenshot of the result in Chrome:

[![MathML in Chrome with CSS fallback](images/mathml-chrome-withcss.png)](images/mathml-chrome-withcss.png)

It doesn’t look as good as Firefox, but it’s decent. You can see the CSS rules I used in the following Dabblet:

<iframe src="https://dabblet.com/gist/5214646" height="500" width="100%"></iframe>

Obviously it’s not a complete MathML-to-CSS library, if one is even possible, but it works well for my use case. If I have to use more MathML features, I’d write more CSS rules. The intention of this post is not to provide a CSS framework to use as a MathML fallback, but to show you a solution you could adapt to your needs. Hope it helps!
