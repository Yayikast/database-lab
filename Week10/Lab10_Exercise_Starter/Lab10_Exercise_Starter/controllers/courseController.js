// controllers/courseController.js
const pool = require('../db');

// GET /api/courses
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, credits, seats FROM courses ORDER BY id LIMIT 20'
    );
    res.json(rows);
  } catch (err) {
    // Exercise 3: log the details on the server, send only a generic message
    console.error('getAll courses failed:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

// GET /api/courses/search?title=...
exports.search = async (req, res) => {
  try {
    const title = req.query.title || '';
    // Exercise 3: the value goes in through a ? placeholder, so it is always data, never SQL
    const [rows] = await pool.execute(
      'SELECT id, title, credits, seats FROM courses WHERE title = ?',
      [title]
    );
    res.json(rows);
  } catch (err) {
    console.error('course search failed:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};
