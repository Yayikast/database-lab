const pool = require('../db');

// ---------------------------------------------------------------------
// GET /customers  -> used by the front-end's customer table and list
//
// TODO (Q5): after Q2, add your stored function to the SELECT:
//     order_count(id) AS orders
// The front-end shows it in the Orders column.
// ---------------------------------------------------------------------
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email FROM customers ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
