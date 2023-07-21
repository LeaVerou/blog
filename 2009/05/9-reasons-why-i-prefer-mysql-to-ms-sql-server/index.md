---
title: "9 reasons why I prefer MySQL to MS SQL Server"
date: "2009-05-16"
tags:
  - "rants"
  - "thoughts"
  - "ms-sql-server"
  - "mysql"
---

In the past, I used MySQL for any of my DBMS needs. It wasn't really an informed decision based on solid facts, actually I had never really given it any thought. It was what most developers used, it was what vBulletin used (one of the main projects of my company is based on vBulletin), it was what most hosts had pre-installed, in other words, it was the popular choice and I went with the crowd.

Unlike most decisions taken that way, this one turned out to be correct (so far at least). In the university where I study (yeah, I do that too occasionally :P ), there is a great and extremely useful class on Database Systems offered in my semester. The only drawback is that it's done on MS SQL Server. Consequently, I had to work with it quite a lot, and my conclusion was that MySQL is far superior (mostly syntax-wise as I don't have the deep knowledge required to judge them fairly for other things, so don't expect a deep analysis about performance or security - as far as I'm concerned, they are equally good at those). Here are a few reasons:

1. No ENUM datatype. Yeah, of course I can define a column with a char/varchar type and add a constraint to only allow for particular strings, but this kinda defeats the purpose of [memory saving that the ENUM datatype in MySQL offers](http://dev.mysql.com/doc/refman/5.0/en/storage-requirements.html).
2. No INSERT IGNORE. Instead you have to go through hell to simulate that in MS SQL Server.
3. I hate it that I can't use "USING(columnlabel)" in a JOIN query and I have to use "ON(table1.columnlabel = table2.colmnlabel)" all the time. Yeah, I know that the first one isn't standard, but it's shorter, cleaner, more elegant, and ...you can still use "ON(...)" if you don't like it. Having more options is never bad, is it?
4. With MySQL you may insert multiple rows at once elegantly ("INSERT INTO tablename (...), (...), ..."), without using the "INSERT INTO tablename SELECT (...) UNION ALL SELECT (...) UNION ALL ..." hack. Moreover, the elegant MySQL way also [happens to be the standard](http://troels.arvin.dk/db/rdbms/#insert-multiple), a standard that SQL Server doesn't follow.
5. Triggers can only run per statement, and not per row. This isn't really important, since for most cases, it's more efficient to define a per statement trigger anyway, but it doesn't do any harm to have an extra option, does it?
6. Paging is dead-easy on MySQL: SELECT \* FROM foo LIMIT 10,20 . With MS SQL Server you have to [jump](http://www.sqlteam.com/article/server-side-paging-using-sql-server-2005) [through](http://www.asp101.com/articles/gal/effectivepaging/default.asp) [hoops](http://sqltips.wordpress.com/2007/08/10/optimized-solution-of-paging-by-using-count-over-functionality/) to do the same thing, especially if your query is not trivial.
7. In MySQL, when you want to convert an integer to a hex string, you just call HEX(). In SQL Server you have to call an undocumented function and do some string manipulation to do the exact same thing.
8. MySQL runs on every platform, whereas with MS SQL Server you're stuck with Windows.
9. Last but not least, MySQL is free (and when it's not free, it's at least cheap) and opensource :-)
