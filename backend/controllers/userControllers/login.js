const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
require('dotenv').config();

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
                    // error finding user
                    console.error('Error while finding user:', err.stack);
                    resolve( { success: false, status: 500, message: 'Error while finding user' } );
                }
                else if (results.length === 0) {
                    // user not found
                    console.log('User not found');
                    resolve( { success: false, status: 404, message: 'User not found' } );
                }
                
                // Comparing hashed passwords
                const user = results[0];
                const hashedDBPassword = user.password;
                try {
                    const passwordMatch = await bcrypt.compare(password, hashedDBPassword);
                    if (passwordMatch) {
                        // succesfull login
                        console.log('Login successful');
                        
                        // payload for token
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
                    // Error while validating password
                    console.error('Server error validating password', err.message);
                    resolve( { success: false, status: 500, message: 'Internal Server Error while comparing password' } );
                }
            });
        });
    }
    catch (err) {
        // Error while calling login
        console.error('Error during login: ', err.message);
        return { success: false, status: 500, message: 'Internal Server Error' };
    }
}

module.exports = { login };