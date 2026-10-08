const pool = require("../db");

// GET /students/:id/enrolments  (done for you)
exports.listForStudent = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT c.id AS course_id, c.title, e.grade
         FROM enrolments e JOIN courses c ON c.id = e.course_id
        WHERE e.student_id = ? ORDER BY c.id`,
      [req.params.id],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------------------
// Exercise 2 : A transactional enrol
// POST /students/:id/enrolments      body: { "course_id": 3 }
//
// The version below WORKS, but it is NOT safe:
//   * the two statements run on whatever pool connection is free,
//     outside any transaction - if the INSERT fails, the seat is lost;
//   * nothing stops seats going below zero.
//
// TODO: rewrite it using the pattern
//   const conn = await pool.getConnection();
//   try { beginTransaction ... commit } catch { rollback } finally { release }
// and guard the seat with  ... WHERE id = ? AND seats > 0
//   201 -> enrolled       409 -> course is full       500 -> anything else
// ---------------------------------------------------------------------
exports.enrol = async (req, res) => {
  const studentId = Number(req.params.id);
  const courseId = Number(req.body.course_id);
  if (!Number.isInteger(studentId) || !Number.isInteger(courseId)) {
    return res
      .status(400)
      .json({ error: "student id and course_id must be integers" }); // ⟨end of message cut off⟩
  }
  const conn = await pool.getConnection(); // 1. borrow ONE connection
  try {
    await conn.beginTransaction(); // 2. begin
    // 3. guarded UPDATE: only changes a row when a seat is free
    const [u] = await conn.execute(
      "UPDATE courses SET seats = seats - 1 WHERE id = ? AND seats > 0",
      [courseId],
    );
    if (u.affectedRows === 0) {
      // business rule broken
      await conn.rollback();
      // optional: tell "no such course" apart from "course is full"
      const [c] = await conn.execute("SELECT id FROM courses WHERE id = ?", [
        courseId,
      ]);
      if (c.length === 0)
        return res.status(404).json({ error: "course not found" });
      return res.status(409).json({ error: "course is full" });
    }
    // 4. record the enrolment on the SAME connection
    await conn.execute(
      "INSERT INTO enrolments (student_id, course_id) VALUES (?, ?)",
      [studentId, courseId],
    );
    await conn.commit(); // 5. both changes, together
    // ⟨cut off from here on, most likely:⟩
    res
      .status(201)
      .json({ ok: true, student_id: studentId, course_id: courseId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};

// ---------------------------------------------------------------------
// Exercise 3 : Cancel atomically
// DELETE /students/:id/enrolments/:courseId
//
// TODO: inside ONE transaction
//   1. DELETE the enrolment row for this student + course
//   2. if nothing was deleted -> roll back and return 404
//   3. give the seat back:  UPDATE courses SET seats = seats + 1 WHERE id = ?
//   4. commit and return 200
// Remember: release the connection in finally.
// ---------------------------------------------------------------------
exports.unenrol = async (req, res) => {
  const studentId = Number(req.params.id);
  const courseId = Number(req.params.courseId);
  if (!Number.isInteger(studentId) || !Number.isInteger(courseId)) {
    return res.status(400).json({ error: "ids must be integers" });
  }
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [d] = await conn.execute(
      "DELETE FROM enrolments WHERE student_id = ? AND course_id = ?",
      [studentId, courseId],
    );
    if (d.affectedRows === 0) {
      // nothing to cancel
      await conn.rollback();
      return res.status(404).json({ error: "enrolment not found" });
    }
    await conn.execute("UPDATE courses SET seats = seats + 1 WHERE id = ?", [
      courseId,
    ]);
    await conn.commit();
    res.json({ ok: true, student_id: studentId, course_id: courseId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};
