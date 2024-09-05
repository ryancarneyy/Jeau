const promiseQuery = require('../../utils/promiseQuery');

// Sets the number of incorrect login attempts for a user
// Only used to reset login attempts to 0 after a timeout or a success
async function getLoginAttempts(username) {
    try {
        // setting number of attempts
        const getAttempts = "SELECT login_attempts FROM users WHERE username = ?";
        const result = await promiseQuery(getAttempts, [username]);
        if(result.length > 0) {
            return ( {success: true, status: 200, message: `Login attempts fetched for user ${username}`, numAttempts: result[0].login_attempts} );
        }
        else {
            throw new Error(`Unable to fetch number of user attempts for user ${username}`);
        }
        
    }
    catch (err) {
        console.error('Internal server error while getting user login attempts' , err.message);
        return( {success: false, status: 500, message: 'Internal server error while calling getLoginTimeout'});
    }
    
}

module.exports = getLoginAttempts;