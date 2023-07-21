---
title: "Responsive tables, revisited"
date: "2018-05-14"
tags:
  - "original"
  - "tips"
---

[![Screenshot showing a table with 3 rows turning into 3 sets of key-value pairs](images/Screen-Shot-2018-05-14-at-17.54.45-copy-1024x595.png)](images/Screen-Shot-2018-05-14-at-17.54.45-copy.png)

[Many people have explored responsive tables](https://css-tricks.com/responsive-data-tables/). The usual idea is turning the table into key-value pairs so that cells become rows and there are only 2 columns total, which fit in any screen. However, this means table headers need to now be repeated for every row. The current ways to do that are:

- Duplicating content in CSS or via a data-\* attribute, using generated content to insert it before every row.
- Using a definition list which naturally has duplicated `<dt>`s, displaying it as a table in larger screens.

A few techniques that go in an entirely different direction are:

- Hiding non-essential columns in smaller screens
- Showing a thumbnail of the table instead, and display the full table on click
- Displaying a graph in smaller screens (e.g. a pie chart)

I think the key-value display is probably best because it works for any kind of table, and provides the same information. So I wondered, is there any way to create it without duplicating content either in the markup or in the CSS? After a bit of thinking, I came up with two ways, each with their own pros and cons.

Both techniques are very similar: They set table elements to display: block; so that they behave like normal elements and duplicate the `<thead>` contents in two different ways:

1. Using text-shadow and creating one shadow for each row
2. Using the element() function to duplicate the entire thead, styles and all.

Each method has its own pros and cons, but the following pros and cons apply to both:

- **Pros:** Works with normal table markup
- **Cons:**
    - All but the first set of headers are unselectable (since neither shadows nor element()-generated images are real text). However, keep in mind that the techniques based on generated content also have this problem — and for all rows. Also, that the markup screen readers see is the same as a normal table. However, it's still a pretty serious flaw and makes this a hack. I'm looking forward to seeing more viable solutions.
    - Only works if none of the table cells wrap, since it depends on table cells being aligned with their headers.

### Using text-shadow to copy text to other rows

- **Additional Pros:** Works in every browser
- **Additional Cons:** Max Number of rows needs to be hardcoded in the CSS, since each row needs another text shadow on `<thead>`. However, you can specify more shadows than needed, since overflow: hidden on the table prevents extra ones from showing up. Also, number of columns needs to be specified in the CSS (the `--cols` variable).

[Demo](https://dabblet.com/gist/969a4aa9d53bf6893d72acd422b2e9a8)

<iframe src="https://dabblet.com/gist/969a4aa9d53bf6893d72acd422b2e9a8" width="100%" height="500px"></iframe>

### Using element() to copy the entire `<thead>` to other rows

- **Additional Cons:** `element()` is currently only supported in Firefox :(

[Demo](https://dabblet.com/gist/9bce82d186095d4d9b19a469085e9cb3)

<iframe src="https://dabblet.com/gist/9bce82d186095d4d9b19a469085e9cb3" width="100%" height="500px"></iframe>
