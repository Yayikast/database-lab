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
    let sql = `SELECT id, title, author, price, stock,
                      attributes->>'$.format' AS format,
                      attributes->>'$.pages' AS pages
                 FROM books`;
    const params = [];

    if (req.query.format) {
      sql += " WHERE attributes->>'$.format' = ?";
      params.push(req.query.format);
    }

    sql += ' ORDER BY id';
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};