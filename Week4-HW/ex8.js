const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  try {
    // ex1
    console.log("===== ex1 =====");
    console.log("connected");
    console.log();

    // ex2
    console.log("===== ex2 =====");
    const [rows2] = await conn.query("SELECT * FROM books");
    for (const book of rows2) {
      console.log(book.title, "-", book.price);
    }
    console.log();

    // ex3
    console.log("===== ex3 =====");
    const minPrice = 500;
    const [rows3] = await conn.query("SELECT * FROM books WHERE price >= ?", [
      minPrice,
    ]);
    for (const book of rows3) {
      console.log(book.title, "-", book.price);
    }
    console.log();

    // ex4
    console.log("===== ex4 =====");
    const [result4] = await conn.execute(
      "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)",
      ["The One Night Miracle", "Yayika Tinner", 888, 10],
    );
    console.log("new id:", result4.insertId);
    console.log();

    // ex5
    console.log("===== ex5 =====");
    const bookId = 1;
    const [result5] = await conn.execute(
      "UPDATE books SET price = price * 1.1 WHERE id = ?",
      [bookId],
    );
    console.log("Rows affected:", result5.affectedRows);
    console.log();

    // ex6
    console.log("===== ex6 =====");
    const bookId6 = 7;
    const [result] = await conn.execute("DELETE FROM books WHERE id = ?", [
      bookId6,
    ]);
    console.log("Rows affected:", result.affectedRows);
    console.log();

    // ex7
    console.log("===== ex7 =====");
    const [rows7] = await conn.execute(
      `SELECT
        customers.name AS 'customer name',
        books.title AS 'book title',
        orders.quantity
      FROM orders
      INNER JOIN customers
      ON orders.customer_id = customers.id
      INNER JOIN books
      ON orders.book_id = books.id`,
    );
    for (const row of rows7) {
      console.log(row);
    }
    console.log();

    // error handling
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();
