---
title: "The best dark mode toggle is probably none"
date: 2026-09-02
toc: true
draft: true
image: "../dark-mode-toggles/image.png"
nutshell: My article on dark mode toggles made the rounds and convinced many. However, I now think the entire debate is moot, because the best dark mode toggle is probably …none at all.
tags:
  - ux
  - usability
  - product-design
  - dark-mode
# social_posts:
#   bluesky: ""
#   twitter: ""
#   mastodon: ""
#   linkedin: ""
---

About a month ago, I wrote an [article](../dark-mode-toggles/) recommending that if you are going to have an always visible control for switching between light and dark mode, it should be a two-state toggle that alternates between _system_ and _whatever the current opposite of system is_, not a tri-state one (system, light, dark).
If you _are_ forced to include such a control (say, someone is pointing a gun at you and shouting _"code dammit! now!"_), I stand by that recommendation: use two states, as described in the article.

But the article explicitly doesn’t answer the question _"should you have one at all?"_.
I was much more neutral on this at the time of writing.
I am now firmly in the "no" camp. More on that below.

<figure style="display: grid; grid-template-columns: 1fr 1fr; --media-width: 100%;">
<object data="../dark-mode-toggles/demo.svg#light-system-2" type="image/svg+xml"></object>
<object data="../dark-mode-toggles/demo.svg#light-dark-2" type="image/svg+xml"></object>
<object data="../dark-mode-toggles/demo.svg#dark-system-2" type="image/svg+xml"></object>
<object data="../dark-mode-toggles/demo.svg#dark-light-2" type="image/svg+xml"></object>
<figcaption style="grid-column: 1 / -1;">

