const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4",
  });

  try {
    // SELECT

    console.log("===== Part1 =====");

    // ex2.1
    const [r1] = await conn.execute(
      "INSERT INTO students (name, major, year) VALUES (?, ?, ?)",
      ["Bob", "Data Science", 1],
    );
    console.log("new id:", r1.insertId);

    // ex2.2
    const major = "Data Science";
    const [rows] = await conn.query(
      "SELECT name, major, year FROM students WHERE major = ?",
      [major],
    );

    console.log(rows.length, "students");
    for (const s of rows) {
      console.log(s.name, "-", s.major, "-", s.year);
    }

    console.log("");
    console.log("===== Part2 =====");

    // ex2.3
    const [r2] = await conn.execute(
      "UPDATE students SET year = year + 1 WHERE id = ?",
      [r1.insertId],
    );
    console.log("rows changed:", r2.affectedRows);

    // ex2.2
    console.log(rows.length, "students");
    for (const s of rows) {
      console.log(s.name, "-", s.major, "-", s.year);
    }

    // const [rr] = await conn.query('SELECT * FROM students');
    // console.log(rr);
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();
