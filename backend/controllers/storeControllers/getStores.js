const promiseQuery = require('../../utils/promiseQuery');


async function getStores() {

    try {
        const query = 'SELECT * FROM stores';
        const results = await promiseQuery(query);

        return {success: true, status: 200, message: 'Stores fetched successfully', stores: results};
    }
    catch(err) {
        return {success: false, status: 500, message: 'Error while fetching stores from database'};
    }

}

module.exports = getStores;