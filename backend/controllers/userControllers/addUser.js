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
        const dob = date_of_birth.split("/");
        // Formatted date of birth to be entered as YYYY-MM-DD
        const formatted_dob = dob[2] + '-' + dob[0] + '-' + dob[1];
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, date_of_birth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await promiseQuery(query, [username, email, hashedPassword, first_name, last_name, phone_number, formatted_dob, role]);

        console.log('User added succesfully');
        return ( { success: true, status: 200, message: 'User added succesfully' } );
    }
    catch(err) {
        console.error('Error while adding user', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            // Used to find the entry that has been taken (username or email)
            const users_dot = 'users.';
            const users_dot_index = err.message.indexOf(users_dot);
            let dup_entry = "";
            if(users_dot_index !== -1) {
                dup_entry = err.message.substring(users_dot_index + users_dot.length, err.message.length - 1);
            }
            return ( { success: false, status: 409,  message: dup_entry ? dup_entry + ' already taken': ""} );
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            return( { success: false, status: 403,  message: 'Forbidden: Access denied' } );
        } 
        else if (err.code === 'ER_TRUNCATED_WRONG_VALUE') {
            return( { success: false, status: 422,  message: 'Invalid entry for date of birth' } );
        } else {
            console.log(err.code);
            return( { success: false, status: 500, message: 'Error while adding user' + err.message } );
        }
    }
}



module.exports = { addUser };