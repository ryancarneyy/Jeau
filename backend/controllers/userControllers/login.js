const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const promiseQuery = require('../../utils/promiseQuery');
const getLoginTimeout = require('./getLoginTimeout');
const addLoginAttempt = require('./addLoginAttempt');
const setLoginAttempts = require('./setLoginAttempts');
const getLoginAttempts = require('./getLoginAttempts');
require('dotenv').config();

// controller function for user logging in
// req.body is passed in as user, contains {username, password}


async function login(user) {
    try {
        // console.log(user);
        const { username, password } = user;
        const loginTimestampStatus = await getLoginTimeout(username);
        if(loginTimestampStatus.timeout) {
            if (loginTimestampStatus.status === 500) {
                console.log('User Timeout failed, error while fetching user timeout')
                return({success: false, status: 403, message: 'Error while fetching user timeout'});
            }
            else {
                console.log('User in timeout');
                return({success: false, status: 403, message: 'User in timeout'});
            }
        }
        // console.log('no login timeout')
        const query = 'SELECT * FROM users WHERE username = ?';
        
        // Query the database
        const results = await promiseQuery(query, [username]);
        
        if (results.length === 0) {
            // User not found
            console.log('User not found');
            return { success: false, status: 404, message: 'User not found' };
        }

        // Comparing hashed passwords
        const userRecord = results[0];
        const hashedDBPassword = userRecord.password;
        const passwordMatch = await bcrypt.compare(password, hashedDBPassword);
        
        if (passwordMatch) {
            // Successful login
            console.log('Login successful');

            // Payload for token
            const payload = {
                id: userRecord.id,
                username: userRecord.username,
                email: userRecord.email,
                role: userRecord.role,
                iat: Math.floor(Date.now() / 1000), // Issue time
                iss: 'jeau.com',
                sub: 'user_authentication' // Subject
            };

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
            // resets incorrect login attempts to 0
            await setLoginAttempts(username, 0);
            return { success: true, status: 200, message: 'Login Successful', username: userRecord.username, token };
        } else {
            // console.log('Login failed');
            await addLoginAttempt(username);
            // to return to user to show how many attempts they have left
            const loginAttemptsResult = await getLoginAttempts(username);
            const attemptsLeft = 10 - loginAttemptsResult.numAttempts;
            return { success: false, status: 401, message: 'Authorization Failed', numAttempts: attemptsLeft};
        }
    } catch (err) {
        // Error handling
        console.error('Error during login:', err.message);
        return { success: false, status: 500, message: 'Internal Server Error while calling login' + err.message };
    }
}



module.exports = { login };