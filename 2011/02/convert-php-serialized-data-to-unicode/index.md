---
title: "Convert PHP serialized data to Unicode"
date: "2011-02-13"
categories:
  - "original"
  - "tips"
tags:
  - "i18n"
  - "php"
  - "unicode"
  - "php"
---

I recently had to convert a database of a large Greek website from single-byte Greek to Unicode (UTF-8).
One of the problems I faced was the stored PHP serialized data: As PHP stores the length of the data (in bytes) inside the serialized string, the stored serialized strings could not be unserialized after the conversion.

I didn't want anyone to go through the frustration I went through while searching for a solution, so here is a little function I wrote to recount the string lengths, since I couldn't find anything on this:

```php
function recount_serialized_bytes($text) {
	mb_internal_encoding("UTF-8");
	mb_regex_encoding("UTF-8");

	mb_ereg_search_init($text, 's:[0-9]+:"');

	$offset = 0;

	while(preg_match('/s:([0-9]+):"/u', $text, $matches, PREG_OFFSET_CAPTURE, $offset) ||
		  preg_match('/s:([0-9]+):"/u', $text, $matches, PREG_OFFSET_CAPTURE, ++$offset)) {
		$number = $matches[1][0];
		$pos = $matches[1][1];

		$digits = strlen("$number");
		$pos_chars = mb_strlen(substr($text, 0, $pos)) + 2 + $digits;

		$str = mb_substr($text, $pos_chars, $number);

		$new_number = strlen($str);
		$new_digits = strlen($new_number);

		if($number != $new_number) {
			// Change stored number
			$text = substr_replace($text, $new_number, $pos, $digits);
			$pos += $new_digits - $digits;
		}

		$offset = $pos + 2 + $new_number;
	}

	return $text;
}
```

My initial approach was to do it with regular expressions, but the PHP serialized data format is not a regular language and cannot be properly parsed with regular expressions. All approaches fail on edge cases, and I had lots of edge cases in my data (I even had nested serialized strings!).

Note that this will only work when converting **from single-byte encoded data**, since it assumes the stored lengths are the string lengths in characters. Admittedly, it's not my best code, it could be optimized in many ways. It was something I had to write quickly and was only going to be used by me in a one-time conversion process. However, it works smoothly and has been tested with lots of different serialized data. I know that not many people will find it useful, but it's going to be a lifesaver for the few ones that need it.
