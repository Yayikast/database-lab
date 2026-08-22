-- create database lab3;

-- show databases;

-- create tables

CREATE TABLE IF NOT EXISTS books (
`id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(100) NOT NULL,
`author` VARCHAR(45),
`price` INT NOT NULL,
`stock` INT,
PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS customers (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL,
`email` VARCHAR(45) NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS orders (
`id` INT NOT NULL AUTO_INCREMENT,
`customer_id` INT NOT NULL,
`book_id` INT NOT NULL,
`quantity` INT NOT NULL,

-- foreign keys, point from orders

CONSTRAINT fk_orders_customer
	FOREIGN KEY (`customer_id`)
	REFERENCES customers(`id`),

CONSTRAINT fk_orders_book
	FOREIGN KEY (`book_id`)
	REFERENCES books(`id`),
        
PRIMARY KEY (`id`));

-- add data

/*
INSERT INTO books (title, author, price, stock) VALUES
	('Clean Code','Robert C. Martin',520,8),
	('The Pragmatic Programmer','Andrew Hunt',610,5),
	('Refactoring','Martin Fowler',700,3),
	('Database Internals','Alex Petrov',850,4),
	('SQL in 10 Minutes','Ben Forta',300,12),
	('Designing Data-Intensive Applications','Martin Kleppmann',950,6),
	('Head First SQL','Lynn Beighley',420,9),
	('Learning MySQL','Seyed Tahaghoghi',640,2),
	('Patterns of Enterprise Application Architecture','Martin Fowler',880,3),
	('MySQL Crash Course','Ben Forta',360,10);

INSERT INTO customers (name, email) VALUES
	('Pim','pim@example.com'),
	('Nate','nate@example.com'),
	('Som','som@example.com'),
	('Lek','lek@example.com');

-- book_id 1..10, customer_id 1..4 (from the order above)
INSERT INTO orders (customer_id, book_id, quantity) VALUES
	(1,1,1),
	(1,5,2),
	(2,3,1),
	(2,6,1),
	(3,2,3),
	(4,4,1),
	(4,7,2);

INSERT INTO books (title, author, price, stock) VALUES
	('Python Crash Course', 'Eric Matthes', 750, 7),
	('The Clean Coder', 'Robert C. Martin', 580, 5);
*/

-- Q3

SELECT title, price FROM books;

SELECT title, price FROM books
WHERE price > 500;

SELECT DISTINCT author FROM books;

SELECT DISTINCT author FROM books
WHERE price > 500;

-- Q4

SELECT name FROM customers
WHERE name LIKE 'P%';

SELECT title, price FROM books
WHERE price BETWEEN 400 AND 700;

SELECT title, author FROM books
WHERE author IN ('Martin Fowler', 'Ben Forta');

SELECT title, price FROM books
ORDER BY price DESC;

-- Q5

SELECT
	COUNT(*) AS book_count,
    SUM(stock) AS total_stock,
    AVG(price) AS avg_price
FROM books;

SELECT
	author,
	COUNT(*) AS book_count,
    SUM(stock) AS total_stock,
    AVG(price) AS avg_price
FROM books
GROUP BY author
HAVING COUNT(*) > 1;

-- Q6

SELECT title, ROUND(price*1.07, 2) FROM books;

SELECT
    ABS(-25) AS absolute_value,
    POWER(5, 2) AS power_value,
    SQRT(25) AS square_root;

-- Q7

SELECT VERSION();

SELECT NOW();

SELECT
	CONCAT(title, ' - ', author)
FROM books;

-- Q8

SELECT * FROM books
WHERE title = 'Clean Code';

UPDATE books
SET price = price*1.10
WHERE title = 'Clean Code';

SELECT * FROM orders
WHERE id = 5;

DELETE FROM orders
WHERE id = 5;

SELECT * FROM orders;

-- Q9

ALTER TABLE orders
ADD CONSTRAINT fk_orders_book
FOREIGN KEY (book_id)
REFERENCES books(id);

ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id)
REFERENCES customers(id);

INSERT INTO orders (id, customer_id, book_id, quantity) VALUES
	(8, 1, 20, 1);

CREATE INDEX idx_orders_customer_id
ON orders(customer_id);

-- Q10

SELECT *
FROM orders
INNER JOIN customers
ON orders.customer_id = customers.id;

SELECT
	customers.name AS 'customer name',
	books.title AS 'book title',
	orders.quantity
FROM orders
INNER JOIN customers
ON orders.customer_id =customers.id
INNER JOIN books
ON orders.book_id = books.id;

SELECT
	customers.name AS 'customer name',
	books.title AS 'book title',
	orders.quantity
FROM orders
INNER JOIN customers
ON orders.customer_id =customers.id
INNER JOIN books
ON orders.book_id = books.id
WHERE customers.name = 'Pim'
ORDER BY books.title DESC;

-- Testing

DESCRIBE books;
DESCRIBE customers;
DESCRIBE orders;

SELECT * FROM books;
SELECT * FROM customers;
SELECT * FROM orders;













