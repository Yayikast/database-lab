const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

app.use(express.json());

// ex3

async function main() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "lab5",
    });

    console.log("Connected to MySQL database");

    // POST METHOD

    app.post("/students", async (req, res) => {
      try {
        const { name, major, year } = req.body;
        const [r] = await conn.execute(
          "INSERT INTO students (name, major, year) VALUES (?, ?, ?)",
          [name, major, year],
        );
        res.status(201).json({ id: r.insertId });
      } catch (err) {
        console.error("Query failed:", err.message);
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // Outer Error Catching
  } catch (err) {
    console.error("Query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
}

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

main();
