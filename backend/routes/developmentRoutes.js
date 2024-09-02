const express = require('express');
const router = express.Router();
const getUsers = require('../controllers/developmentControllers/getUsers');

router.get('/getUsers', async (req, res) => {
    try {
        const results = await getUsers();
        return res.status(results.status).json( {message: 'Users getched succesfully', users: results.data});
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json( {message: 'Internal Server Error while calling getUsers'} );
    }
})


module.exports = router;