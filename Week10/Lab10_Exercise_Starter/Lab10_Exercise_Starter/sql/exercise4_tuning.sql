-- Exercise 4 (if time): Tuning
-- Database: css326_lab10 (with the 100,000 test rows from 03_test_rows.sql)
USE css326_lab10;

-- Part 1. A query that filters on two columns at once.
--         (type and key come from plain EXPLAIN; actual time from EXPLAIN ANALYZE)
EXPLAIN
SELECT id, title, seats FROM courses
WHERE title LIKE 'Course 99%' AND seats > 0;
EXPLAIN ANALYZE
SELECT id, title, seats FROM courses
WHERE title LIKE 'Course 99%' AND seats > 0;
-- record type, key and actual time.
-- Expected: type range, key idx_courses_title (the single-column index from Exercise 1).
-- MySQL finds the matching titles in the index, but must then read every full row to check seats.

-- Create a composite index on (title, seats).
CREATE INDEX idx_courses_title_seats ON courses (title, seats);

-- Run the same EXPLAIN / EXPLAIN ANALYZE again and compare.
EXPLAIN
SELECT id, title, seats FROM courses
WHERE title LIKE 'Course 99%' AND seats > 0;
EXPLAIN ANALYZE
SELECT id, title, seats FROM courses
WHERE title LIKE 'Course 99%' AND seats > 0;
-- Expected: type range, key idx_courses_title_seats, Extra "Using where; Using index".
-- title, seats (and id, which InnoDB stores in every index) are all inside the composite
-- index, so MySQL answers the query from the index alone and never reads the table rows,
-- which lowers the actual time.

-- Part 2. Fetch less: compare these two (look at the Duration column in Workbench).
SELECT *         FROM courses WHERE title LIKE 'Course 1%';
SELECT id, title FROM courses WHERE title LIKE 'Course 1%';
EXPLAIN SELECT *         FROM courses WHERE title LIKE 'Course 1%';
EXPLAIN SELECT id, title FROM courses WHERE title LIKE 'Course 1%';
-- Which one can be answered from the index alone?
--   SELECT id, title: Extra shows "Using index" - id and title are both in the title index,
--   so MySQL never has to open the table rows. SELECT * also needs credits and seats from
--   every matching row, so it must go back to the table (or even scan it, type ALL), which
--   is slower. Selecting only the columns you need lets an index cover the query.

-- Part 3. Do not wrap an indexed column in a function.
EXPLAIN SELECT * FROM courses WHERE LEFT(title, 8) = 'Course 9';
EXPLAIN SELECT * FROM courses WHERE title LIKE 'Course 9%';
-- Which one uses the index? Why?
--   The LIKE 'Course 9%' query uses it (type range, key idx_courses_title). The LEFT() query
--   does a full table scan (type ALL, key NULL): the index stores the title values in sorted
--   order, not the results of LEFT(title, 8), so MySQL has to compute LEFT() for every row.
--   A LIKE with a fixed prefix can jump to 'Course 9' in the sorted index instead.
