const db = require('../../db/db')
const mysql = require('mysql2');
const promiseQuery = require('../../utils/promiseQuery');


async function getUsers() {
    const query = "SELECT * FROM USERS";

    try {
        const results = await promiseQuery(query);
        return ( { status: 200, message: 'Users fetched succesfully', data: results } );
    }
    catch (err) {
        console.log(err.message);
        if (err.code == 1146) {
            return ( {status: 401, message: 'Permission denied'} );
        }
        return ( { status: 500, message: 'Internal server error while fetching users'} );
    }
}

module.exports = getUsers;