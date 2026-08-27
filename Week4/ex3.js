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
    const major = "Data Science";
    const [rows] = await conn.query("SELECT * FROM students WHERE major = ?", [
      major,
    ]);

    console.log(rows.length, "students");

    for (const s of rows) {
      console.log(s.name, "-", s.major);
    }
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();

/*
const mysql = require('mysql2/promise');
async function main() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root123#',
        database: 'lab4_sec5'
    });

    try {
        // SELECT
        const [rows] = await conn.query('SELECT * FROM students');

        console.log(rows.length, 'students');

        for (const s of rows) {
            console.log(s.name, '-', s.major);
        }
    
    } catch (err) {
        console.error('Query failed: ', err.message);
    } finally {
        await conn.end();
    }

}

main();

*/
