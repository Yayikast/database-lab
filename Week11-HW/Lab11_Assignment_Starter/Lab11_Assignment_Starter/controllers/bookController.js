const pool = require('../db');

// ---------------------------------------------------------------------
// GET /books                -> every book with its stock
// GET /books?format=ebook   -> Q7: only the books in that format
//
// This works now, but only returns the ordinary columns.
//
// TODO (Q7), after Q6 has added the attributes JSON column:
//   1. also return   attributes->>'$.format' AS format,
//                    attributes->>'$.pages'  AS pages
//   2. if req.query.format is given, add   WHERE attributes->>'$.format' = ?
//      and pass the format as a parameter.
// The front-end fills the Format / Pages columns and the filter once
// these fields come back.
// ---------------------------------------------------------------------
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, author, price, stock FROM books ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
