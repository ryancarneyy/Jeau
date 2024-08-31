// Holds routes for user functionality

const express = require('express');
const router = express.Router();
const addUser = require('../controllers/userControllers/addUser');
const login = require('../controllers/userControllers/login');
// const getProfile = require('../controllers/userControllers/getProfile');
const authenticateToken = require('../utils/authenticateToken');


// route for users signing up
router.post('/signUp', async (req, res) => {
    try {
        const result = await addUser.addUser(req.body);
        res.status(result.status).json(result)
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
            // console.log('Sending cookie');
            res.cookie('token', result.token, {
                httpOnly: true, // accessible only by the web server
                secure: process.env.NODE_ENV === 'production', // set to true if using HTTPS
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'strict', // helps mitigate CSRF attacks
            });
            console.log(result);
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

// For fetching users profile + data
router.get('/profile/:username', authenticateToken, async (req, res) => {
        try {
            // Authentication failures handled in authenticateToken
            const clientUsername = req.user.username;
            const profileUsername = req.params.username;
            if (clientUsername == profileUsername) {
                res.status(200).json({ self: true, message: 'Fetched client\'s profile', user: req.user} );
            }  
            else {
                res.status(200).json({ self: false, message: 'Fetched other user\'s profile', user: req.user.username} );
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Internal Server Error while fetching profile' });
        }
    }
);


module.exports = router;