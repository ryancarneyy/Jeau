// Controller functions for user functionality
const hashPassword = require('../../utils/hashPassword');
const db = require('../../db/db');
const promiseQuery = require('../../utils/promiseQuery');
require('dotenv').config();

// controller function for user signing up
// req.body is passed in as user, contains all fields for creating new user for db
async function addUser( user ) {
    try {

        console.log(user);
        const { username, email, password, first_name, last_name, phone_number, date_of_birth, role} = user;
        if (!username || !email || !password || !first_name || !last_name || !phone_number || !date_of_birth || !role)  {
            return ( { success: false, status: 400, message: 'All fields are required' } );
        }
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, date_of_birth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await promiseQuery(query, [username, email, hashedPassword, first_name, last_name, phone_number, date_of_birth, role]);

        console.log('User added succesfully');
        return ( { success: true, status: 200, message: 'User added succesfully' } );
    }
    catch(err) {
        console.error('Error while adding user', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return ( { success: false, status: 409,  message: 'Conflict: User already exits' } );
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            return( { success: false, status: 403,  message: 'Forbidden: Access denied' } );
        } else {
            return( { success: false, status: 500, message: 'Error while adding user' + err.message } );
        }
    }
}



module.exports = { addUser };