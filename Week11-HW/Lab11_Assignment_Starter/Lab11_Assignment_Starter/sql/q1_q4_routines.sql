-- =====================================================================
-- Assignment 11 - Q1 to Q4 : procedure, function, triggers (Workbench)
-- Take screenshots of the result grids for your submission.
-- Keep the DELIMITER lines around every routine and trigger.
-- =====================================================================
USE bookstore_lab11;

-- ---------- Q1: stored procedure (1.5 points) ----------
-- place_order(IN p_customer INT, IN p_book INT, IN p_qty INT) inserts one order.
DROP PROCEDURE IF EXISTS place_order;
-- TODO: DELIMITER // ... CREATE PROCEDURE ... END // DELIMITER ;

-- TODO: CALL it for customer 4, book 2, quantity 1
SELECT * FROM orders ORDER BY id;

-- ---------- Q2: stored function (1.5 points) ----------
-- order_count(p_customer INT) RETURNS INT - how many orders a customer has.
-- Remember READS SQL DATA (error 1418 otherwise).
DROP FUNCTION IF EXISTS order_count;
-- TODO

-- TODO: SELECT every customer with order_count(id) AS orders


-- ---------- Q3: AFTER INSERT trigger with a stock guard (1.5 points) ----------
-- Reduce the book's stock by NEW.quantity, but only WHERE stock >= NEW.quantity.
-- If ROW_COUNT() = 0, SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'not enough stock';
DROP TRIGGER IF EXISTS after_order_insert;
-- TODO

SELECT id, title, stock FROM books WHERE id = 3;
-- TODO: CALL place_order for 2 copies of book 3, then check the stock again
-- TODO: CALL place_order for 3 copies of book 5 (only 1 in stock) -> error 1644
SELECT * FROM orders WHERE book_id = 5;

-- ---------- Q4: AFTER DELETE trigger (1.5 points) ----------
-- Put OLD.quantity back into the stock of OLD.book_id.
DROP TRIGGER IF EXISTS after_order_delete;
-- TODO

-- TODO: delete the order you placed for book 3 and show its stock is restored
SHOW TRIGGERS;