The [two-state toggle](../dark-mode-toggles/#good-two-state-ux) design proposed in my article can actually express all three data model states.
</figcaption>
</figure>

What I didn’t mention was that I had been meaning to write this article for years, but had been putting it off.
What finally pushed me to write it ^[during a [CSS WG meeting](https://wiki.csswg.org/planning/berlin-2026/) where I was presenting several topics no less!] was that [Bramus](https://bram.us) argued that some [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) I had written on this was incorrect.
He assumed it was an oversight, that I simply hadn't thought of all the implications.
On the contrary, my recommendation had been the result of some _very_ careful consideration, combined with my [HCI](https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction) background.
Surely, if I explained my reasoning well, he would see it.

I tried to convince him through discussion (in person — we were both in Berlin at the time!) to no avail so I figured a blog post would help me better present the argument.

## Reactions

This article _really_ made the rounds.
It was shared by hundreds of folks, including people I really respect, such as:
- [ShadCN](https://x.com/shadcn/status/2085412031717372273)
- [Paul Kinlan](https://www.linkedin.com/in/paulkinlan/recent-activity/all/)
- [Kevin Powell](https://bsky.app/profile/lea.verou.me/post/3msg52hpjwk2g/reposted-by)
- [John-David Dalton](https://bsky.app/profile/lea.verou.me/post/3msg52hpjwk2g/reposted-by)
- [Tab Atkins-Bittner](https://bsky.app/profile/tabatkins.com/post/3msvipuqaas23)
- [Cory LaViska](https://x.com/claviska/status/2085412225569767536)
- [Ahmad Shadeed](https://bsky.app/profile/ishadeed.com/post/3msi45n2yzs2h)
- [Josh Tumath](https://bsky.app/profile/joshtumath.uk/post/3msh6j6a6ak26)

and many others. A lot more who hearted it.

Some of the quotes really made me blush ☺️. Here is a small selection:

<style>
.quotes { display: flex; flex-wrap: wrap; gap: 1rem;
@media (width > 1200px) { zoom: .8 }
}
</style>

<div class="quotes">

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:dr7ktxokjqc2suwnook4k73h/app.bsky.feed.post/3msg5lybeoc26" data-bluesky-cid="bafyreibuecglh6jej6rtjvfgnywykjtrkxikgoqunfekjb64xh6a3endea" data-bluesky-embed-color-mode="system"><p lang="en">I wasn&#x27;t sold on this until I got to the implementation. It&#x27;s so smart I&#x27;m probably gonna spend my day redesigning at least one or two of the theme toggles I&#x27;ve built.<br><br><a href="https://bsky.app/profile/did:plc:dr7ktxokjqc2suwnook4k73h/post/3msg5lybeoc26?ref_src=embed">[image or embed]</a></p>&mdash; Josh Collinsworth (<a href="https://bsky.app/profile/did:plc:dr7ktxokjqc2suwnook4k73h?ref_src=embed">@collinsworth.dev</a>) <a href="https://bsky.app/profile/did:plc:dr7ktxokjqc2suwnook4k73h/post/3msg5lybeoc26?ref_src=embed">August 6, 2026 at 4:30 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:tr4fmad7fpxeyaw26ky4esys/app.bsky.feed.post/3msg6cwq3lk2j" data-bluesky-cid="bafyreicos52pb6g2ox2evhwjgdovmf7omjptgnaflmpgjtxujql3fne6ki" data-bluesky-embed-color-mode="system"><p lang="en">This is one of the best articles I&#x27;ve seen about the difference between letting the underlying settings dictate the structure of your UI, and thinking about what actually makes sense to your users. Really, really insightful, and definitely worth ten minutes of your time.<br><br><a href="https://bsky.app/profile/did:plc:tr4fmad7fpxeyaw26ky4esys/post/3msg6cwq3lk2j?ref_src=embed">[image or embed]</a></p>&mdash; Dylan Beattie (<a href="https://bsky.app/profile/did:plc:tr4fmad7fpxeyaw26ky4esys?ref_src=embed">@dylanbeatt.ie</a>) <a href="https://bsky.app/profile/did:plc:tr4fmad7fpxeyaw26ky4esys/post/3msg6cwq3lk2j?ref_src=embed">August 6, 2026 at 4:43 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:7a4dbiurb44vggsynafivdpd/app.bsky.feed.post/3msgdpq3sus26" data-bluesky-cid="bafyreiafvtzjndglcvsy4vxc4tokrjx7emcyhapt4vvhdeokynhja62b5y" data-bluesky-embed-color-mode="system"><p lang="en">Once upon a time web developers regularly wrote blog posts about UX design that were this good. Thank you to @lea.verou.me for keeping the art alive.<br><br><a href="https://bsky.app/profile/did:plc:7a4dbiurb44vggsynafivdpd/post/3msgdpq3sus26?ref_src=embed">[image or embed]</a></p>&mdash; Sam Littlefair (<a href="https://bsky.app/profile/did:plc:7a4dbiurb44vggsynafivdpd?ref_src=embed">@littlefair.ca</a>) <a href="https://bsky.app/profile/did:plc:7a4dbiurb44vggsynafivdpd/post/3msgdpq3sus26?ref_src=embed">August 6, 2026 at 6:19 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:2t2s7o2yd5pcaqp5fuflzdew/app.bsky.feed.post/3msh6j6a6ak26" data-bluesky-cid="bafyreigvzlcedawwqlspyatafebb7dh7ynfh4n4ylrhcz6t2m75nxi6t3e" data-bluesky-embed-color-mode="system"><p lang="en">OK, I&#x27;m persuaded. For a toggle in the header or footer, a toggle between &#x27;system colour scheme&#x27; ↔️ &#x27;the opposite&#x27; is better than system ↔️ light ↔️ dark.

Lea is a master of user experience.<br><br><a href="https://bsky.app/profile/did:plc:2t2s7o2yd5pcaqp5fuflzdew/post/3msh6j6a6ak26?ref_src=embed">[image or embed]</a></p>&mdash; Josh Tumath (<a href="https://bsky.app/profile/did:plc:2t2s7o2yd5pcaqp5fuflzdew?ref_src=embed">@joshtumath.uk</a>) <a href="https://bsky.app/profile/did:plc:2t2s7o2yd5pcaqp5fuflzdew/post/3msh6j6a6ak26?ref_src=embed">August 7, 2026 at 2:19 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:fpqsj3rdp2ywlzda43czqo2n/app.bsky.feed.post/3msi45n2yzs2h" data-bluesky-cid="bafyreigjoowb53uosyoemcaki5nikpddt67st4dfurybadtolylkx6xdmy" data-bluesky-embed-color-mode="system"><p lang="en">This is a great post to read, lots of useful UX and usability thoughts. I like this approach.<br><br><a href="https://bsky.app/profile/did:plc:fpqsj3rdp2ywlzda43czqo2n/post/3msi45n2yzs2h?ref_src=embed">[image or embed]</a></p>&mdash; Ahmad Shadeed (<a href="https://bsky.app/profile/did:plc:fpqsj3rdp2ywlzda43czqo2n?ref_src=embed">@ishadeed.com</a>) <a href="https://bsky.app/profile/did:plc:fpqsj3rdp2ywlzda43czqo2n/post/3msi45n2yzs2h?ref_src=embed">August 7, 2026 at 11:09 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:xze6eimrnifbpwdv5uapb4d7/app.bsky.feed.post/3msvq55goz22c" data-bluesky-cid="bafyreibj7goljn7frunvpid5parikfbwphhzwan4aieecvaphxlfmzdyuy" data-bluesky-embed-color-mode="system"><p lang="en">Really, really appreciate the deep thinking about the user&#x27;s _actual_ needs and intentions, irrespective of conventions and commonalities, in this brilliant piece. 👌<br><br><a href="https://bsky.app/profile/did:plc:xze6eimrnifbpwdv5uapb4d7/post/3msvq55goz22c?ref_src=embed">[image or embed]</a></p>&mdash; sylvia (<a href="https://bsky.app/profile/did:plc:xze6eimrnifbpwdv5uapb4d7?ref_src=embed">@svillegas.com</a>) <a href="https://bsky.app/profile/did:plc:xze6eimrnifbpwdv5uapb4d7/post/3msvq55goz22c?ref_src=embed">August 12, 2026 at 9:12 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>



<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Tri-state theme controls always make me think™. Minor friction, but unnecessary. We can do better.<br><br>The intent is simple: &quot;flip the theme&quot;. The UI only needs two states: light and dark. “Follow system” can stay under the hood.<br>The algorithm I use in my projects ➡️ <a href="https://t.co/8s15vxVFY2">https://t.co/8s15vxVFY2</a></p>&mdash; Alexey Ardov (@ardovalexey) <a href="https://x.com/ardovalexey/status/2084735328267432437?ref_src=twsrc%5Etfw">August 4, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This is the missing piece of the puzzle for theming controls in the UI. I’m a little bit jealous I didn’t think of it myself :) <a href="https://t.co/HDjvCO1UhN">https://t.co/HDjvCO1UhN</a></p>&mdash; zerts (@zertsdev) <a href="https://x.com/zertsdev/status/2085718414450901280?ref_src=twsrc%5Etfw">August 7, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

</div>

Articles were written, for and against it.
This is a small sample (I couldn't find most of them):
- https://css-tricks.com/dark-mode-toggles-two-states-are-enough/
- https://daily.dev/posts/dark-mode-toggles-two-states-are-enough-lea-verou-aojclwsb5
- https://vale.rocks/micros/20260810-0330
- https://unsung.aresluna.org/2026/08/14/
- https://bitstorm.org/weblog/2026-8/dark-light-toggle.html

Unfortunately, [I failed to convince Bramus](https://bsky.app/profile/bram.us/post/3msgeq7aby226), who two weeks later wrote a [blog post of his own](https://www.bram.us/2026/08/18/the-case-for-tri-state-dark-mode-toggles/) 😢

## Responding to Bramus' post

Bramus’s central objection to the two-state toggle is this:

> Consider this scenario:
>
> 1. The user’s OS is set to auto-switch Light/Dark based on the time of day.
> 2. They visit a website during the day, so they see the **Light** theme.
> 3. Using the site’s two-state control, they try out the **Dark** theme. They decide they don’t like it, so they revert it back to **Light**.
> 4. They visit the site again at night.
>
> Because the two-state toggle maps one of its values back to “System” behind the scenes, the site is now `dark`, although they explicitly chose `light` the last time they interacted with the control. You may now expect an incoming bug report for the control not properly working …

His reasoning is that a tri-state control sidesteps this by letting users pin light or dark explicitly at all times, which he also considers clearer overall, since all three options are always visible.

### An easily-misread framing: auto-switching by time of day works fine

In both of his posts, Bramus initially frames the disagreement as "this will not work for users that have their system set to automatically switch to dark mode at night", which is false: it will work just fine.
The control covers all three intents with a single click.
Not a single click per session — a single click, _ever_.
The variable is around _when_ that click happens.
In fact, I [dedicated a whole section to this exact scenario](../dark-mode-toggles/#auto-switching) in the original article, which he acknowledges but says he’s "not buying it".

He does later explain what he sees as broken in more detail, but since most people do not read very carefully, there were a couple people who agreed thinking the two-state toggle I was proposing is somehow broken for auto-switching systems.

### His poll asks the wrong population the wrong question

Bramus [asked](https://www.bram.us/2026/08/18/the-case-for-tri-state-dark-mode-toggles/#:~:text=I%20posted%20the%20following) developers which control they _build_, then used the tally as evidence for which control is _usable_!

Those are different questions.
Developer preference is confounded with convention and implementation convenience.
If asking developers what they build gave us data on what UI is most usable, we wouldn't need user testing, ever 😅

We optimize UIs around **user goals**, not around developer preferences.
In fact, more often than not there is a tension between what is easiest to build and what is optimal for usability, because usability is all about abstracting the underlying model (which is closer to the machine), and exposing a model that is closer to how the user thinks.


### "Local feedback" doesn't solve the gulf of evaluation

Responding to the objection that two of the three options produce the same visual result, Bramus writes that

> "the selected option does change so there is *local* visual feedback."

Sure, the button highlights, and that’s better than if nothing happened at all.
But the button is the means, not the end.
The user clicked it to change the _page_, not the _button_!

When the control changes and the page doesn't, the user acted and the world didn't respond — that's Norman's [gulf of evaluation](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/).
Widget feedback with an unchanged outcome _is_ the failure, not a mitigation of it.
It's also why NN/g's [toggle guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/) insist a toggle has an immediate, visible effect.

### Implementation simplicity != cognitive load

Bramus says:

> "there is nothing complex about a tri-state control" […] it's "the Dumbest Approach™ one could possibly take."

Yes, it is — that was exactly my point when I wrote that [tri-state toggles are implementation-driven UI](../dark-mode-toggles/#tri-state-toggles-are-implementation-driven-ui).
The actual user goal in the moment is not abstract ("system" is a variable, not a value), it is concrete (light or dark).
Using a tri-state control involves a mental translation from the three states to the actual user goal.
It’s of course very short, almost imperceptible to users — but avoiding this type of unnecessary mental processing was _exactly_ the point of *[Don't Make Me Think](https://en.wikipedia.org/wiki/Don%27t_Make_Me_Think)* — which ironically Bramus cites to support his argument.


"Clarity over brevity" is one of these platitudes that everyone agrees with ^[It’s right up there with "simplicity". I have seen developers happily shovel complexity downstream to users using "simplicity" as the justification.], but people use it to support even entirely contradictory positions.
Whenever I see one of these, my tendency is to prod deeper; _clarity about what?_
**Clarity about the implementation's state machine is not clarity about outcome.**
The tri-state is optimized for people who already hold the system model — which is, again, developers.

<aside>

There is a widespread misunderstanding (especially among engineers) that exposing the underlying model directly adds clarity (best evidenced in [this HN thread](https://news.ycombinator.com/item?id=49300984)) while trying to abstract it away adds confusion.
"Too much magic" is often used to describe such abstractions in a derogatory way.
This is absolutely true for poor abstractions: indeed they are often _worse_ than exposing the underlying model directly.
But poor abstractions don’t prove that abstraction itself is bad — abstraction is the foundation of every UI we use today — you haven’t written any machine code this morning, have you?^[I’m not talking about you Bob!]

But yes, **creating good abstractions is _hard_**!
You can be studying usability all your life, and you will still royally screw up at least a couple times.
In our [usability class at MIT](https://designftw.mit.edu/) we made sure to mention this to students in the very first lecture so they adjust their expectations accordingly: **this is _hard_ and no-one gets it right every time**.

</aside>

### The failure scenario is rare, and recovery is cheap

Bramus’ central objection is that with a two-state control, forcing a mode "shouldn't be dependent on the time of the day." The scenario he gives requires OS auto-switching, *plus* toggling and reverting within a session, *plus* revisiting after the switch, *plus* remembering the earlier interaction.

**Usability problems are prioritized by [frequency × impact × persistence](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/), and this scores low on all three.** The tri-state, by contrast, taxes every interaction with a state most users never need.
Optimizing the common path over a rare, cheaply recoverable edge case is not an antipattern, it’s precisely how usability engineering is _supposed_ to work!

> "Once a user has interacted with a control, they have mentally set it to the specific state"

People don't remember settings on sites they rarely visit.
For them, a site that tracks the OS matches expectations; a stale override fighting the OS is the actual surprise ("why is this site light at night?").
And in practice no user devotes _nearly_ as many cycles contemplating why the theme of a website they visited to accomplish a task matches or doesn’t match their OS, at most they just toggle and move on.
It’s not even [System 2 thinking](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow).
If there is a recurring problem, sure, they may think about it more consciously, a few may even report a bug.
But something that’s fixed with a single click, in a very obvious way?
It might not even surface to the conscious mind.

Bramus himself admits that **his scenario is purely theoretical**; he has never experienced it himself nor seen anyone else experience it.

**Once you’ve spent a lot of time and effort on something, you overestimate how much it matters to everyone else.**
This is true not just in UI design, but in all aspects of life, from any areas you’re an expert in to even your kids ^[Most parents hugely overestimate how many people are interested in kidnapping their kids. In reality they struggle to even find someone to look after them for an evening, let alone take them forever 😅].
Developers have spent days on this control, users will spend half a second at most.
It's the [IKEA effect](https://en.wikipedia.org/wiki/IKEA_effect) meeting the [false-consensus effect](https://en.wikipedia.org/wiki/False_consensus_effect): you overvalue what you built, then assume users do too.

## Alternative designs

My favorite part of the debate was that it spawned a number of alternative designs.

Some people were divided.
They agreed with the reasoning, but still thought a tri-state toggle added clarity.
So naturally, they did what UI designers do best: they designed, and the results are quite clever.

Others took a different, hilarious tack on the problem, and attempted to imagine the worst possible dark mode toggles.

### Lawful Good 😇 { #lawful-good }

#### Vale’s 3-in-2 toggle

The alternative that made the rounds most is [Vale’s innovative design](https://vale.rocks/micros/20260810-0330):

<iframe title="Light/Dark/System Theme Setting" src="https://codepen.io/editor/OuterVale/embed/019fe98c-2d9b-71e4-849d-726543589635?default-tab=result&editable=true" loading="lazy" style="block-size: 18rem; inline-size: 100%;"></iframe>

<figure>

![System](images/vale-system.png)
![Light](images/vale-light.png)
![Dark](images/vale-dark.png)

</figure>

The core premise is quite clever: Three states with the real estate of two icons (33% saving over the typical tri-state control — though still double that of a two-state control), and clarity about whether you're selecting system or pinning a mode that happens to coincide with your current system setting.

However:
- As Vale themselves admit, some users did not realize they could revert the option they had selected, simply because that’s not a common interaction pattern. Vale does say this was a minority of users, and that it was "immediately understood by the great majority of people [they] tested it with", however I have doubts on whether this would hold true in the wild, when you haven’t already primed users to pay extra attention to the dark mode toggle.
- Vale claims that "It only takes up the space of a two-state toggle", but that’s not true. A two-state toggle only needs the real estate of one icon, not two.
- In its default state, nothing communicates "system". It is two icons with no indication of which is currently active. We understand that it’s a dark mode toggle, because it’s presented in isolation, in the context of an article about dark mode toggles. But used on an actual website, I wouldn't be surprised if users had no idea how to use it and only figured it out by trial and error.
Subtly highlighting what System currently resolves to could help here, but then we’re back distinguishing whether "light" means "System (light)" or "Light, always".

But most importantly, this is adding significant implementation and UI complexity for something that the vast majority of users don't devote _nearly_ as much thought to as we think they do.
In my opinion, this is **admirable effort that is ultimately solving a non-problem**.

#### Toni’s undoable two-state toggle

This is also quite interesting:

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:hi2as635pg63iytfw53yvnjl/app.bsky.feed.post/3msmb4cpz3c2h" data-bluesky-cid="bafyreihqofyihe53zck5bki775hmzyf5vehufxirigxxnozb665idy7ajq" data-bluesky-embed-color-mode="system"><p lang="en">i feel this is a good trade off if you want to give users the most control, even though i see your point that this is possibly too niche of an edge case to justify.

did i do the UX version of premature optimization, or does this just suck too?<br><br><a href="https://bsky.app/profile/did:plc:hi2as635pg63iytfw53yvnjl/post/3msmb4cpz3c2h?ref_src=embed">[image or embed]</a></p>&mdash; toni / link (<a href="https://bsky.app/profile/did:plc:hi2as635pg63iytfw53yvnjl?ref_src=embed">@sarcevic.dev</a>) <a href="https://bsky.app/profile/did:plc:hi2as635pg63iytfw53yvnjl/post/3msmb4cpz3c2h?ref_src=embed">August 9, 2026 at 2:49 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

It’s a two-state toggle that pins light/dark when interacted with, but provides a clear button.
This is similar to [Bramus’ idea](https://www.bram.us/2020/04/26/the-quest-for-the-perfect-dark-mode-using-vanilla-javascript/) but with more polish.

As [I said on bsky](https://bsky.app/profile/lea.verou.me/post/3msnaffzqh22w), I don’t think this particular design works because:
- Spacing makes it look like these are separate controls, not one clearing the other's selection
- The clear button has nothing associating it with the color scheme toggle (not proximity, nor its icon).

But none of these are core to the idea, and could be fixed with a little more UI design massaging.
If someone _really_ wanted to have three states visible at all times, a reworked version of this would probably be the best way (and can be designed to occupy similar screen real estate as a two-state toggle).

Should anyone spend the time to do this rework?
Like I wrote in the previous section, my opinion is that these efforts are pouring a great amount of brilliant creative energy
into solving a non-problem, so I would not recommend it.

### Chaotic Evil 😈 { #chaotic-evil }

The Big Dark Mode Toggle Debate™ raged on for weeks, and I think my favorite part of it was the side thread of people taking the piss and coming up with the _worst_ possible dark mode toggle designs imaginable 😅, possibly as a tribute or reprise of [The Worst volume control UI](https://uxdesign.cc/the-worst-volume-control-ui-in-the-world-60713dc86950).

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:tjm3za6clxgg7ian727ws65l/app.bsky.feed.post/3msg7el4bhc2w" data-bluesky-cid="bafyreiea77x4nmhtow7oglc3ehmgyz3whjdywvrhiuynkgoiopmvv3clxi" data-bluesky-embed-color-mode="system"><p lang="en">I reject your two-state toggle and submit my own 4-state toggle. Pray that I do not increase it to 5.<br><br><a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msg7el4bhc2w?ref_src=embed">[image or embed]</a></p>&mdash; Michael Ficarra (<a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l?ref_src=embed">@michael.ficarra.me</a>) <a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msg7el4bhc2w?ref_src=embed">August 6, 2026 at 5:02 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:tjm3za6clxgg7ian727ws65l/app.bsky.feed.post/3msg7zj7f5c2w" data-bluesky-cid="bafyreicuqmggceanpu5sljxjez5g636kbtxeiacyuose23xiqcj4azv7g4" data-bluesky-embed-color-mode="system"><p lang="en"><br><br><a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msg7zj7f5c2w?ref_src=embed">[image or embed]</a></p>&mdash; Michael Ficarra (<a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l?ref_src=embed">@michael.ficarra.me</a>) <a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msg7zj7f5c2w?ref_src=embed">August 6, 2026 at 5:13 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:tjm3za6clxgg7ian727ws65l/app.bsky.feed.post/3msgabzm6nc27" data-bluesky-cid="bafyreifmikesod2ni5hzbh4ypmgk7bentz3e5gklsksbwvmf4yisvwddq4" data-bluesky-embed-color-mode="system"><p lang="en"><br><br><a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msgabzm6nc27?ref_src=embed">[image or embed]</a></p>&mdash; Michael Ficarra (<a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l?ref_src=embed">@michael.ficarra.me</a>) <a href="https://bsky.app/profile/did:plc:tjm3za6clxgg7ian727ws65l/post/3msgabzm6nc27?ref_src=embed">August 6, 2026 at 5:18 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

Of course, I _had_ to participate:

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:eagnfcoqnbtzpkglrtej6ayg/app.bsky.feed.post/3msganlpmus23" data-bluesky-cid="bafyreicugbdb7gx53xvoe3626zqfvlrkewdboyx6qgtrp32wwp6727live" data-bluesky-embed-color-mode="system"><p lang="en">Oh but why stop there? 🤣<br><br><a href="https://bsky.app/profile/did:plc:eagnfcoqnbtzpkglrtej6ayg/post/3msganlpmus23?ref_src=embed">[image or embed]</a></p>&mdash; Lea Verou, PhD (<a href="https://bsky.app/profile/did:plc:eagnfcoqnbtzpkglrtej6ayg?ref_src=embed">@lea.verou.me</a>) <a href="https://bsky.app/profile/did:plc:eagnfcoqnbtzpkglrtej6ayg/post/3msganlpmus23?ref_src=embed">August 6, 2026 at 5:25 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:xhhcrzsilpamjmz4dvrpt7df/app.bsky.feed.post/3mtr22cpsb22u" data-bluesky-cid="bafyreiaci5t4iauzmx32rjkbvfqhq3uv3tefecr72pmp5kcaqzawg22wdm" data-bluesky-embed-color-mode="system"><p lang="en">I actually strive for perfect clarity with my color theme pickers.

codepen.io/editor/chris...<br><br><a href="https://bsky.app/profile/did:plc:xhhcrzsilpamjmz4dvrpt7df/post/3mtr22cpsb22u?ref_src=embed">[image or embed]</a></p>&mdash; Chris Coyier (<a href="https://bsky.app/profile/did:plc:xhhcrzsilpamjmz4dvrpt7df?ref_src=embed">@chriscoyier.net</a>) <a href="https://bsky.app/profile/did:plc:xhhcrzsilpamjmz4dvrpt7df/post/3mtr22cpsb22u?ref_src=embed">August 23, 2026 at 5:51 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:kzbz4qsltwkq3baxgue7ju4k/app.bsky.feed.post/3mtt4cbrufs24" data-bluesky-cid="bafyreigm5lysdg2cfjcljtja7q4vzc5suhb63dp5z2v7n664l45onnjn3a" data-bluesky-embed-color-mode="system"><p lang="en">Did anyone already mention &quot;Dark mode with spotLight&quot;? No!? That&#x27;s the only valid way.

Demo: codepen.io/t_afif/pen/Y... via @codepen.io

Debating about toggles? Well, I don&#x27;t understand ...<br><br><a href="https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3mtt4cbrufs24?ref_src=embed">[image or embed]</a></p>&mdash; CSS by T. Afif (<a href="https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k?ref_src=embed">@css-only.dev</a>) <a href="https://bsky.app/profile/did:plc:kzbz4qsltwkq3baxgue7ju4k/post/3mtt4cbrufs24?ref_src=embed">August 24, 2026 at 1:36 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:jrfasgrfx46fby4mn5qskd4k/app.bsky.feed.post/3mtnwbdr6yc24" data-bluesky-cid="bafyreieb2s6reexytch4acbznbvq362wcpw4qmehf7ts6mlweigniv3vom" data-bluesky-embed-color-mode="system"><p lang="en">Anything below 4 is unacceptable. right @svenning.io<br><br><a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k/post/3mtnwbdr6yc24?ref_src=embed">[image or embed]</a></p>&mdash; Andreas Møller (<a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k?ref_src=embed">@andreasmoller.dk</a>) <a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k/post/3mtnwbdr6yc24?ref_src=embed">August 22, 2026 at 12:05 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

This may be my favorite:

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:jrfasgrfx46fby4mn5qskd4k/app.bsky.feed.post/3mtnvx4l32224" data-bluesky-cid="bafyreib5mts4wpcbbdqdl22q4l5wvd4kloenqus5dfynacpwhtmrk4hqsa" data-bluesky-embed-color-mode="system"><p lang="en">The current debate between 2 vs 3 state theme switchers is ridiculous.  Everyone knows that the right answer is 100

#css #a11y<br><br><a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k/post/3mtnvx4l32224?ref_src=embed">[image or embed]</a></p>&mdash; Andreas Møller (<a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k?ref_src=embed">@andreasmoller.dk</a>) <a href="https://bsky.app/profile/did:plc:jrfasgrfx46fby4mn5qskd4k/post/3mtnvx4l32224?ref_src=embed">August 22, 2026 at 11:59 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:kc66te46cf4pmnkugea7fe5d/app.bsky.feed.post/3mtwuswoj3s2m" data-bluesky-cid="bafyreieg6rtotqedry4xybr6qhtuvdbk3vpsbmx5kflqc53cs73krsp3be" data-bluesky-embed-color-mode="system"><p lang="en">Two-state, tri-state, four-state...why should we concern ourselves with this anyway? I say users should not get this for free at all; therefore, I introduced a new mode in this article called capitalism mode ✅

codepen.io/editor/sunka...

#css<br><br><a href="https://bsky.app/profile/did:plc:kc66te46cf4pmnkugea7fe5d/post/3mtwuswoj3s2m?ref_src=embed">[image or embed]</a></p>&mdash; Sunkanmi Fafowora (<a href="https://bsky.app/profile/did:plc:kc66te46cf4pmnkugea7fe5d?ref_src=embed">@sunkanmifafowora.bsky.social</a>) <a href="https://bsky.app/profile/did:plc:kc66te46cf4pmnkugea7fe5d/post/3mtwuswoj3s2m?ref_src=embed">August 26, 2026 at 1:33 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

## Could the best dark mode toggle be …none?

However, my biggest insight from all of this is that while I stand by my original recommendation that in most cases, if you _are_ going to have a dark mode toggle that is visible at all times, it should only have two states (system and opposite), I now think that for the vast majority of websites, **you should _not_ have such a toggle at all**.

Follow system as the default, and if need be have a separate settings panel (even if it's not actually implemented as a separate page but just an overlay) and put it there.
It simply doesn't warrant permanent screen real estate for the vast majority of users.

The eye-opening moment was when I sent my post to a colleague who is also an HCI PhD, to get their feedback on whether my reasoning was sound, or whether I had any blind spots.
For background, this was someone who was much less immersed in the technical weeds of the Web — their work centers more around humans than around deep technical details.

I expected either agreement or constructive criticism, but what I got was much more eye-opening:
It turned out that **they had _no_ idea what control the article was talking about**!
Folks, …they had never seen a dark mode toggle!^[or — perhaps more likely — never paid attention to one]

And then it dawned on me: all these persistent dark mode toggles I had seen, literally **_all of them_ have been on developer-facing sites**!

**I could not think of a single well-known consumer-facing site with a persistent dark mode toggle.**
All consumer-facing websites that supported this functionality displayed it in a separate settings panel ([which is a different use case](../dark-mode-toggles/#settings)).
Even those where people spend hours a day in, like Gmail, Facebook, BlueSky, etc.
None of them see this as a use case that deserves precious header real estate.

<figure>
<img src="images/wikipedia.png" alt="Wikipedia with the settings panel expanded" />
<figcaption>

Wikipedia does show this sidebar by default on large enough viewports, but this is not an exception — just an auto-expanded settings panel.
</figcaption>

</figure>

Now, this alone is not evidence that dark mode toggles are a bad idea.
A pattern can be widespread and still suffer from poor usability.
And every UX innovation started off not being popular, so the reverse doesn’t hold either: a pattern can be unpopular and still be good.
But in this case, I think they’re right.
It suddenly all made sense to me: this doesn't matter _nearly_ as much to the average user as it does to us developers.

To be clear: "always light/dark, even against the OS" _is_ a legitimate intent!
But it is also a relatively rare one, and rare intents belong behind [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) — a settings surface — not in the one control every visitor sees.

In a textbook case of [false-consensus bias](https://www.nngroup.com/articles/false-consensus/),
**we have been so focused on our debugging needs that we convinced ourselves this is top of mind for the average user.**

### When is a persistent dark mode toggle a good idea?

A corollary from the reasoning above is that a dark mode toggle is a good idea when the website is _developer-facing_ or _developer-adjacent_ (e.g. a site for designers).


## Experimental validation

**Usability is a property of user outcomes**, and no users were observed in any of this.
Even my own article was derived from first principles and my experience observing users, but no actual observations of users interacting with dark mode toggles were made.

Per the previous section, I’m not convinced this is a problem worth solving.
That said, if we _do_ want to solve it, the best answer is obviously to get data from real user interactions.

However, there is a caveat here: [_qualitative user testing_](https://www.nngroup.com/articles/usability-testing-101/)^[The kind where you get a few users and observe them using the UI to accomplish a task — i.e. what most people refer to as just "user testing"] **is less useful for infrequent microinteractions** like this one.

Think about it: how would you design a meaningful qualitative experiment?
At best, any subject would only interact with the toggle once.
Most wouldn't click it at all, unless the experiment was designed to show a website where the OS default theme is awful, which generalizes poorly.

Another easy bias in a controlled experiment is that it’s easy to bias the results by drawing attention to things that users would otherwise pay much less attention to.
E.g. Vale wrote that the 3-in-2 switch was "intuitive and immediately understood by the great majority of people [they’ve] tested it with".
I strongly suspect these users were aware that something around dark mode toggles was being tested, and were paying a lot more attention to the control than they organically would.

I think the best way to get data for something like this is to record how users _actually_ interact with the control, at scale, then analyze the data quantitatively.
The experiment could involve different toggle designs as separate conditions.

Then, we could look at the data to answer questions like:
- How frequently do people interact with the control meaningfully (i.e. ending up with a different selection)? (to see if it’s worth permanent screen real estate)
- On a tri-state control, how frequently do users actually select the option that matches system but isn't system? (to see if you actually need three states)
- For mouse users, how much time passes between hovering the control and making a final selection for each condition and how many clicks does it involve? (as a proxy for cognitive load)
- etc

<article class="note">

By _select_ above, I’m not referring to clicking, but the actual, final selection, to avoid noise from people playing with the control just to see what it does.

</article>

## The big picture: Question the problem first

It is easy to get deep into a rabbit hole of trying our hardest to solve a problem that shouldn’t exist in the first place.

Especially for those of us with an engineering background, problem-solving comes naturally and it’s very hard to resist a challenging problem.

I’ve seen this happen repeatedly in many types of technical debates.
It’s very common in standards groups as well: someone proposes a feature and the group starts debating the details before deciding whether the feature should exist _at all_.

Before any significant problem-solving task, it’s always good practice to step back and ask ourselves _"is this a real problem worth solving?"_.

You’d be surprised how often the answer is _no_.
