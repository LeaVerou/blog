---
title: "Java pretty dates"
date: "2009-04-21"
tags:
  - "original"
  - "java"
---

First of all, sorry for not posting as frequently as before. I'm feverishly working on a new project with a really tight deadline and I don't have as much time as I previously did.

For reasons that are irrelevant to this post, I have to write lots of Java code. So, sorry if I disappoint my fellow readers, but this post isn't about JavaScript or CSS, it's about Java. I wanted to display "pretty dates" (a bit like Twitter's, for example _"yesterday"_, _"5 minutes ago"_, _"last year"_ and so on) in a few places and I couldn't find a Java implementation, so I decided to code my own.

For anyone that might need it, here it is:

```clike
import java.util.Date;

/**
 * Class for human-readable, pretty date formatting
 * @author Lea Verou
 */
public class PrettyDate
{
	private Date date;

	public PrettyDate() {
		this(new Date());
	}

	public PrettyDate(Date date) {
		this.date = date;
	}

	public String toString() {
		long	current = (new Date()).getTime(),
			timestamp = date.getTime(),
			diff = (current - timestamp)/1000;
		int	amount = 0;
		String	what = "";

		/**
		 * Second counts
		 * 3600: hour
		 * 86400: day
		 * 604800: week
		 * 2592000: month
		 * 31536000: year
		 */

		if(diff > 31536000) {
			amount = (int)(diff/31536000);
			what = "year";
		}
		else if(diff > 2592000) {
			amount = (int)(diff/2592000);
			what = "month";
		}
		else if(diff > 604800) {
			amount = (int)(diff/604800);
			what = "week";
		}
		else if(diff > 86400) {
			amount = (int)(diff/86400);
			what = "day";
		}
		else if(diff > 3600) {
			amount = (int)(diff/3600);
			what = "hour";
		}
		else if(diff > 60) {
			amount = (int)(diff/60);
			what = "minute";
		}
		else {
			amount = (int)diff;
			what = "second";
			if(amount < 6) {
				return "Just now";
			}
		}

		if(amount == 1) {
			if(what.equals("day")) {
				return "Yesterday";
			}
			else if(what.equals("week") || what.equals("month") || what.equals("year")) {
				return "Last " + what;
			}
		}
		else {
			what += "s";
		}

		return amount + " " + what + " ago";
	}
}
```

Hope someone finds it useful. :)
