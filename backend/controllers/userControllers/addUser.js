// Controller functions for user functionality
const bcrypt = require('bcrypt');
const hashPassword = require('../../utils/hashPassword');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
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



module.exports = { addUser };