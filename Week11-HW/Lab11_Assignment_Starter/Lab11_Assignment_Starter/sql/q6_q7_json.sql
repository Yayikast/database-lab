-- =====================================================================
-- Assignment 11 - Q6 and Q7 : JSON column and JSON queries (Workbench)
-- =====================================================================
USE bookstore_lab11;

-- ---------- Q6: JSON column (1.5 points) ----------
-- TODO: add a JSON column called attributes to books

-- TODO: store {format, pages} for EVERY book with JSON_OBJECT.
--       Use 'hardcover', 'paperback' or 'ebook', and make at least two ebooks.
--       Example:
-- UPDATE books SET attributes = JSON_OBJECT('format','hardcover','pages',1376) WHERE id = 1;

SELECT id, title, attributes FROM books;

-- ---------- Q7: query JSON (1.5 points, SQL part) ----------
-- TODO: every book's title with its format (use ->>)

-- TODO: only the books whose format is 'ebook'
