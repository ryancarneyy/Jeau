const promiseQuery = require('../../utils/promiseQuery');

// fetches login timeout value from user in order to prevent brute force attack
// if there is a login timeout, the user cannot login to that username for 30 min
async function getLoginTimeout(username) {

    try {
        const query = "SELECT login_timeout FROM users WHERE username = ?";
        const result = await promiseQuery(query, [username]);
        if(result.length === 0) {
            console.error(`No login_timeout entry found for case username = ${username}`);
            return;
        }
        // Timeout timestamp not null
        else if (result[0].login_timeout){
            const currentTime = new Date();
            const lockTimestamp = new Date(result[0].login_timeout);
            // User's timeout is in future
            if (lockTimestamp >= currentTime ) {
                return {timeout: true, status: 200};
            }
            // User's timeout is passed
            else {
                // Set the timeout to NULL
                const lockTimeToZero = "UPDATE users SET login_timeout = NULL WHERE username = ?";
                try {
                    await promiseQuery(lockTimeToZero, [username]);
                    return {timeout: false, status: 200};
                }
                catch(err) {
                    return {timeout: false, status: 201, message: 'Failed to reset user timeout to NULL'}; 
                }
            }
        }
        // Timeout timestamp null
        else {
            return {timeout: false, status: 200};
        }
    }
    catch (err) {
        console.error('Internal server error while calling getLoginTimeout:' , err.message);
        return( {timeout: true, status: 500, message: 'Internal server error while calling getLoginTimeout'});
    }
}

module.exports = getLoginTimeout;