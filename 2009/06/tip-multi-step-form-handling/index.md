---
title: "Tip: Multi-step form handling"
date: "2009-06-16"
categories:
  - "articles"
  - "tips"
tags:
  - "forms"
  - "html"
  - "usability"
---

First of all, sorry for my long absence! I haven't abandoned this blog, I was just really, really busy. I'm still busy, and this probably won't change soon. However, I will still blog when I get too fed up with work or studying (this is one of these moments...). Now, let's get to the meat.

### The situation

In most web applications, even the simplest ones, the need for form handling will arise. There will be forms that need to be submitted, checked, processed or returned to the user informing them about any errors. A good empirical rule I try to follow is "Try not to produce URLs that don't have a meaning if accessed directly". It sounds simple and common-sense, doesn't it? However, as Francois Voltaire said, "common sense is not so common". I've seen variations of the following scenario several times, in several websites or even commercial web application software:

Lets assume we have a two step process, like a registration form with an arguably¹ bad usability. The hypothetical script is called register.php (PHP is just an example here, the exact language doesn't matter, it could be register.jsp or anything else). The user fills in the information required for the first step, and if they get it right, they advance to something like register.php?step=2 to complete the rest of the information. They fill in their information there as well, and submit the form. Everything is fine.

### Or is it?

What we have done this way is that we have effectively created a completely useless URL. If someone tries to access register.php?step=2 directly (via their history for instance), we don't have the POST data from the first step, so we either have to redirect them to the first step or, even worse, assume they are actually coming from the first step and present it to them full of errors telling them they got everything wrong. In both cases we have duplicate content, and in the second one, usability suffers a great deal.

So, the right way is to pass step=2 via POST as well. This way, the URL stays as it was (register.php) and we avoid all the problems mentioned above. So, we end up doing something like this:

```html
... form fields here ...
<input type="hidden" name="step" value="2" />
<input type="submit" value="Create my account" />
```

### Now we're done. Or not?

This works fine. However, there's still room for improvement. We could get rid of the extra input element by utilizing the submit button. Yeah, it's a form element too, even though we often overlook that and just focus on styling it. If we give it a name, it will get sent along with the other form fields. So instead of the html above, we can do that:

```html
... form fields here ...
<input type="submit" name="step" value="2" />
```

### But wait! What the f\*ck is that ???

Now usability suffers! Instead of our nice "Create my account" button, the user now sees a cryptic "2". Who cares if it works or if it requires less code, if nobody understands how to register, right? Luckily for us, we don't **have** to use the `<input />` tag to create submit buttons. A better (in terms of styling, semantics, markup clarity etc), albeit less known, alternative exists: The `<button />` tag. When using the `<button />` tag, the label of the button is derived from the markup within the start and end tags (yeah, we can also have html elements in there, not only text nodes, in case you're wondering), not from the value attribute. So, we can set it's name and value attributes to whatever we want, and the user won't notice a thing:

```html
... form fields here ...
<button type="submit" name="step" value="2">Create my account</button>
```

It's really simple, although not done often. I guess it's one of these "OMG how come I've never thought about this??" kind of things. :P

¹ I firmly believe we should eliminate the number of steps required in any procedure and especially in registration forms that users are bored to fill in anyway. However, there's an exception to that: If the form **has** to be big for some reason, breaking it into steps actually makes it **more** usable, since the user is not overwhelmed with all these fields. Another situation when this approach is favorable is when the second step is determined according to the data from the first, although thanks to JavaScript and Ajax, this is becoming obsolete nowadays.
