const promiseQuery = require('../../utils/promiseQuery');
const setLoginTimeout = require('./setLoginTimeout')
const setLoginAttempts = require('./setLoginAttempts');


async function addLoginAttempt(username) {

    try {
        // imcrementing number of attempts
        const addAttempt = "UPDATE users SET login_attempts = login_attempts + 1 WHERE username = ?";
        await promiseQuery(addAttempt, [username]);
    }
    catch (err) {
        console.error('Internal server error while adding login attempt:' , err.message);
        return( {success: false, status: 500, message: 'Internal server error while calling getLoginTimeout'});
    }

    try {
        // Checking # of login attempts to see if a timeout needs to be placed
        const getLoginAttempts = "SELECT login_attempts FROM users where username = ?";
        const result = await promiseQuery(getLoginAttempts, [username]);
        // console.log(result[0].login_attempts)
        // set timeout at 10 attempts
        if( result[0].login_attempts >= 10 ) {
            // timeout will be false if timeout has passed or no timeout
            const timeoutResult = await setLoginTimeout(username);
            // reset login attempts back to 0
            await setLoginAttempts(username, 0);
            console.log('Account locked');
            return timeoutResult;
        }
        else {
            return ( {success: true, status: 200, message: 'Succesfully incremented login attempts'} )
        }
    }
    catch (err) {
        console.error('Added login attempt but error fetching login attempts:', err.message);
        return ( {success: false, status: 500, message: 'Error fetching login attempts: ' + err.message} );
    }
    
}

module.exports = addLoginAttempt;