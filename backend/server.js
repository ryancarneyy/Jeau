const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors())

const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: 'scoretalk'
})

app.get('/', (req, res) => {
    return res.json("From backend");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

