const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = '2h';

const authMiddleware = (req, res, next) => {

// Allows token to be sent via req.body, req.query, or headers` 3X CC
  let token = req.headers.authorization;
 // We split the token string into an array and return actual token
//    if (req.headers.authorization) {
//     token = token.split(' ').pop().trim();
//        }

if (!token) {
    return res.status(401).json({
        message: "Authentication token missing"
    });
}
if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (error){
    console.log('Invalid token');
    console.log("TOKEN:", token);
    return res.status(401).json({
        message: "invalid token"
    });
}
};
module.exports = { authMiddleware };