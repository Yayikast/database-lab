const mysql = require("mysql2/promise");

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  try {
    const [rows] = await conn.execute(
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

    for (const row of rows) {
      console.log(row);
    }
  } catch (err) {
    console.error("Query failed: ", err.message);
  } finally {
    await conn.end();
  }
}

main();
