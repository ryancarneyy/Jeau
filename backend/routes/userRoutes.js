// Holds routes for user functionality

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// route for users signing up
router.post('/signUp', async (req, res) => {
    try {
        const result = await userController.addUser(req.body);
        if (result.success) {
            // success
            res.status(200).json(result);
        }
        else {
            // 409 -> Conflict (username taken)
            res.status(409).json(result);
        }
    }
    catch (err) {
        // internal server error
        res.status(500).json( {message: 'Internal server error while calling addUser: ' + err.message} );
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userController.login(req.body);
        if (result.success) {
            // successful login
            res.status(200).json(result);
        }
        else {
            // status determined in login function
            res.status(result.status).json(result);
        }
    }
    catch(err) {
        // failure while calling login
        res.status(500).json( {message: 'Internal server error while calling login: ' + err.message} );
    }
});


module.exports = router;