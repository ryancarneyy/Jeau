// Holds routes for user functionality

const express = require('express');
const router = express.Router();
const addUser = require('../controllers/userControllers/addUser');
const login = require('../controllers/userControllers/login');

// route for users signing up
router.post('/signUp', async (req, res) => {
    try {
        const result = await addUser.addUser(req.body);

        if (result.success) {
            res.status(200).json(result);
        }
        else {
            // 409 -> Conflict (username taken)
            res.status(result.status).json(result);
        }
    }
    catch (err) {
        // internal server error
        res.status(500).json( {message: 'Internal server error while calling addUser: ' + err.message} );
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await login.login(req.body);
        if (result.success) {
            // successful login
            res.cookie('token', result.token, {
                httpOnly: true, // accessible only by the web server
                secure: process.env.NODE_ENV === 'production', // set to true if using HTTPS
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'strict', // helps mitigate CSRF attacks
            });
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