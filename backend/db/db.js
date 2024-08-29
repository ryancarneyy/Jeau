const mysql = require('mysql2');
require('dotenv').config();

// db object used to query
const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME
});

module.exports = db;
