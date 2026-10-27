-- CSS326 Lab Assignment 10: Hardening: Performance & Security
-- Name: Yayika Tinner   Student ID: 6722781026
-- Database: lab10_hw (run sql/01, 02 and 03 first, as root)
USE lab10_hw;

-- =========================================================================

-- Q1. Measure first (1.5 points)
--     EXPLAIN and EXPLAIN ANALYZE a query on books that filters by author.
--     Record type, key, rows and actual time. Screenshot.

EXPLAIN SELECT id, title, author, price
FROM books
WHERE author = 'Ben Forta';

EXPLAIN ANALYZE SELECT id, title, author, price
FROM books
WHERE author = 'Ben Forta';

-- Q1 results (before index):
--   type        = ALL      (full table scan)
--   key         = NULL     (no index used)
--   rows        = 49764    (estimate; actually read 50008 rows)
--   actual time = 37.9 ms  (scan alone: 32.1 ms)
-- Only 2 rows matched, but MySQL read all 50,008 rows to find them.

-- =========================================================================

-- Q2. Add an index (1.5 points)
--     CREATE INDEX, then repeat Q1. Record what changed. Screenshot.

CREATE INDEX idx_author ON books (author);

SHOW INDEX FROM books;      -- check that it exists

EXPLAIN SELECT id, title, author, price
FROM books
WHERE author = 'Ben Forta';

EXPLAIN ANALYZE SELECT id, title, author, price
FROM books
WHERE author = 'Ben Forta';

-- Q2 results:
--              BEFORE (Q1)   AFTER (Q2)
--   type        ALL           ref
--   key         NULL          idx_author
--   rows        49764         2
--   actual time 37.9 ms       1.13 ms
-- Before, MySQL had to scan all 50,008 rows because there was no index on author.
-- After, idx_author keeps the authors sorted with pointers to their rows, so MySQL
-- jumps straight to 'Ben Forta' and reads only 2 rows. About 33x faster.

-- =========================================================================

-- Q3. Joins and foreign keys (1.5 points)
--     SHOW INDEX FROM orders; EXPLAIN a query that joins orders to customers
--     for one customer. Answer the question on the sheet in a comment.
SHOW INDEX FROM orders;

EXPLAIN
SELECT o.id, c.name, o.book_id, o.quantity
FROM orders AS o
JOIN customers AS c ON c.id= o.customer_id
WHERE o.customer_id = 42;

-- Q3 Answer
-- The join uses the customer_id index on orders.
-- It exists because customer_id is a FOREIGN KEY. InnoDB requires an index
-- on every foreign key column, and creates one automatically if none exists.
-- This lets MySQL check the FK and run ON DELETE CASCADE quickly, without
-- scanning all 100,008 orders, and it also makes joins on customer_id fast.

-- =========================================================================

-- Q4. The cost of indexes (1 point): answer in a comment.
-- One downside of an index is overhead: every INSERT, UPDATE
-- and DELETE must also update the index, and the index uses extra disk space.
-- I would index a column only if it is often used in WHERE, JOIN or ORDER BY,
-- has many different values, and EXPLAIN shows a real speed-up
-- (fewer rows, type ref instead of ALL, like Q1 vs Q2).

-- =========================================================================

-- Q5. Injection and the fix (2 points): code changes in controllers/bookController.js.
--     Paste the before and after code here as comments, with your explanation.
--
-- BEFORE (unsafe), controllers/bookController.js:
--   const sql = "SELECT id, title, author, price FROM books WHERE author = '" + author + "'";
--   const [rows] = await pool.query(sql);
--
-- Attack: the input ' OR '1'='1 is glued into the string and builds
--   SELECT id, title, author, price FROM books WHERE author = '' OR '1'='1'
-- author = '' is false, but '1'='1' is always true, so the WHERE is true
-- for every row and the query returns all 50,008 books. The user's input
-- closed the quote and became part of the SQL code. That is SQL injection.
--
-- AFTER (safe):
--   const sql = "SELECT id, title, author, price FROM books WHERE author = ?";
--   const [rows] = await pool.query(sql, [author]);
--
-- Why it is safe: the SQL text and the value are passed separately. The ?
-- is filled with the value as plain data (mysql2 escapes it), never as SQL
-- code, so ' OR '1'='1 is searched as a literal author name and returns
-- 0 rows ([]). Normal input like 'Ben Forta' still returns its 2 books.
--
-- Extra: the same fix was applied in controllers/customerController.js
--   (WHERE o.customer_id = ? with [req.params.id]), so '42 OR 1=1' no longer
--   returns every customer's orders.

-- =========================================================================

-- Q6. Least privilege (2 points)
--     CREATE USER, GRANT, SHOW GRANTS, and the failed DROP test.

CREATE USER 'bookstore_app'@'localhost' IDENTIFIED BY 'password1234';

GRANT SELECT, INSERT, UPDATE, DELETE
ON lab10_hw.*
TO 'bookstore_app'@'localhost';

SHOW GRANTS FOR 'bookstore_app'@'localhost';

-- REVOKE SELECT, INSERT, UPDATE, DELETE ON lad10_hw.* FROM 'bookstore_app'@'localhost';

-- SHOW GRANTS output:
--   GRANT USAGE ON *.* TO `bookstore_app`@`localhost`
--   GRANT SELECT, INSERT, UPDATE, DELETE ON `lab10_hw`.* TO `bookstore_app`@`localhost`
--
-- DROP test (logged in as bookstore_app):
--   USE lab10_hw;
--   DROP TABLE books;
--   → Error Code: 1142. DROP command denied to user 'bookstore_app'@'localhost' for table 'books'
--
-- db.js now connects as bookstore_app instead of root. The Connection panel
-- shows bookstore_app@localhost (least privilege) and the author search still
-- returns the 2 Ben Forta books, so the app still works.

-- =========================================================================

-- Q7. Protect secrets (1.5 points): .env, .gitignore and db.js.
--     Explain in a comment why .env must not be committed to Git.
--
-- Why .env must not be committed: it holds secrets such as the database
-- password. Anyone who can see the repository (teammates, or the whole world
-- if it is public on GitHub, where bots scan for leaked keys) could read it
-- and log in to the database. Git also keeps every commit in its history, so
-- even if .env is deleted later the password stays visible in old commits;
-- the only fix would be to change the password. Keeping .env only on each
-- machine also lets every environment use its own settings.

-- =========================================================================

-- Q8. Short answer (1 point): answer in a comment.
--
-- The application should not connect as root because root can do anything on
-- the whole server: drop tables, read every database, create users and change
-- passwords. If an attacker takes over the app (for example through SQL
-- injection), they get all of that power; with a least-privilege user like
-- bookstore_app the damage is limited to reading and changing rows in lab10_hw.
-- One further security measure is to hide database error details from users:
-- log the real error on the server with console.error and send only a generic
-- message such as 'Something went wrong', so attackers cannot see the SQL,
-- table names or column names.
