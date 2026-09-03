const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

// ex4

app.use(express.static("public"));

// ex2

async function main() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "lab5",
    });

    console.log("Connected to MySQL database");

    // SELECT ALL

    app.get("/students", async (req, res) => {
      try {
        const [rows] = await conn.query("SELECT * FROM students");
        res.json(rows);
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // SELECT BY ID

    app.get("/students/:id", async (req, res) => {
      try {
        const [rows] = await conn.execute(
          "SELECT * FROM students WHERE id = ?",
          [req.params.id],
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }

        res.json(rows[0]);
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });
  } catch (err) {
    console.error("Query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
}

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

main();
