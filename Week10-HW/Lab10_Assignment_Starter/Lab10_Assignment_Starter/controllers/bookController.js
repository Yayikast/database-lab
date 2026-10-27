// controllers/bookController.js
const pool = require('../db');

// GET /api/books?limit=20
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, author, price, stock FROM books ORDER BY id LIMIT 20'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message, sql: err.sql });
  }
};

// GET /api/books/search?author=...
exports.searchByAuthor = async (req, res) => {
  try {
    const author = req.query.author || '';
    // TODO (Assignment Q5): this builds SQL by gluing in the value.
    const sql = "SELECT id, title, author, price FROM books WHERE author = ?";
    const [rows] = await pool.query(sql, [author]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message, sql: err.sql });
  }
};
