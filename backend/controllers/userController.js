// Controller functions for user functionality
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
require('dotenv').config();

// controller function for user signing up
// req.body is passed in as user, contains all fields for creating new user for db
async function addUser( user ) {
    try {
        console.log(user);
        const { username, email, password, first_name, last_name, phone_number, date_of_birth, role} = user;
        const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, date_of_birth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const hashedPassword = await hashPassword(password);

        // Promise is used to return a value from addUser
        return new Promise((resolve, reject) => {
            db.query(query, [username, email, hashedPassword, first_name, last_name, phone_number, date_of_birth, role], (err, results) => {
                if (err) {
                    console.error('Error while adding user', err.message);
                    resolve( { success: false, message: 'Error while adding user' } );
                }
                else {
                    console.log('User added successfully');
                    resolve( { success: true, message: 'User added succesfully' } );
                }
            });
        })
        
    }
    catch(err) {
        console.error('Error while adding user');
        console.error(err.message);
    }
}

// controller function for user logging in
// req.body is passed in as user, contains {username, password}
async function login( user ) {
    try {
        console.log(user);
        const {username, password} = user;
        const query = 'SELECT * FROM users WHERE username = ?';
        
        // return value for login function
        return new Promise((resolve, reject) => {
            db.query(query, [username], async (err, results) => {
                // Finding user 
                if (err) {
                    console.error('Error while finding user:', err.stack);
                    resolve( { success: false, status: 500, message: 'Error while finding user' } );
                }
                else if (results.length === 0) {
                    console.log('User not found');
                    resolve( { success: false, status: 404, message: 'User not found' } );
                }
                
                // Comparing hashed passwords
                const user = results[0];
                const hashedDBPassword = user.password;
                try {
                    const passwordMatch = await bcrypt.compare(password, hashedDBPassword);
                    if (passwordMatch) {
                        console.log('Login successful');
                        
                        const payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role,
                            iat: Math.floor(Date.now() / 1000), // issue time
                            iss: 'jeau.com',
                            sub: 'user_authentication' // subject
                        }
                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
                        resolve( { success: true, status: 200, message: 'Login Successful', token: token } );
                    }
                    else {
                        console.log('Login failed');
                        resolve( { success: false, status: 401, message: 'Authorization Failed' } );
                    }
                }
                catch (err) {
                    console.error('Server error validating password', err.message);
                    resolve( { success: false, status: 500, message: 'Internal Server Error while comparing password' } );
                }
            });
        });
    }
    catch (err) {
        console.error('Error during login: ', err.message);
        return { success: false, status: 500, message: 'Internal Server Error' };
    }
    
}

module.exports = { addUser, login };