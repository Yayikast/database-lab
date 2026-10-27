// db.js - one shared connection pool for the whole app
// FIXED (Assignment Q6, Q7): connect as bookstore_app, and read these settings
// from a .env file with process.env instead of typing them here.
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
