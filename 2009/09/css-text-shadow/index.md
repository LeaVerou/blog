---
title: "Exploring CSS3 text-shadow"
date: "2009-09-13"
tags:
  - "articles"
  - "browser-bugs"
  - "browsers"
  - "chrome-bugs"
  - "css"
  - "css-properties"
  - "experiments"
  - "opera-bugs"
  - "safari-bugs"
  - "text-shadow"
  - "webkit-bugs"
---

I consider CSS3's `text-shadow` one of the most exciting CSS3\* properties, which offers us a lot more effects than it's name suggests. Of course, it can be used for creating drop shadows for text, and it carries out that task very well, but it's inherent flexibility allows it to be also used for glow effects, outlines, bevels, extruded text, inset text, fuzzy text and many others (until browser bugs and backwards compatibility come into play... :(). This post is about various findings of mine (and others', where a source is provided) regarding this property, including browser bugs and inconsistencies, effects that can be achieved with it, compatibility woes etc.

### Browser support

- Opera 9.5+
- Firefox 3.5+
- Safari 1.0+
- Google Chrome

### text-shadow syntax

The syntax is fairly simple:

```css
text-shadow: <offset-x> <offset-y> <blur-radius> <color>;
```

There are some variations (the color could be first instead of last, the blur radius can be omitted if it's equal to zero and the color may be omitted if it's the same as the text color) and you may include multiple comma delimited shadows.

You may read more about the syntax in the official [specification](http://www.w3.org/TR/css3-text/#text-shadow).

### How it works

It helps if you imagine the algorithm for drawing the text shadow as follows:

1. Create a (most of the times differently colored) clone of the text and place it behind the text.
2. Move it according to the X and Y offsets (positive values move it to the right and bottom respectively)
3. If a blur radius is specified and it's > 0, blur it accordingly (the specification doesn't mention the blurring algorithm to be used, so each browser vendor may choose any blurring algorithm they prefer, and judging by my experiments, it seems they took advantage of this freedom). **In all cases however, the bounding box of the blurred text can extend no further than the bounding box of the original text plus (+) the specified blur radius on each side.**
4. Repeat for the rest of the shadows, if more than 1 are specified. The order in which shadows are drawn seems to be a subject of debate, judging by the wording of the specification and the various existing implementations.

### The experiments

You will find the experiments I performed [here](http://lea.verou.me/demos/text-shadow.html). I tried to come up with (or find) interesting uses of the property. I also tried to make some of them "pretty", so they could be useful to others, but given the fact that these were primarily created for testing purposes, this wasn't achievable for all of them. Next to each experiment is the CSS used to produce the effect (directly fetched from the `<style>` tag via JavaScript). You'd better not view it with IE until you read below or you might have some freaky nightmares tonight :P

Screenshots from various browsers: (mouse over the thumbnails to see which browser was used for each one)

\[gallery link="file"\]

### Browser bugs and inconsistencies

Apparently, some browser bugs were exposed in these experiments:

- **Opera 10** and **Safari** don't display the shadow when the text color is `transparent` (demonstrated in Experiment #5). **Opera 9.6** doesn't seem to support `transparent` as a text color, so it ignores it.
- When the text color is RGBA, **Safari** applies transparency to the shadow, equal to the Alpha component (demonstrated in Experiment #8).
- **Opera** paints the shadows in the order they were specified, whereas all others use the reverse. According to the current version of the specification, Opera is the only correct one, but I doubt that web designers will give her credit for it :p (Experiment #8)
- **Google Chrome** uses a crappy blurring algorithm (Experiments #5 and #7)
- **Safari** and **Chrome** don't default to the text color when no color is specified in text-shadow, but to `transparent`. (Experiment #2)
- **Opera** is seriously messed up when it comes to transparent shadows, as demonstrated by Experiment #9. I can't even describe the bug (try messing with the text-shadow value a bit and you'll see why...). Luckily, I can't think of a single case where a transparent text-shadow would be useful :P
- You can see a bit of the shadow in **Google Chrome** even if the offsets and blur radius are all 0 (Experiment #9). I'm not sure if this is a bug, but it's inconsistent with the other implementations.
- Even if you ignore the bugs above, there are slight rendering variations when multiple blurred shadows are involved (or they are more apparent in those cases), as demonstrated by experiments #2, #6 and #7.

Firefox's implementation seems to be the clear winner here...

A note about the above observations: When no version number is mentioned, 3.5 is implied for Firefox, 10 for Opera and 4 for Safari and Chrome.

### Alternatives to text-shadow

#### IE Filters

As you might have noticed, I have managed to completely avoid mentioning Internet Explorer up to this point. It's no surprise that our dearest browser doesn't support the text-shadow property. However, it does support some filters ([DropShadow](http://msdn.microsoft.com/en-us/library/ms532985%28VS.85%29.aspx) and [Shadow](http://msdn.microsoft.com/en-us/library/ms533086%28VS.85%29.aspx)) that could be used to provide a very small subset of the different kinds of text shadows, although they severely **mess up the font anti-aliasing** (just like all IE filters). Also, if the parent or siblings of the text node in question have backgrounds or borders **an extra element is needed to enclose the text node** (you'll see in the experiments why...). For these reasons,  I highly doubt whether they are worth it and I don't use them personally. However, if you are interested you can see a brief demonstration of these two filters in Experiments #3 (DropShadow) and #6 (Shadow, actually 4 of them).

### The :before pseudo-element

This could be used instead of the text-shadow, when the blur radius is 0, since browser support for the :before pseudo-element is better than browser support for text-shadow (even IE8 supports that, yay). [Here is a thorough (although slightly outdated) tutorial on this technique](http://www.workingwith.me.uk/articles/css/cross-browser-drop-shadows). However,this workaround severely hurts separation of presentation and content/structure, since the content has to be duplicated in the CSS. Repeating something greatly increases the chance that the two copies become inconsistent, since people tend to be forgetful. Also, you have to know in advance the exact height of the text (in lines), another maintenance headache. For these reasons, I don't use this workaround either.

In my humble opinion, the text shadow is usually just icing on the cake and not something crucial to the design, so it doesn't hurt if it won't show in some old and/or crappy browsers. It degrades gracefully in most cases (ok, you'll have to wait a few years before using it in ways that don't) so it doesn't hurt usability/accessibility either. It's just one of the little treats I like to offer to visitors that were smart enough to use a decent browser. :-)

### Epilogue

text-shadow is a very flexible property, with probably the best browser and editor -- even Dreamweaver acknowledges it's existence! -- support among all notable CSS3\* properties. It also degrades gracefully most of the times (the experiments above shouldn't be considered "most of the times"! :P ) and this is why it's probably also the most widely used CSS3\* property.

I think it could be improved even more by allowing for the inset keyword (just like inset box-shadows -- sadly only Firefox 3.5 supports those at the time) and a fourth parameter could be used to enlarge or shrink the shadow (currently the only way to enlarge it is by blurring it, which isn't always desirable) although it would complicate the shorthand (the blur radius would probably become required -- so that the browser can tell them apart). However, a separate property could be used to solve that (text-shadow-size?). I guess we could combine the :before technique, with transparent text color (in the :before pseudo-element) and a text-shadow for that to imitate such an effect (I can elaborate if this seems obscure) although I haven't actually tried it (however, even if it works, it's too much of a hassle).

Anyway, I guess it's too late for such suggestions, so let's focus on what we actually will get (?) which is more than sufficient :-)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\*Actually, it was originally proposed for CSS 2.1, but it was dropped due to lack of implementations (basically only Webkit supported it)
