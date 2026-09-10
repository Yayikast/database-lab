// CSS326 Lab 5 Assignment -- starter file
// Schema (Lab 2/3):
//   books( id, title, author, price, stock )
//   customers( id, name, email )
//   orders( id, customer_id, book_id, quantity )
//
// Run:  npm install
//       node app.js
//       open http://localhost:3000

const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

app.use(express.json());
app.use(express.static("public")); // Task 8

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lab5-hw",
};

async function main() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database");

    // ---------------------------------------------------------------------
    // Task 1: Set up Express -- GET / welcome route
    // ---------------------------------------------------------------------
    app.get("/", (req, res) => {
      // TODO
      res.send("Welcome to my bookstore");
    });

    // ---------------------------------------------------------------------
    // Task 2: List books -- GET /books
    // ---------------------------------------------------------------------

    /*
    app.get("/books", async (req, res) => {
      // TODO (also handles Task 4's optional ?author=... filter)
      try {
        const [rows] = await conn.query("SELECT * FROM books");
        res.json(rows);
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });
    */

    app.get("/books", async (req, res) => {
      try {
        const author = req.query.author;

        let sql = "SELECT * FROM books";
        const params = [];

        if (author) {
          sql += " WHERE author = ?";
          params.push(author);
        }

        const [rows] = await conn.execute(sql, params);
        res.json(rows);
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // ---------------------------------------------------------------------
    // Task 3: One book by id -- GET /books/:id
    // ---------------------------------------------------------------------
    app.get("/books/:id", async (req, res) => {
      // TODO
      try {
        const [rows] = await conn.execute("SELECT * FROM books WHERE id = ?", [
          req.params.id,
        ]);
        //
        if (rows.length === 0) {
          return res.status(404).json({ error: "Book not found" });
        }
        //
        res.json(rows[0]);
        //
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // ---------------------------------------------------------------------
    // Task 5: Create a book -- POST /books
    // ---------------------------------------------------------------------
    app.post("/books", async (req, res) => {
      // TODO
      try {
        const { title, author, price, stock } = req.body;

        const [result] = await conn.execute(
          "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)",
          [title, author, price, stock],
        );

        res.status(201).json({ id: result.insertId });
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // ---------------------------------------------------------------------
    // Task 6: Join from the API -- GET /orders/details
    // ---------------------------------------------------------------------
    app.get("/orders/details", async (req, res) => {
      // TODO
      try {
        const [rows] = await conn.query(`
      SELECT
        customers.name AS customer_name,
        books.title AS book_title,
        orders.quantity
      FROM
        orders
        INNER JOIN customers ON orders.customer_id = customers.id
        INNER JOIN books ON orders.book_id = books.id
    `);

        res.json(rows);
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // ... your routes here ...
  } catch (err) {
    console.error("Connection failed", err.message);
  }
}

app.listen(3000, () => console.log("http://localhost:3000"));

main();
