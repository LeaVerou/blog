---
title: "Pure CSS Tic Tac Toe"
date: "2011-06-17"
tags:
  - "original"
  - "css"
  - "selectors"
  - "indeterminate"
---

It's supposed to be used by 2 people taking turns (click twice for the other sign).

Basic idea:

- It uses hidden checkboxes for the states (indeterminate means empty, checked means X, not checked means O) and labels for the visible part
- When it starts, a little script (the only js in the demo) sets the states of all checkboxes to indeterminate.
- It uses the `:checked` and `:indeterminate` pseudo-classes and sibling combinators to change the states and show who won.
- Once somebody clicks on a checkbox (or in this case, its label) they change it's state from indeterminate to either checked or not checked, depending on how many times they click on it.

**As a bonus, it's perfectly accessible through the keyboard** (although I assume it's not screen reader accessible).

A `<table>` would be much more appropriate for the markup, but I decided to sacrifice semantics in this case to make the demo simpler.

All modern browsers support the indeterminate state in checkboxes (for Opera you will need the latest Opera.Next), however **this demo doesn't work on old Webkit (Chrome and Safari) because of an old bug** that made the sibling combinators (+ and ~) static in some cases which has been fixed in the nightlies. **It should work in Firefox, Opera.next, Webkit nightlies and IE9, although I haven't tested in Opera.next and IE9 to verify.**

Enjoy:

<iframe style="width: 100%; height: 350px" src="https://jsfiddle.net/leaverou/5X5Tq/embedded/result,css,html,js"></iframe>
