const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = '2h';

const authMiddleware = (req, res, next) => {

// Allows token to be sent via req.body, req.query, or headers` 3X CC
   let token =
    (req.body && req.body.token) ||
    req.query.token ||
    req.headers.authorization;
 // We split the token string into an array and return actual token
   if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
       }

if (!token) {
    return res.status(401).json({
        message: "Authentication token missing"
    });
}

try {
    const decoded = jwt.verify(token, secret, { maxAge:expiration });
    req.user = decoded;
    next();
} catch (error){
    console.log('Invalid token');
    return res.status(401).json({
        message: "invalid token"
    });
}
};
module.exports = { authMiddleware };