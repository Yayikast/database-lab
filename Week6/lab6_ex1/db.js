// db.js
// connections are in this file

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lab6",
  connectionLimit: 10,
});

module.exports = pool;
