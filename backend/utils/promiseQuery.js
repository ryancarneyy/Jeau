const db = require('../db/db');

// Promisified query
const promiseQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = promiseQuery;