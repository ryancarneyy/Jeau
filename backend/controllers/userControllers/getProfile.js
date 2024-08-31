// Controller function for fetching user profile
const db = require('../../db/db');
const promiseQuery = require('../../utils/promiseQuery');



async function getProfile(username){
    // console.log(username);
    
    try {
        const query = "SELECT username, email, role FROM users where username = ?";
        const results = promiseQuery(query, [username]);

        return ( {success: true, status: 200, data: results } );
    }
    catch (err) {
        console.error(`Error while fetching user id=${user.id} data`);
        return ( {success: true, status: 500} );
    }

}

module.exports = getProfile;