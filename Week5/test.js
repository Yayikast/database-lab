const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab5",
  });

  // SELECT
  const [rows] = await conn.query("SELECT * FROM students");

  console.log(rows.length, "students");

  for (const s of rows) {
    console.log(s.name, "-", s.major);
  }
}

main();
