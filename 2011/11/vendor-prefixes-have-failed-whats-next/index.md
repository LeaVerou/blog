---
title: "Vendor prefixes have failed, what’s next?"
date: "2011-11-18"
categories:
  - "thoughts"
tags:
  - "css"
  - "web-standards"
  - "vendor-prefixes"
  - "w3c"
---

_**Edit:** This was originally written to be posted in [www-style](http://lists.w3.org/Archives/Public/www-style/), the mailing list for CSS development. I thought it might be a good idea to post it here as other people might be interested too. It wasn’t. Most people commenting didn’t really get the point of the article and thought I'm suggesting we should simply drop prefixes. Others think that it's an acceptable solution for the CSS WG if CSS depends on external libraries like my own [\-prefix-free](http://leaverou.github.com/prefixfree) or LESS and SASS. I guess it was an failure of my behalf ("Know your audience") and thus I'm disabling comments._

Discussion about prefixes was recently stirred up again by [an article by Henri Sivonen](http://hsivonen.iki.fi/vendor-prefixes/), so [the CSS WG started debating for the 100th time](http://lists.w3.org/Archives/Public/www-style/2011Nov/0271.html) about when features should become unprefixed.

I think we need to think out of the box and come up with new strategies to solve the issues that vendor prefixes were going to fix. **Vendor prefixes have failed and we can’t solve their issues by just unprefixing properties more early.**

## Issues

The above might seem a bold statement, so let me try to support it by recapping the serious issues we run into with vendor prefixes:

### 1\. Unnecessary bloat

Authors need to use prefixes even when the implementations are already interoperable. As a result, they end up pointlessly duplicating the declarations, making maintenance hard and/or introducing overhead from CSS pre- and post-processors to take care of this duplication. We need to find a way to reduce this bloat to **only the cases where different declarations are actually needed**.

### 2\. Spec changes still break existing content

The biggest advantage of the current situation was supposed to be that spec changes would not break existing content, but prefixes have failed to even do this. The thing is, **most authors will use something if it’s available**, no questions asked.  I doubt anyone that has done any real web development would disagree with that. And in most cases, they will prefer a slightly different application of a feature than none at all, so they use prefixed properties along with unprefixed. Then, when the WG makes a backwards-incompatible change, existing content breaks.

I don't think this can really be addressed in any way except disabling the feature by default in public builds. Any kind of prefix or notation is pointless to stop this, we'll always run into the same issue. If we disable the feature by default, almost nobody will use it since they can't tell visitors to change their browser settings. Do we really want that? Yes, the WG will be able to make all the changes they want, but then **then who will give feedback for these changes?** Certainly not authors, as they will effectively have zero experience working with the feature as most of them don’t have the time to play around with features they can’t use right now.

I think we should accept that changes will break _\*some\*_ existing content, and try to standardize faster, instead of having tons of features in WD limbo. However, I still think that there should be some kind of notation to denote that a feature is experimental so that at least authors know what they’re getting themselves into by using it and for browsers to be able to experiment a bit more openly. I don't think that vendor prefixes are the right notation for this though.

### 3\. Web development has become a popularity contest

I'll explain this with an example: CSS animations were first supported by WebKit. People only used the `-webkit-` prefix with them and they were fine with it. Then Firefox also implemented them, and most authors started adding `-moz-` to their use cases. Usually only to the new ones, their old ones are still WebKit only. After a while, Microsoft announced CSS animations in IE10. Some authors started adding `-ms-` prefixes to their new websites, some others didn’t because IE10 isn't out yet. When IE10 is out, they still won't add it because their current use cases will be for the most part not maintained any more. Some authors don't even add `-ms-` because they dislike IE. Opera will soon implement CSS animations. Who will really go back and add `-o-` versions? Most people will not care, because they think Opera has too little market share to warrant the extra bloat.

So browsers appear to support less features, only because authors have to take an extra step to explicitly support them. **Browsers do not display pages with their full capabilities because authors were lazy, ignorant, or forgetful.** This is unfair to both browser vendors and web users. We need to find a way to (optionally?) decouple implementation and browser vendor in the experimental feature notation.

## Ideas

There is a real problem that vendor prefixes attempted to solve, but vendor prefixes didn't prove out to be a good solution. I think we should start thinking outside the box and propose new ideas instead of sticking to vendor prefixes and debating their duration. I’ll list here a few of my ideas and I’m hoping others will follow suit.

### 1\. Generic prefix (-x- or something else) and/or new @rule

A generic prefix [has been proposed before](http://www.quirksmode.org/blog/archives/2010/03/css_vendor_pref_1.html), and usually the argument against it is that different vendors may have incompatible implementations. This could be addressed at a more general level, instead of having the prefix on every feature: An @-rule for addressing specific vendors. for example:

@vendor (moz,webkit,o) {
    .foo { -x-property: value; }
}

@vendor (ms) {
    .foo { -x-property: other-value; }
}

A potential downside is selector duplication, but remember: **The @vendor rule would ONLY be used when implementations are actually incompatible**.

Of course, there’s the potential for misuse, as authors could end up writing separate CSS for separate browsers using this new rule. However, I think we're in a stage where most authors have realized that this is a bad idea, and if they want to do it, they can do it now anyway (for example, by using @-moz-document to target Moz and so on)

### 2\. Supporting both prefixed and unprefixed for WD features

This delegates the decision to the author, instead of the WG and implementors. The author could choose to play it safe and use vendor prefixes or risk it in order to reduce bloat on a per-feature basis.

I guess a problem with this approach is that extra properties mean extra memory, but it’s something that many browsers already do when they start supporting a property unprefixed and don’t drop the prefixed version like they should.

**Note:** While this post was still in draft, I was informed that Alex Mogilevsky has suggested something very similar. [Read his proposal](http://lists.w3.org/Archives/Public/www-style/2011Nov/0346.html).

### 3\. Prefixes for versioning, not vendors

When a browser implements a property for the first time, they will use the prefix `-a-`. Then, when another browser implements that feature, they look at the former browser's implementation, and if theirs is compatible, they use the same prefix. If it's incompatible, they increment it by one, using `-b-` and so on.

A potential problem with this is collisions: Vendors using the same prefix not because their implementations are compatible but because they developed them almost simultaneously and didn't know about each other's implementation. Also, it causes trouble for the smaller vendors that might want to implement a feature first.

### We need more ideas

Even if the above are not good ideas, I'm hoping that they'll inspire others to come up with something better. I think we need more ideas about this, rather than more debates about fine-tuning the details of one bad solution.
