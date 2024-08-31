// Database 
const db = require('./db/db');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();

// Server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use(cors( {
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.json("From backend");
});


app.get('/users/getUsers', (req, res) => {
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


app.use('/users', userRoutes);



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

