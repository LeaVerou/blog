---
title: "Can we get rid of gradient prefixes?"
date: "2013-04-07"
tags:
  - "news"
  - "css"
  - "css-gradients"
  - "css"
---

I recently realized that unprefixed gradients finally propagated to stable Chrome, and after [tweeting about it](https://twitter.com/LeaVerou/status/320365600998305792), I decided to do some research on which browsers support unprefixed gradients, and what percentage of users needs them.

Currently, unprefixed gradients are supported in:

- Chrome 26+
- Firefox 16+
- Opera 12.10+
- IE10+

Lets have a look at which prefixes we actually need to use for gradients today.

### \-ms-

There was **never** a stable release of IE that supported -ms- prefixed gradients, those were only in preview versions (stable IE10 supports both prefixed and unprefixed gradients). So, -ms- is most definitely not required.

### \-moz-

Firefox versions >= 3.6 and < 16 account for **4%** of the global user base\*. This might or might not be significant, depending on how good the fallback is that these users will see. If the gradient only adds a subtle shadow or something like that, I’d say ditch -moz-. If it’s more crucial to the design & branding, it might be wise to still keep it. More tech-focused websites probably have a much lower percentage than 4%, so it might be a good idea to drop it there completely.

### \-o-

Opera unprefixed gradients in 12.10. Opera Mini never supported them. Opera versions < 12.10 currently account to a total of **0.25%** of the global user base\*. I’d say it’s safe to ditch -o- in gradients in most cases.

### \-webkit-

Chrome only very recently unprefixed gradients and Safari is a long way from doing so. Not to mention all the mobile browsers using WebKit. Unfortunately, we can’t ditch -webkit- in CSS gradients just yet.

### My opinion

Don’t use -ms- prefixed gradients, there’s absolutely zero point in doing so. Include -moz- for the less subtle gradients. No significant need for -o- gradients. -webkit- is still needed and probably will be at least until the end of 2013. Or, of course, just use [\-prefix-free](https://projects.verou.me/prefixfree/) and don’t bother. :P

Keep in mind that your stats might differ from global stats, so which prefixes you need to include might differ on a case by case basis. **The purpose of this post is to alert you that maybe you don’t need all these prefixes, not to prescriptively tell you which ones to keep.** Except -ms-, please don’t use that. There’s absolutely zero reason whatsoever.

**Last but not least, no matter which prefixes you include, always have a good solid color fallback!**

 

\* Global market share statistics from [StatCounter](http://gs.statcounter.com/#browser_version-ww-monthly-201301-201303), for a 3 month period of January 2013 - March 2013. The graph on the website only displays the most popular browser versions, but downloading the CSV file gives you all of them.
