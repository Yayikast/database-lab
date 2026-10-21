-- =====================================================================
-- Assignment 9 - Q1 : transactions in Workbench  (1.5 points)
-- Take screenshots of the result grids for your submission.
-- =====================================================================
USE lab9_hw;

-- Before
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;

-- Part A: reduce book 1's stock by 2 and insert a matching order
--         for customer 4, then COMMIT
START TRANSACTION;
UPDATE BOOKS SET stock = stock - 2 WHERE id = 1;
INSERT INTO ORDERS (customer_id, book_id, quantity) VALUES (4, 1, 2);
COMMIT;

-- Check
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;

-- Part B: the same two statements, but ROLLBACK instead of COMMIT
START TRANSACTION;
UPDATE BOOKS SET stock = stock - 2 WHERE id = 1;
INSERT INTO ORDERS (customer_id, book_id, quantity) VALUES (4, 1, 2);
ROLLBACK;

-- Check, then describe (in one sentence) what the data looked like
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;
-- After the ROLLBACK, book 1’s stock was still 8 and 
-- the orders table still had 4 rows, the same as before Part B,
-- because ROLLBACK undid both the UPDATE and the INSERT together.
