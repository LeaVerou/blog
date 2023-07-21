---
title: "Creating the perfect slider"
date: "2009-04-24"
tags:
  - "articles"
  - "forms"
  - "usability"
  - "ux"
---

I've previously discussed many times the color picker I have to create, and blogged about my findings on the way. An essential component of most color pickers is a slider control.

I won't go through much techincal details or JavaScript code in this article (after all the usability guidelines presented don't only apply to JavaScript applications, and this is why I used Adobe Kuler as a good or bad example for some of them), it's been done numerous times before and I prefer being a bit original than duplicating web content. You can google it and various implementations will come up if you need a starting point.

Some might argue that I suffer from [NIH syndrome](http://en.wikipedia.org/wiki/Not_Invented_Here), but I prefer to code things my way when I think I can do something even **a bit** better. After all, if nobody ever tries to reinvent the wheel, the wheel stands no chances of improvement. In this case, I wanted to build the most usable slider ever (at least for color picking uses), or -from an arguably more conservative point of view- something significantly more usable than the rest (if you think about it, the two statements are equivalent, the first one just _sounds_ more arrogant :P ).

I started by thinking about the way I personally use sliders and other form controls, and what bothers me most in the process. Then I combined that with the previously-done accessibility guidelines and the best slider implementations I've encountered (from a usability perspective), and here is what I came up with.

### Requirements for the perfect slider control

1. It should be [ARIA](http://www.w3.org/WAI/intro/aria)\-compatible, so that disabled users can easily utilize it.
2. It should be focusable, so that you can Tab to it.
3. Of course the thumb should be draggable (why would you call it a slider otherwise anyway?)
4. Of course the slider should be labeled so that the user knows what to use it for.
5. Normal, hover and focus states should be different (at least in browsers supporting the :hover and :focus pseudo-classes)
6. You should be able to click somewhere in the rail and have the thumb **instantly move there**. Many slider implementations use animations for that, and even though I admit it raises the _wow_ factor, I don't think it's good for usability. **When I choose something, I want it to be instantly selected**, I don't want to wait for the pretty animation to finish, even if it's short. Other implementations don't move the slider to the point of the rail that you clicked, but just a bit _towards_ it. I find that very annoying. **I clicked there because I want the slider to go there, not _towards_ there!** If I wanted to increment/decrement it a bit, I'd use other methods (read below).
7. It should be keyboard-navigable. I think the ideal key-mappings are:
    - **Left and right arrow keys** for small adjustments
    - **Page up/down** and **Ctrl + left and right arrow keys** for big adjustments.
    - **Esc** to focus out (blur)
    - **Home** and **End** to navigate to the minimum and maximum respectively
8. It should respond to the **mousewheel** (and this is where all current implementations I've tested fail misreably) when focused. Small adjustments for normal mousewheel movement, big adjustments if the **Ctrl** key is pressed as well. The pitfall to that is that you can't cancel the default action (zoom in/out) in Safari. Why the Ctrl key and not Alt or Shift? Because we are accustomed to using the Ctrl key as a modifier. Alt and Shift are used more rarely. Especially designers (and for most color pickers they are a significant part of the target audience) are used in using the Ctrl key together with the mousewheel, since that's a popular way for zooming or scrolling in most Adobe CS applications. Another important consideration when designing a mousewheel-aware slider, is to bind the event to the document element once the slider thumb is focused and unbind it when the slider thumb is blurred. Why? Because in most such cases, we don't like to have to keep out mouse pointer on the slider to adjust it with the mousewheel. **It being focused should suffice for letting the app know that this is what we want to adjust.**
9. The exact numerical choice of the user should be visible, not only in an indicator that is positioned in a static place, but also **above the slider thumb and have it move as the slider thumb moves**. **I don't want to have to look at two different places to see what I have selected!** (the slider thumb and the indicator) Why above the slider thumb? Because if it's below, the mouse pointer is likely to hide it. This movable indicator should be hidden once the user focuses out (as long as we provide another one that is positioned statically). [Adobe Kuler](http://kuler.adobe.com/#create/fromacolor) does this fairly well, although it suffers from a few issues: When you click on the slider rail, the indicator doesn't show up.
10. The user should be able to click at some point in the rail and start dragging right away, **without lifting their mouse button in the meantime**. Even though this sounds common-sense, I've seen **many** implementations that fail at it (including Kuler's).

So, that's it! What do you think? Could you come up with anything else to add?
