// controllers/studentController.js
const pool = require('../db');

// GET /api/students
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, major FROM students ORDER BY id');
    res.json(rows);
  } catch (err) {
    // Exercise 3: log the details on the server, send only a generic message
    console.error('getAll students failed:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

// GET /api/students/:id/courses
exports.getCourses = async (req, res) => {
  // Exercise 3: validate the id first - "1 OR 1=1" is not a positive whole number -> 400
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'student id must be a positive whole number' });
  }

  try {
    // Exercise 3: the id goes in through a ? placeholder instead of being glued into the SQL
    const [rows] = await pool.execute(
      'SELECT c.id, c.title, e.grade FROM enrolments e ' +
      'JOIN courses c ON c.id = e.course_id ' +
      'WHERE e.student_id = ?',
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('student courses failed:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};
