---
title: "CMYK colors in CSS: Useful or useless?"
date: "2009-03-09"
categories:
  - "thoughts"
tags:
  - "cmyk"
  - "colors"
  - "css"
  - "css"
  - "css-values"
---

As someone who dealed a bit with print design in the past, I consider CMYK colors the easiest color system for humen to understand and manipulate. It's very similar to what we used as children, when mixing watercolors for our drawings. It makes perfect sense, more than HSL and definately more than RGB. I understand that most of us are so accustomed to using RGB that can't realise that, but try to think for a moment: Which color system would make more sense to you if you had no idea and no experience at all with any of them?

Personally, even though I have lots more experience with RGB, given the fact that most of my work will be displayed on screen and not printed on paper, when I think of a color I want, I can instantly find out the percentages of Cyan, Magenta, Yellow and blacK needed to create it. I can't do that with HSL or RGB, I'd have to play a little bit with the color picker's sliders. I sometimes start by specifying a color in CMYK and then tweaking it via RGB or HSL to achieve the exact color I need (since the CMYK gamut is smaller than the RGB gamut) and I find that much faster than starting with RGB or HSL right away.

Also, when you don't have a color picker, it's much easier to create beautiful colors with CMYK than it is with RGB. For example the CMYK magenta (0% Cyan, 100% Magenta, 0% Yellow, 0% blacK) is a much better color than the RGB Magenta (255 Red, 0 Green, 100% Blue).

Given the above, I've always thought how much I wanted to be able to specify CMYK colors in my CSS. I agree that sometimes this would result in crippling myself, since as I said above the CMYK gamut is smaller, but it has other significant advantages that I think it would make it a useful option for some people. There are algorithms available for CMYK to RGB conversion, and the browser could use those to display the specified color on the screen. Then, if the user decided to print the page, The CMYK colors could be used as-is for the printer. Another advantage, as none of the current CSS color formats allow us to control that. People who don't find the CMYK color system easier for them to understand, they could still use it for their print stylesheets.

Also, graphic designers who decided to switch to web design would find it much easier to specify color values in a format they are already comfortable with.

To sum it up, the advantages that I think this option would provide us are:

1. A color system that's easier for most people to understand and manipulate.
2. The colors you get when combining "easy" CMYK values (0%, 50%, 100%) are more beatuful than the ones you get with "easy" RGB values (0, 128, 255). Bored people and people without a taste in color selection would create more beatuful websites this way and our eyes wouldn't hurt.
3. We would be able to specify how our colors will get printed, something that is not currently possible at all. Extremely useful for print stylesheets.
4. It would be easier for graphic designers to switch to web design.

And the format is very easy to imagine:

```
background-color: cmyk(0, 100, 50, 0);
```

or

```
background-color: cmyk(0%, 100%, 50%, 0%);
```

or

```
background-color: cmyk(0, 1, 0.5, 0);
```

So, what do you think? Useful or useless?

**Edit:** As it turns out, I'm not crazy! [The W3 already considers this for CSS3](http://www.w3.org/TR/css3-gcpm/#cmyk-colors) with the 3rd format (from 0 to 1)! However, no browser supports it yet, not even Webkit nightlies... :(

### Translations

- [Portuguese](http://www.cssnolanche.com.br/cores-cmyk-em-css-uteis-ou-inuteis/)
