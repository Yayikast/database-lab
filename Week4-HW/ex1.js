const mysql = require("mysql2/promise");
async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lab4-hw",
  });

  console.log("connected");
}

main();
