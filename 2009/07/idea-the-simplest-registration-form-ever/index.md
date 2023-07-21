---
title: "Idea: The simplest registration form ever"
date: "2009-07-23"
tags:
  - "thoughts"
  - "registration-forms"
  - "ui"
  - "usability"
  - "ux"
---

If a web application has some sort of registration system (and most do), the registration page should be one of the most attractive, inviting, usable pages of it. It should make you to **want** to register, not repulse you. We don't want the user to give up in the middle of filling it because they are fed up with it's length or bad usability, or -even worse- not even attempt to do so, do we?

The most popular websites usually take this rule to heart and employ the simplest registration forms: Only the basic fields required, and most of the times, even without password/email confirmation.

I was wondering lately - what would be the simplest possible registration form? It should have the minimum number of fields required: Username and password and a field for some kind of human verification.

At this point, some readers might argue "Hey, why not an email field as well?". In my opinion, the email is not always a required field. Let's see why it's being asked for in most cases: Unique identification (to prevent double accounts) and for sending out notifications for important events. However, it's useless for the first purpose due to all these disposable email websites. As for the second purpose, since notifications can be switched off (and if not, then they are essentially considered spam), it could be regarded optional and we don't include optional fields in registration forms, do we? ;-)

Of course, in websites that use the email instead of a username to let their users log in, you may just substitute the username field above with an email field (since in that case, the username is what could be considered optional) and we also have two fields. Smart readers might have noticed another pattern here: The only fields that are truly required for a registration form are the same ones that are required for a login form plus a human verification field.

And then it dawned on me: We can make the registration process almost as quick as logging in! We could use the same form for both actions. The submit button label could indicate the dual nature of the form, for instance "Log in or register". If the username (or email) doesn't exist, we could then ask the user whether they want to create a new account and present them the human verification field at that point. There is no need for a password verification field, since [we could just have a checkbox for displaying what the user typed](http://lea.verou.me/2009/06/on-password-masking-and-usability/), if they feel insecure about it.

I find 3 inherent issues with this approach:

1. Security. If a login attempt fails, the user will know whether he got the username or the password wrong. However, in most websites, you can easily check whether a username exists anyway, so I don't consider this a real concern. I just included it because I'm certain that if I didn't, somebody would point it out to me in the comments.
2. Despite being a more usable approach by nature, it's not by any means a convention yet. Until it becomes one, I'm afraid that some users will be confused by its extreme ...simplicity! Funny, isn't it?
3. We won't be able to employ Ajax verification for the registration form, since it will essentially be a login form as well, and until the user submits, we won't know what they plan to do (login or register). Having an Ajax verification script there by default will confuse existing users as hell (as in _"What do they mean by 'Username is taken'? WTF??"_). So, we have to sacrifice some usability to gain some usability. The question is: Is the usability we gain more than the usability we sacrifice? What do you think?

As you can see by the problems mentioned above, it's still a rough-on-the-edges idea (I just thought about it and I haven't refined it yet), but I think it's interesting. What are your thoughts?
