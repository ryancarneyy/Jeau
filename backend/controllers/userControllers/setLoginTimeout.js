const promiseQuery = require('../../utils/promiseQuery');

// Sets a 30 minute timeout for a user
// Gets called after 10 incorrect attempts
async function setLoginTimeout(username) {

    try {
        const setTimeout = "UPDATE users SET login_timeout = DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE username = ?";
        await promiseQuery(setTimeout, [username]);
        return ( {success: true, status: 200, message: `Succesfully set timeout for user: ${username}`});
    }
    catch (err) {
        console.error('Internal server error while setting user timeout' , err.message);
        return( {success: false, status: 500, message: 'Internal server error while calling setLoginTimeout'});
    }

}

module.exports = setLoginTimeout;
