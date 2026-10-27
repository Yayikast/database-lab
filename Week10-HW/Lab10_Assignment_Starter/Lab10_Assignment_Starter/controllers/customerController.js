// controllers/customerController.js
const pool = require('../db');

// GET /api/customers/:id/orders
// NOTE: this query has the same problem as the author search (Q5). Fixing it too
// is good practice - try the '42 OR 1=1' button in the page.
// Fixed

exports.getOrders = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be a number' });

    const sql =
      'SELECT o.id, b.title, o.quantity FROM orders o ' +
      'JOIN books b ON b.id = o.book_id ' +
      'WHERE o.customer_id = ?';
    const [rows] = await pool.query(sql, [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message, sql: err.sql });
  }
};