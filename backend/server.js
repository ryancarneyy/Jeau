const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const hashPassword = require('./utils/hashPassword')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { hash } = require('bcrypt');
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




app.post('/addUser', async (req, res) => {
    console.log( 'User received:' )
    console.log( req.body );

    const { username, email, password, first_name, last_name, phone_number, date_of_birth } = req.body;

    try {
        const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const hashedPassword = await hashPassword(password);

        db.query(query, [username, email, hashedPassword, first_name, last_name, phone_number, date_of_birth], (err, results) => {
            if (err) {
            console.error('Error inserting user into the database:', err.stack);
            return res.status(500).json( {message: 'Error adding user'} );
            }
            return res.status(200).json({ message: 'User added succesfully', id: results.insertId });
        });
    }
    catch(err) {
        return res.status(500).json( {message: 'Error hashing password'} );
    }
   
});

app.post('/loginVerification', async (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT password FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error finding user:', err.stack);
            return res.status(500).json( {message: 'Error finding user'} );
        }
        else if (results.length === 0) {
            console.log('User not found');
            return res.status(404).json( {message: 'User not found'} );
        }
        
        const hashedDBPassword = results[0].password;
        try {
            const passwordMatch = await bcrypt.compare(password, hashedDBPassword);
            if (passwordMatch) {
                console.log('Login successful');
                return res.status(200).json( {message: 'Login successful'} );
            }
            else {
                console.log('Login failed');
                return res.status(401).json( {message: 'Login failed'});
            }
        }
        catch (err) {
            console.error('Error validating password');
            return res.status(500).json( {message: 'Error validating password'} );
        }
    })
})
  

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

