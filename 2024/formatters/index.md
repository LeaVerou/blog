---
title: On code formatters
image: "images/image.png"
draft: true
page_css: true
---

It has been a decade since I [last wrote](/blog/2012/01/why-tabs-are-clearly-superior/) a blog post on code formatting issues.
As most people who have been writing code for decades, I have opinions of the subject, but it is generally considered inappropriate to express them;
the coding equivalent of discussing politics or religion.

So what prompted this? One of Color.js’ most skilled and prolific maintainers, [Jonny Gerig Meyer](https://github.com/jgerigmeyer) submitted a [PR to add Prettier to Color.js](https://github.com/LeaVerou/color.js/pull/351).
When somebody is contributing that amount of work, you can’t just respond "no, thanks" (if you do, YTA), you owe them a proper explanation.
Not just as a matter of courtesy, but also because constructive debate is the best way to uncover your own blind spots and reach the best solution.

I started writing this as a PR review, but quickly realized it should be saved for posterity, as it's not a viewpoint that is talked about much.

## Code as a user interface

There is a widespread sentiment that code formatting is a matter of personal preference, and that it is not worth discussing.
That if you care about it you can’t see the forest for the trees.

I disagree.

First, the existence of more important things, doesn't make the smaller things not worthy of discussion (claiming the opposite is [a common logical fallacy](https://academy4sc.org/video/fallacy-of-relative-privation-all-problems-are-relative/)).
In fact, in many prioritization frameworks, small problems can often rise to the top because they are often far easier to fix (quick wins).
Second, code formatting is not inconsequential, and not all a matter of personal preference.

**Code is a user interface.**
[Many](https://medium.com/@PhiJay/code-is-a-user-interface-daeff886a440) [have](https://www.arei.net/) [made](https://www.linkedin.com/pulse/your-code-user-interface-rainbough-phillips/) [this](https://cloudnative.ly/code-is-a-user-interface-25a1fe30590e) point, including yours truly in my [JS UX talk](/speaking/) c. 2016.
In the same way that graphic design affects the usability of a GUI ([great design can even make a UI *appear* more usable](https://www.nngroup.com/articles/aesthetic-usability-effect/)), formatting absolutely affects the usability of code (I even suspect there is a version of the aesthetic usability effect that applies to code).

A common quote in favor of Prettier is *“Nobody loves what Prettier does to their syntax. Everyone loves what Prettier does to their coworkers' syntax.”*,
further reinforcing the idea that code formatting is a matter of personal preference.
Just like graphic design, certain aspects certainly are a matter of personal preference (e.g. single vs double quotes).
However, others genuinely improve or degrade usability.
This becomes obvious when you consider the logical extreme: trying to process code that has no formatting at all (e.g. minified code).

## Can we automate it?

In the last couple of years, tools like [Prettier](https://prettier.io/) have become popular.
These tools are used to automatically and deterministically format code according to a set of rules.
They go beyond ESLint’s `--fix` option, which targets specific violations.
Instead, they leave no wiggle room: every bit of whitespace, every comma, every semicolon is predetermined.
Given an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and a set of formatting rules, there is exactly one possible serialization.

The benefits cited for this approach are typically:
1. Contributors don't need to expend mental energy trying to determine stylistic expectations.
2. Codebase uses a consistent style, reducing inconsistencies between different files.
3. No more bikeshedding about formatting.

In fact, the first two also listed in Jonny’s [PR](https://github.com/LeaVerou/color.js/pull/351).

However, linting gets you 1 and 2, and I’m not sure how common 3 really is.
Typically formatting is decided early on, and future contributors just adopt the existing formatting rules.
I’ve been in both positions (setting the formatting style or following what was there from before me), and there was never any bikeshedding about formatting.
Furthermore, for 1 to work, contributors need to have Prettier installed, which is not always the case.

What I see most frequently with Prettier is [people fighting against its default behavior](https://github.com/prettier/prettier-vscode/issues/352), using convoluted workarounds or littering their codebase with `// prettier-ignore` comments.
I think these kinds of comments are a code smell.
**Testing, linting, or formatting tools should not leave traces in the codebase**, as that reverses the chain of dependency (though this may indicate a standardization opportunity, for such comments that are processed by all tools instead of tooling-specific ones).

I also see several drawbacks with taking the human out of the equation.
These tools operate under the assumption that wiggle room is bad.
That consistency is more important than optimal readability.
I think this is throwing the baby out with the bathwater.
The wiggle room can be used to **enhance communication and improve scannability in ways that cannot be determined by looking at an AST**.

## The Good

Due to this PR I took a deeper look at [Prettier](https://prettier.io/), and there is a lot to like:

- Its default formatting is pretty good, in my experience superior to what >80% of engineers do manually.
It’s *much* smarter than any automated formatters that came before it (which often tended to *reduce* readability).
- Code formatting is not actually 100% determined by the AST, some types of manual formatting are preserved, such as [whether object literals are on one line or multiline](https://prettier.io/docs/en/rationale#multi-line-objects),
and [blank lines](https://prettier.io/docs/en/rationale#empty-lines).
- Even though it has a line length setting, it's used as a mere hint, avoiding the …atrocities generated by other formatters.
- When tabs are used, it [claims](https://prettier.io/docs/en/options#tabs) they are (correctly) [only used for indentation, not alignment](/blog/2012/01/why-tabs-are-clearly-superior/).
Unfortunately I was not able to verify this in a [quick test](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEA3AhgJwAQDMITYC82AjADQA6UlMARlsdgEwDc11I5IEADjAEtoAZ2SgsmCAHcAClgSiU6ADZT0AT1Hc6mdGADWcGAGV0AWzgAZAVDjJcK4XG26DR47z02A5shiYAV2cQJzMBP0Dg4R9lOABFAIh4e0dggCthAA9jGPjE5KQHZSduAEd8uBlJXkUQdGEAWls4ABNWrhB-dAFlHwBhCDMzdGQ65WUO6KhvWIBBGH8BOgD4GThMa1sU4uCACxgzZQB1XYF4YU8wOGMFM4FUM-VRsGEtNCCASSg22GMwTAE-Fm32MMHUsW2JRAvEkTiOul4oxhcCcmFQdm4NlRMCq6G8w0hwU8mFRowYdDgE24MJsMCOAhaMF2yAAHAAGbiYODlARc3H4kaFVLcGDoOj0xnMpAAFm4AScABUxYp-EFuHAzBSWm0WpZ0NMAni4AAxCCYYYLHyjdArCAgAC+9qAA).
- I was very impressed that it even formats code in Markdown code blocks!

## Formatting is Communication

Formatting can be used to communicate meaning that cannot be determined by looking at an AST.
A few examples below:

- **Trailing zeroes:** Despite what Prettier thinks, `5.000` is not the same as `5`.
Trailing zeroes have a lot of uses, from communicating precision to alignment (as we will see below).
- **Quoted vs unquoted property names:** one can use unquoted property names when they are predetermined by a schema (e.g. function options) and quoted propery names when they are arbitrary, syntactically distinguishing objects-as-dictionaries and objects-as-records.
- **Trailing commas:** one could include a trailing comma in multiline arrays and objects that can have an arbitrary number of items, but not in those that are fixed.
- **Grouping:** Empty lines separate chunks of logic (thankfully [preserved](https://prettier.io/docs/en/rationale#empty-lines) by Prettier).
- **Indentation**: In pre-nesting CSS, it's common to indent rules that are inside another rule in the HTML, a distinction completely lost with Prettier, which simply sees this as erroneous indentation.

Things like these require human judgement, and cannot be determined by the AST alone (though some can be determined if using TS or thorough JSDoc annotations).

## Formatting aids scannability

Beyond communicating additional meaning, formatting can also be used to make code easier to scan, and this can not always be automated.

### Alignment

Seemingly pointless cruft like extra spaces between tokens and trailing zeroes are often alignment aids.
Especially in Color.js, where we have a lot of matrices with some pretty long numbers, which became totally mangled by Prettier.

A few real examples below:

<table class="language-js before-after">
	<tr>
		<th>Before</th>
		<th>After</th>
	</tr>
	<tr>
		<td>
			<pre><code>
				const ConetoIab_M = [
					[  0.5,       0.5,       0        ],
					[  3.524000, -4.066708,  0.542708 ],
					[  0.199076,  1.096799, -1.295875 ]
				];
			</code></pre>
		</td>
		<td>
		<pre><code>
				const ConetoIab_M = [
					[0.5, 0.5, 0],
					[3.524, -4.066708, 0.542708],
					[0.199076, 1.096799, -1.295875],
				];
			</code></pre>
		</td>
	</tr>
	<tr>
		<td>
			<pre><code>
				const IabtoCone_M = [
					[ 1,                   0.1386050432715393,   0.05804731615611886 ],
					[ 0.9999999999999999, -0.1386050432715393,  -0.05804731615611886 ],
					[ 0.9999999999999998, -0.09601924202631895, -0.8118918960560388  ]
				];
			</code></pre>
		</td>
		<td>
			<pre><code>
				const IabtoCone_M = [
					[1, 0.1386050432715393, 0.05804731615611886],
					[0.9999999999999999, -0.1386050432715393, -0.05804731615611886],
					[0.9999999999999998, -0.09601924202631895, -0.8118918960560388],
				];
			</code></pre>
		</td>
	</tr>
	<tr>
		<td>
			<pre><code>
				const LMStoIPT_M = [
					[  2048 / 4096,   2048 / 4096,       0      ],
					[  6610 / 4096, -13613 / 4096,  7003 / 4096 ],
					[ 17933 / 4096, -17390 / 4096,  -543 / 4096 ]
				];
			</code></pre>
		</td>
		<td>
			<pre><code>
				const LMStoIPT_M = [
					[2048 / 4096, 2048 / 4096, 0],
					[6610 / 4096, -13613 / 4096, 7003 / 4096],
					[17933 / 4096, -17390 / 4096, -543 / 4096],
				];
			</code></pre>
		</td>
	</tr>
	<tr>
		<td>
			<pre><code>
				const toXYZ_M = [
					[ 0.7977604896723027,  0.13518583717574031,  0.0313493495815248     ],
					[ 0.2880711282292934,  0.7118432178101014,   0.00008565396060525902 ],
					[ 0.0,                 0.0,                  0.8251046025104601     ]
				];
			</code></pre>
		</td>
		<td>
			<pre><code>
				const toXYZ_M = [
					[0.7977604896723027, 0.13518583717574031, 0.0313493495815248],
					[0.2880711282292934, 0.7118432178101014, 0.00008565396060525902],
					[0.0, 0.0, 0.8251046025104601],
				];
			</code></pre>
		</td>
	</tr>
</table>

Prettier does know about this, but just [recommends using `prettier-ignore` comments](https://prettier.io/docs/en/ignore#javascript) to disable it.

</aside>

### Whitespace

Strategically placed whitespace can improve scannaibility in many ways.
Alignment is one of them, but there are others.

Take for example the **space before the opening paren of a function**.
I tend to use one in function *definitions* and none in function *calls*.
This means I'm not dependent on tooling to find the definition of a function, it’s a simple textual search that I could even do in something like CodePen.
ESLint actually has separate rules for function calls and definitions, but Prettier has a [philosophy against configuration](https://prettier.io/docs/en/option-philosophy).

### Brace style

Prettier favors the [1TBS style](https://en.wikipedia.org/wiki/Indentation_style#Variant:_1TBS_(OTBS)),
a (very popular) brace style that favors compactness over readability.
In multi-block statements (e.g. `if .. else if .. else`, `try .. catch` etc.) the closing brace of a multi-block statement is on the same line as the next block:

```js
if (foo) {
  // ...
} else {
  // ...
}
```

While this results in fewer lines, it reduces scannability: seeing `else` or `catch` is far more informative than seeing `}` over and over.

```js
if (foo) {
  // ...
}
else {
  // ...
}
```

*(How do you make blocks visually distinct then? Blank lines!)*

Unfortunately, the latter is not possible with Prettier.

### Indentation

Using [spaces for alignment and tabs for indentation](/blog/2012/01/why-tabs-are-clearly-superior/) enables people to use the indentation level they prefer, without affecting the indentation level of others. In theory [Prettier supports that](https://prettier.io/docs/en/options#tabs), but I was not able to verify this in a [quick test](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEA3AhgJwAQDMITYC82AjADQA6UlMARlsdgEwDc11I5IEADjAEtoAZ2SgsmCAHcAClgSiU6ADZT0AT1Hc6mdGADWcGAGV0AWzgAZAVDjJcK4XG26DR47z02A5shiYAV2cQJzMBP0Dg4R9lOABFAIh4e0dggCthAA9jGPjE5KQHZSduAEd8uBlJXkUQdGEAWls4ABNWrhB-dAFlHwBhCDMzdGQ65WUO6KhvWIBBGH8BOgD4GThMa1sU4uCACxgzZQB1XYF4YU8wOGMFM4FUM-VRsGEtNCCASSg22GMwTAE-Fm32MMHUsW2JRAvEkTiOul4oxhcCcmFQdm4NlRMCq6G8w0hwU8mFRowYdDgE24MJsMCOAhaMF2yAAHAAGbiYODlARc3H4kaFVLcGDoOj0xnMpAAFm4AScABUxYp-EFuHAzBSWm0WpZ0NMAni4AAxCCYYYLHyjdArCAgAC+9qAA).

Furthermore, indentation can often be used to communicate meaning (e.g. see above for a use in pre-nesting CSS to communicate containment).

In some cases, replacing certain types of indentation with blank lines before and after the content can improve readability by reducing the nesting level.
Two examples:
- I've stopped indenting the contents of `<head>` and `<body>` years ago.
Nearly every HTML element is a child of one of these two, so it does not add value and just increases horizontal scrolling.
Instead, I use a blank line before and after their contents to make them visually distinct.
Because Prettier needs to have a one-size-fits-all solution, it cannot do this.
- Similarly, for pre-ES5 IIFEs that spanned the whole file, indenting their contents was just added a pointless level of indentation to the entire module.

## Conclusion: Why all or nothing?

Looking at the changes this PR introduced to the codebase, the vast majority are actually good!
Because it is true, if humans have to maintain the formatting rules, they slip.
And it takes contributors time to get up to speed with the coding style of a project, which Prettier eliminates (sort of — new contributors may not have it installed, which entirely defeats the purpose).

But Prettier is all-or-nothing, it is not possible to incrementally adopt, or configure.
I would *love* something like Prettier where you opt-in to the rules applied and it obeys the manual style for everything else.
Basically like ESLint's `--fix` option, but smarter.
I’ve heard good things about VS Code’s formatter, and that might be something to try.

I would love it even more if you could also override the rules on a case-by-case basis, without leaving traces in the codebase.

Perhaps the solution is to have Prettier in but disabled, and periodically use it to catch formatting slips (GitHub Desktop or similar makes it easy to only commit partial diffs).
Or to find another formatter that is sufficiently flexible and granular that we could have it enabled all the time.