---
title: "Automatic login via notification emails?"
date: "2010-08-14"
categories:
  - "thoughts"
tags:
  - "security"
  - "usability"
  - "usability-vs-security"
---

![Screenshot of a Twitter email notification](images/twitter-notification.png "Email notification example (via Twitter)")A couple hours ago, I received a notification email from [Goodreads](http://www.goodreads.com/) and unlike usually, I decided to actually visit the site (by the way, I believe that Goodreads, i.e. a last.fm for books, is an awesome idea but poorly implemented).When I did, I was quite annoyed to find out that I wasn't already logged in, so I had to remember which one of my many passwords I had used for it and try them one by one. This is not a Goodreads fail, but a fairly common nuisance, since most (if not all) social websites behave that way.

_"What if there was some magic involved?"_ Bill Scott & Theresa Neil advise interaction designers to ask themselves in [a book I'm currently reading](http://designingwebinterfaces.com/) (highly recommended by the way). Well, I guess, if there _was_ some magic involved, **the site would "understand" that my click was initiated from an email and would automatically log me in and let me view whatever I was trying to**.

What's the point of asking for a password if the user can prove they have access to the associated email account? Such access is usually all that's needed for someone to break into an account, theirs or not (via the forgotten password feature). So, it doesn't help security much, just makes it slightly more time-consuming for potential impostors, while turning legitimate users with a weak memory (like yours truly) away from the site.

I'm not sure whether it's a good or a stupid idea, I'm not really suggesting it, just expressing a thought. :) I have some concerns myself too:

1. It's definitely **harder to implement**.
2. All links sent in notification emails must contain some special token, like reset password links do (I've never seen it implemented otherwise). The tokens in reset password links expire after a while, so probably these should too, for security reasons. And what happens after that? A regular login is required? Doesn't this render the whole idea a bit pointless, since notification emails are frequently read 1+ days after they're sent?
3. Usually a frequent user receives a bunch of email notifications per day. **Isn't it a bit too risky to have dozens of such powerful emails floating around in your inbox?** On the other hand, it doesn't seem more dangerous than using the "remember me" feature while logging in: Anyone that manages to get ahold of your laptop for a minute is able to use your account in most SN sites, one way or another. **However, the "remember me" feature is a classic case where usability triumphed security**, at least in cases where the computer isn't shared.
4. Thinking of the "remember me" feature gives me another idea: It could be **optional and active by default**. Perhaps with a link to easily deactivate the feature in every such email. On the other hand, more options = more confusion.
5. Also, to avoid the issues stated in #3, this feature could be activated **only if the user in question was inactive** for a while. **Frequent users don't need it** that much and even if they did, they don't run away so easily, so it's not as crucial.

**What do you think? Mostly useful or mostly evil?**
