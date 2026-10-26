// db.js - one shared connection pool for the whole app
// Exercise 3: the settings come from the .env file (never committed), and the app
// connects as the least-privilege user university_app from Exercise 2, not root.
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
