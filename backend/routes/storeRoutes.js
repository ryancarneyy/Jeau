const express = require('express');
const router = express.Router();

const getStores = require('../controllers/storeControllers/getStores');

router.get('/getStores', async (req, res) => {
    try {
        const results = await getStores();
        res.status(results.status).json(results);
    }
    catch (err) {
        res.status(500).json( {message: 'Internal server error while calling getStores: ' + err.message} );
    }
})


module.exports = router;