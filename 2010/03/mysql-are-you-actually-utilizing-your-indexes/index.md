---
title: "MySQL: Are you actually utilizing your indexes?"
date: "2010-03-25"
tags:
  - "tips"
  - "mysql"
  - "sql"
---

_This might seem elementary to those of you that are DBAs or something similar, but it was fascinating to find out (not to mention it greatly helped what I had to do), so I decided to post it, in case it helps someone else too._ A few moments ago I found out that whereas a query along the lines of...

```sql
SELECT title, COUNT(1) as replies
FROM post INNER JOIN thread USING(threadid)
WHERE **UNIX\_TIMESTAMP(NOW()) - post.dateline < 86400**
GROUP BY threadid
ORDER BY replies DESC
LIMIT 5
```

took a whopping **~10 seconds** on a post table of around 2,000,000 rows and a thread table of around 40,000 rows, the following:

```sql
SELECT title, COUNT(1) as replies
FROM post INNER JOIN thread USING(threadid)
WHERE **post.dateline > UNIX\_TIMESTAMP(NOW()) - 86400**
GROUP BY threadid
ORDER BY replies DESC
LIMIT 5
```

took a mere **0.03 seconds**!

Probably, MySQL wasn't able to utilize the B+ tree index of the dateline column in the first query, whereas in the second, things were a bit more obvious to it. This can also be observed by examining the information about the execution plan that EXPLAIN provides:

``````
mysql> explain select t.threadid, t.title, count(1) as replies from vb3\_post as p inner join vb3\_thread as t using(threadid) where unix\_timestamp(now()) - p.dateline < 86400 group by p.threadid order by replies desc limit 5;
+----+-------------+-------+------+---------------+----------+---------+------------+-------+---------------------------------+
| id | select\_type | table | type | possible\_keys | key      | key\_len | re         | rows  | Extra                           |
+----+-------------+-------+------+---------------+----------+---------+------------+-------+---------------------------------+
|  1 | SIMPLE      | t     | ALL  | PRIMARY       | NULL     | NULL    | NULL       | 39859 | Using temporary; Using filesort |
|  1 | SIMPLE      | p     | ref  | threadid      | threadid | 4       | t.threadid |    49 | Using where                     |
+----+-------------+-------+------+---------------+----------+---------+------------+-------+---------------------------------+
2 rows in set (0.01 sec)
```

```
mysql> explain select t.threadid, t.title, count(1) as replies from vb3\_post as p inner join vb3\_thread as t using(threadid) where p.dateline > UNIX\_TIMESTAMP(NOW()) - 86400 group by p.threadid order by replies desc limit 5;
+----+-------------+-------+--------+-------------------+----------+---------+------------+------+----------------------------------------------+
| id | select\_type | table | type   | possible\_keys     | key      | key\_len | ref        | rows | Extra                                        |
+----+-------------+-------+--------+-------------------+----------+---------+------------+------+----------------------------------------------+
|  1 | SIMPLE      | p     | range  | threadid,dateline | dateline | 4       | NULL       | 1171 | Using where; Using temporary; Using filesort |
|  1 | SIMPLE      | t     | eq\_ref | PRIMARY           | PRIMARY  | 4       | p.threadid |    1 |                                              |
+----+-------------+-------+--------+-------------------+----------+---------+------------+------+----------------------------------------------+
2 rows in set (0.00 sec)
```

So, don't rest assured that MySQL will use your indexes every time it should. It seems that sometimes you have to explicitly point it out.
