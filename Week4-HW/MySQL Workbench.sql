-- CSS326 Lab 4 - bookstore schema + dummy data
-- Run this in MySQL Workbench (or `mysql -u root -p < schema.sql`) before running the Node.js scripts.

CREATE DATABASE IF NOT EXISTS `lab4-hw`
  /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `lab4-hw`;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id     INT NOT NULL AUTO_INCREMENT,
  title  VARCHAR(100) NOT NULL,
  author VARCHAR(100),
  price  INT NOT NULL,
  stock  INT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE customers (
  id    INT NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE orders (
  id          INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL,
  book_id     INT NOT NULL,
  quantity    INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_orders_book FOREIGN KEY (book_id) REFERENCES books(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dummy data (feel free to reuse whatever you already loaded in Lab 3 instead)
INSERT INTO books (title, author, price, stock) VALUES
  ('Clean Code', 'Robert C. Martin', 450, 12),
  ('The Pragmatic Programmer', 'David Thomas', 520, 8),
  ('Introduction to Algorithms', 'Thomas H. Cormen', 890, 5),
  ('Database System Concepts', 'Abraham Silberschatz', 610, 10),
  ('Computer Networking', 'James F. Kurose', 550, 7),
  ('Design Patterns', 'Erich Gamma', 480, 6);

INSERT INTO customers (name, email) VALUES
  ('Somchai Srisawat', 'somchai@gmail.com'),
  ('Suda Wongchai', 'suda@gmail.com'),
  ('Anan Phromma', 'anan@gmail.com'),
  ('Nicha Boonmee', 'nicha@gmail.com');

INSERT INTO orders (customer_id, book_id, quantity) VALUES
  (1, 1, 2),
  (1, 3, 1),
  (2, 2, 1),
  (3, 4, 3),
  (4, 5, 1),
  (2, 6, 2);
  
  SELECT * FROM books;
  SELECT * FROM customers;
  SELECT * FROM orders;

  