-- Exercise 1: Index and EXPLAIN
-- Database: css326_lab10 (run sql/01, 02 and 03 first, as root)
-- Goal: show, with evidence, that an index makes a query faster.
USE css326_lab10;

-- Step 1. Pick a query you run often with a WHERE on a non-key column.
--         A suggestion is below; you may choose another (for example students.name).
EXPLAIN SELECT * FROM courses WHERE title = 'Operating Systems';
-- record type, key and rows in the results table at the bottom.

-- Step 2. Measure the real time. Run it twice and use the second result.
EXPLAIN ANALYZE SELECT * FROM courses WHERE title = 'Operating Systems';
-- record the actual time (the last number in "actual time=a..b", in ms).

-- Step 3. Create an index on that column.
CREATE INDEX idx_courses_title ON courses (title);

-- Step 4. Check that the index exists.
SHOW INDEX FROM courses;   -- expect PRIMARY (id) and idx_courses_title (title)

-- Step 5. Run EXPLAIN and EXPLAIN ANALYZE again (run the ANALYZE twice, use the second result).
EXPLAIN SELECT * FROM courses WHERE title = 'Operating Systems';
EXPLAIN ANALYZE SELECT * FROM courses WHERE title = 'Operating Systems';


-- Results (fill in the times from YOUR runs; rows is MySQL's estimate, so it may be slightly off):
--                 type     key                 rows       actual time (ms)
--   before:       ALL      NULL                ~100005    ______
--   after:        ref      idx_courses_title   1          ______
-- One sentence: what changed, and why?
--   Before the index MySQL did a full table scan (type ALL, no key) and examined about
--   100,005 rows; after CREATE INDEX it looks the title up in the idx_courses_title B-tree
--   (type ref) and goes straight to the 1 matching row, so the actual time drops sharply.
