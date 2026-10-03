// controllers/books.controller.js
//
// exports.list is done as a worked example of the pool -> query -> JSON
// pattern used throughout. books( id, title, author, price, stock ).
const pool = require("../db");

// GET /books  -- worked example
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books/:id                                          Task 2 (1.5 pts)
// TODO: query the pool for the book with this id (? placeholder on
// req.params.id). If no row comes back, respond 404 with a JSON error.
exports.getOne = async (req, res) => {
  console.log(req.params);
  try {
    const [rows] = await pool.execute("SELECT * FROM books WHERE id = ?", [
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

// POST /books                                              Task 3 (1.5 pts)
// TODO:
//   1. Read { title, author, price, stock } from req.body.
//   2. If title is missing, respond 400 with a message.
//   3. If price is not a positive number, respond 400 with a message.
//   4. Otherwise INSERT the book with ? placeholders and respond 201 with
//      the new id.
exports.create = async (req, res) => {
  const { title, author, price, stock } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  if (isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({ error: "price must be a positive number" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)",
      [title, author || "", price, stock || 0],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Insert failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};

// PUT /books/:id                                           Task 4 (1.5 pts)
// TODO: UPDATE the book's price and/or stock (from req.body) WHERE
// id = req.params.id, using ? placeholders. Respond 404 if affectedRows
// is 0, otherwise report how many rows were updated.
exports.update = async (req, res) => {
  try {
    const [result] = await pool.execute(
      "UPDATE books SET price = ?, stock = ? WHERE id = ?",
      [req.body.price, req.body.stock, req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.json({ updated: result.affectedRows });
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};

// DELETE /books/:id                                        Task 5 (1.5 pts)
// TODO: DELETE the book WHERE id = req.params.id, using a ? placeholder.
// Respond 404 if affectedRows is 0, otherwise respond 204.
exports.remove = async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM books WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.status(204).end();
  } catch (err) {
    // if (err.errno === 1451) {
    //   return res
    //     .status(409)
    //     .json({ error: "this book has orders, so it cannot be deleted" });
    // }
    console.error("Delete failed:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
};
