const mysql = require("mysql2/promise");

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  try {
    const bookId = 7;

    const [result] = await conn.execute("DELETE FROM books WHERE id = ?", [
      bookId,
    ]);

    console.log("Rows affected:", result.affectedRows);
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();
