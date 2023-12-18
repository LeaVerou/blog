## Examples of eigensolutions

<div class=note>

A lot of my work (that I can share) is on text-based creator tools, which are not the best examples as they tend to require a lot of context to understand.
I decided to go ahead and include two examples from my own work, rather than not include examples at all or hold the post back until I can come up with better ones.
If you have good examples in mind that require less context to understand, please share in the comments!

</div>

<details>
<summary>
Mavo dynamic structured values
</summary>

[Mavo](https://mavo.io/) is a programming language I developed while doing my PhD at MIT.
Its vision is to lower the barrier of developing full stack data-driven web applications down to the skills required to write HTML and spreadsheet-like[^1] formulas.
While HTML or spreadsheet formulas still require technical expertise, it is orders of magnitude lower than what is currently needed to build web applications,
especially applications that support login and/or cloud storage.

[^1]: I say "spreadsheet-like", because its formula language, MavoScript, was designed to be much easier for humans to read & write than spreadsheet formulas,
and to make the kinds of use cases that arise in data-driven web applications easier to express.

At first, Mavo formulas were only used to calculate and output atomic values, such as text, numbers, or dates.
Structured data like lists or objects was supported, but was mainly used as intermediate values; output was text-only.
For example, displaying the number of completed items in a to-do list, or concatenating multiple slider values together into a color value.

Over time, our use case backlog collected a number of use cases, which at first glance appeared unrelated:
1. Filtering lists based on discrete property values (e.g. show only tasks with certain statuses)
2. Displaying unions of data from multiple lists
3. Pivot tables: displaying a list of unique values with aggregate stats about their usage in the list (usually counts, but also min, max, average, etc.)
4. Displaying a fallback value while an expression is calculating or if it fails
5. Displaying programmatically generated data (e.g. a list of numbers from 1 to 10) with actual UI around each item

One solution we designed for the last one was an `mv-value` attribute that could be used on any element and would take a formula as its value
and display the result of that formula using the element as a template.
If the formula result changes, the displayed data updates reactively, just like regular formulas.
Using `mv-value` on lists trivially addresses use case 5:

```html
<input type="range" property="max" />
<div mv-multiple mv-value="1 .. max"></div>
```

But `mv-value` turned out to be an eigensolution: it provided a lower level primitive that could also be used to implement many other use cases
it was not conceived for.

When used on elements without structure, it behaved very similarly to just including a formula within the element,
with one key difference: if the formula failed, or while it was calculating (for async formulas),
the element contents would be displayed as a fallback value, addressing use case 4.

```html
<span mv-value="count(task)">0</span> items
```

Filters could now be created by using `mv-value` with a `unique()` formula, to generate a list of checkboxes, one for each unique value of a property,
and then using the values in a regular formula that toggles item visibility, addressing use case 1.[^2]

Unions of multiple lists (use case 2) can be implemented by simply using `mv-value="list(list1, list2, ...)"` on a list with the right structure [^3].

Pivot tables (use case 3) can be implemented by `mv-value` and either
a) a `unique()` formula, then a `count()` (or `max()` etc) within each item,
b) grouping, which is more efficient, but came later.
In fact, filters are often mini pivot tables, with the count being used to show the number of items that match the filter.

[^2]: This is still too involved to be the primary way to implement filters,
and coming up with a higher level primitive is an open problem.
But at least it is now about making it *easier*, rather than making it *possible*.

[^3]: This is not ideal because Mavo does not handle view updates well: mv-value data is not editable by default, and even when forced to be editable, edits do do not propagate back to the original data.
But many use cases did not require editing, and that is more of a bug than a fundamental limitation.

</details>

<details>
<summary>
CSS `inherit()` function
</summary>

[CSS](https://en.wikipedia.org/wiki/CSS) is a language used to define the presentation of literally every website on the web.
I’ve been in the CSS Working Group since 2012, and have seen, designed, and worked on my fair share of solutions, and a few eigensolutions.

One of my CSS proposals that was recently accepted is for an [`inherit()` function](https://github.com/w3c/csswg-drafts/issues/2864),
which would allow descendant elements to reference the parent value of *any* CSS property,
which enables a broad set of existing seemingly unrelated use cases:

- CSS variables that build on the parent value, e.g. nesting level
- Font weight that is relative to the parent (a bigger pain point after variable fonts)
- Inner corner rounding that correctly follows the parent
- Swapping foreground and background colors on accent elements
- Elements that “bleed” out of their parents margins
- Box decorations that create irregular shapes

There were existing proposals for some of these, some of which did suffer from overfitting,
while others can still be implemented as shortcuts, but with much lower priority.

TBD: add a bit more context

</details>