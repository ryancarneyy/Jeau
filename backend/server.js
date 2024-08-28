const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: 'scoretalk'
});

app.get('/', (req, res) => {
    return res.json("From backend");
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err, results, fields) => {
        if(err) {
            console.error('Query error:', err);
            db.end();
            return;
        }
        else
            return res.json(results);
    })
});


app.post('/addUser', (req, res) => {
    console.log( req.body );
    const { username, email, password, first_name, last_name, phone_number, date_of_birth } = req.body;

    const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [username, email, password, first_name, last_name, phone_number, date_of_birth], (err, results) => {
        if (err) {
        console.error('Error inserting user into the database:', err.stack);
        res.status(500).json( {message: 'Error adding user'} );
        return;
        }
        res.status(200).json({ message: 'User added succesfully', id: results.insertId });
    });
});
  

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

