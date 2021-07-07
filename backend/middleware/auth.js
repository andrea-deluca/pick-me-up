const jwt = require("jsonwebtoken")
const tokenKey = "pick-me-up";

const withAuth = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send("Non autorizzato: No token provided")
    } else {
        jwt.verify(token, tokenKey, (err, decoded) => {
            if (err) {
                res.status(401).send("Non autorizzato: Invalid token")
            } else{
                req.id = decoded.id;
                next();
            }
        });
    }
}

module.exports = withAuth;