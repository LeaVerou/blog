---
permalink: false
---

As a trivial example, what is wrong with this function?

```js
/* Calculate a right triangle's perimeter given its sides */
function get_right_triangle_perimeter(a, b, c) {
  return a + b + c;
}
```

Given that this is a right triangle, the third side is the hypotenuse, and can be [calculated](https://en.wikipedia.org/wiki/Pythagorean_theorem) from the other two.
Requiring users to enter it manually simplifies the implementation, but at the expense of additional user effort.
Additionally, this introduces an unnecessary error condition: what happens if the user enters the wrong `c`?

Contrast with:

```js
/* Calculate a right triangle's perimeter given its sides */
function get_right_triangle_perimeter(a, b) {
  return a + b + Math.sqrt(a * a + b * b);
}
```

----

## When a shorter curve is the right call

Every design principle is a rule of thumb, not a hard and fast law.
Sometimes, there are good reasons not to make the curve extend across the entire spectrum.

### When not motivated by user needs

<figure class="outlined float">
  <object data="images/curve-photoshop.svg"></object>
</figure>

Some products are framed exactly around only one end of the spectrum.
While they could do better and extend their curve a little bit, their entire value proposition is around one end of the spectrum,
so it doesn't make a lot of sense to invest resources in improving the other end.

Professional tools are an example where focusing around complex things being possible may be acceptable, such as airplane cockpits, or Photoshop.
Tools that require a high level of domain expertise can typically afford to require some training,
as said training often happens at the same time as acquiring the domain expertise.
For example, a pilot learns how an airplane cockpit works while also learning how to fly.

For many of these tools, use cases are so variable that making simple things significantly easier would turn them into a different product.
For example, Photoshop is a professional-grade graphics editor, that can be used for a large variety of graphics-related tasks.
Focusing around a specific subset of use cases, say photo manipulation, doesn't give us a better Photoshop UI, it gives us Lightroom.
Is there a way to combine the two into a single product so that users don't need to understand when to use which tool, without making both actively worse?
Perhaps, but it's not at all obvious.

On the other hand, something like Instagram’s photo editor makes it trivial to perform simple photo manipulations that look good with very little user effort and no domain expertise (low floor),
but is quite limited in its capabilities; there are many things it simply cannot do (low ceiling).
While there is a lot of room for improvement, making significantly more complex things possible is largely out of scope as beyond a certain point it would require domain expertise that Instagram's target audience lacks.





### Security & privacy

Sometimes, decomposing a high-level solution into low-level primitives can introduce security & privacy issues that a more tightly coupled high-level solution can avoid.

When I was in the TAG, at some point we reviewed a proposal for a low-level API which would allow websites to read the list of fonts installed on the user's system.
This raised huge red flags about user privacy and [fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint).
However, upon closer inspection, it turned out that nearly use cases were highly concentrated,
and were all variations of the same scenario:
letting end-users select a font from their system to apply it to a given artifact (e.g. a document, a graphic etc).
A high-level font picker form control where the browser takes care of displaying the list of fonts and only communicates the selected font back to the application would _both_ address privacy concerns _and_ make the API easier to use.

### Performance

Sometimes, design decisions are driven by performance considerations, rather than usability principles.
For example, CSS selectors got `:focus-within` to match elements that contained a focused element long before `:has()` was added, which allows targeting ancestors in a much more generic way.
There was no question that `:has()` would have been a better solution, but it was considered impossible to implement performantly at the time `:focus-within` was designed.
And even today, browsers apply certain optimizations to `:focus-within` that make it perform better than `:has()`.

Other times, sensible defaults are not possible because the common case is also the slowest.
This is the reason why [`inherits`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property/inherits) is mandatory when registering CSS properties:
the default that would be best for users (`true`) is also the slowest, but making `false` the default would mean that registered properties behave differently from native properties by default.
Instead, it was decided to not have a default, and make the descriptor mandatory.

