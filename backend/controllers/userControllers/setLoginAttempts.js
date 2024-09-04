const promiseQuery = require('../../utils/promiseQuery');

// Sets the number of incorrect login attempts for a user
// Only used to reset login attempts to 0 after a timeout or a success
async function setLoginAttempts(username, numAttempts) {
    try {
        // setting number of attempts
        const setAttempts = "UPDATE users SET login_attempts = ? WHERE username = ?";
        await promiseQuery(setAttempts, [numAttempts, username]);
        return ( {success: true, status: 200, message: `User ${username} login attempts set to ${numAttempts}`});
    }
    catch (err) {
        console.error('Internal server error while setting login:' , err.message);
        return( {success: false, status: 500, message: 'Internal server error while calling getLoginTimeout'});
    }
    
}

module.exports = setLoginAttempts;