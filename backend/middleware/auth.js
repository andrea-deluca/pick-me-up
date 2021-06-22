const jwt = require("jsonwebtoken")
const tokenKey = "pick-me-up";

const withAuth = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).send()
    } else {
        jwt.verify(token, tokenKey, (err, decoded) => {
            if (err) {
                res.status(403).send()
            } else{
                req.email = decoded.email;
                next();
            }
        });
    }
}

module.exports = withAuth;