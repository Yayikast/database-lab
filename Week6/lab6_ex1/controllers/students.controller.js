// controllers/students.controller.js
const pool = require("../db");

// SELECT ALL
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SELECT BY ID
exports.getOne = async (req, res) => {
  console.log(req.params);
  try {
    const [rows] = await pool.execute("SELECT * FROM students WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};

// INSERT
exports.create = async (req, res) => {
  try {
    const { name, major, year } = req.body;
    const [r] = await pool.execute(
      "INSERT INTO students (name, major, year) VALUES (?, ?, ?)",
      [name, major, year],
    );
    res.status(201).json({ id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const [r] = await pool.execute("DELETE FROM students WHERE id = ?", [
      req.params.id,
    ]);
    if (r.affectedRows === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.json({ deleted: r.affectedRows });
  } catch (err) {
    console.error("Query failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};
