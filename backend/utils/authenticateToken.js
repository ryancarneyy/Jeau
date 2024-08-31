const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.cookies.token;
    // console.log(`${token}`);
    if (!token) {
        // If no token is provided, return an error
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            // If token verification fails, return an error
            return res.status(403).json({ message: 'Invalid token' });
        }

        // If verification succeeds, attach the user object to the request object
        req.user = user;

        // Continue to the next middleware function or route handler
        next();
    });
}

module.exports = authenticateToken;
