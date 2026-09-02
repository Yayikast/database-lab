const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  try {
    const [result] = await conn.execute(
      "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)",
      ["The One Night Miracle", "Yayika Tinner", 888, 10],
    );
    console.log("new id:", result.insertId);
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();
