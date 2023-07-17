---
title: "\"Wow, Mona Lisa with pure CSS!\""
date: "2010-05-25"
categories:
  - "rants"
  - "thoughts"
tags:
  - "css"
  - "svg"
  - "theoretical"
---

There has been a recent flood of CSS experiments that utilize CSS3 features to convert some meaningless markup to spectacular pictures. It all started when [David Desandro used CSS3 to draw the Opera logo](http://desandro.com/articles/opera-logo-css/). This seemed to inspire lots of other folks who created similar demos:

- [Pure CSS icons](http://rathersplendid.net/home/pure-css-icons)
- [Create Social Media Icons in pure CSS](http://blog.insicdesigns.com/2010/03/create-social-media-icons-in-pure-css/)
- [CSS flower](http://www.romancortes.com/blog/css3-flower/)
- [Curtis CSS typeface](http://desandro.com/resources/curtis-css-typeface/)
- [CSS3 Gradients coffee cup](http://gabri.me/htmlcss/2010/css3-gradients-coffee-cup/)

I can certainly share their enthusiasm and I am also amazed by their results. Besides that, I think that pushing CSS3 to the edge like that, helps us understand the spec better, which leads us to find and file browser bugs or write comments regarding the spec itself. Filing bugs is crucial at this stage, with all browser vendors gradually adding experimental --and frequently buggy-- CSS3 support to their products. Also, don't get me wrong: I can easily see the benefits of reducing the number of images in a web application interface (far quicker/easier modifications, less HTTP requests and most of the time, less bandwidth).

However, I'm afraid we're losing sight of the big picture. These aren't demos that are or will ever be legitimate CSS use cases. Even after universal CSS3 browser support is achieved, they would (and should) still be considered "hacks". Almost all the arguments pro their usage also apply to more suitable ways of including images in web applications:

- **Fewer HTTP requests**: Same with any kind of embedded image (data URIs, inline SVG and so on)
- **Scalable**: Same with SVG and symbols embedded in custom fonts
- **Easier to modify:** Same with SVG
- **Less bandwidth (in some cases):** Same with SVG (and it can be cached too, when not inline)

And apart from these, these illustrations require non-semantic crap to be included in the markup which, besides issues of theoretical purity, makes it harder for other people to use them.

As for the **graceful degradation** argument, yes, this does only apply to CSS "images". But in this case, is it really an advantage? I seriously doubt it. People won't notice rounded corners if they're missing from an interface, but they're definitely going to notice a blocky Opera logo. And they're not used in thinking that their browser has something to do with how an image renders, so they'll just blame the website.

CSS is supposed to enhance the presentation of a document or interface, not to be (ab)used for the creation of illustrations from scratch. It's supposed to separate presentation from structure, not generate stuff. There are other technologies that are far more suitable for this (\*cough\*SVG\*cough\*). I think we should use our energy and creativity to make CSS3 demos that people will actually use in the future when all this is fully supported, not stuff doomed to be eternally considered hackery.

"Where should we draw the line?" one might ask. For example, is a [Pure CSS analog clock](http://oddvalue.co.uk/blog/2010/02/css3_clock/) a CSS **ab**use case? Or even my own [CSS iPhone keyboard](http://lea.verou.me/2010/02/iphone-keyboard-with-css3-no-images/)? Now **_that's_** a good question! A rule of thumb seems to be _"if it inherently (=not due to browser support issues) involves a bunch of empty (or with meaningless content) HTML elements, then that's a bad sign"_ but that might be overly strict. What's your take on it?

**_Disclaimer:_** _Yes, I'm fully aware that most of the time, such experiments are created just for fun by their (very talented) authors, which are perfectly aware of all the things mentioned above. However, I've also grown tired of reading comments by people that seem to to think that "This is the future of the web!". Let's hope it's not._
