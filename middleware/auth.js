const jwt = require("jsonwebtoken");
const config = require('electron-node-config');

module.exports = function (req, res, next) {
    // console.log(`auth header: ${req.header}`);
    // console.log(`auth req: ${req}`);
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Access denied. Invalid token.");
    }
    
    req.user = jwt.decode(token, config.get("PrivatKey"));
    
    if (!req.user) {
        return res.status(401).send("Access denied. Invalid token.");
    }
    next();
}

