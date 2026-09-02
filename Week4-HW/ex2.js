const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  const [rows] = await conn.query("SELECT * FROM books");

  //   console.log(rows.length, "books");

  for (const book of rows) {
    console.log(book.title, "-", book.price);
  }
}

main();
