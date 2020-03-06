const jwt = require('jsonwebtoken');
const secret = 'secret';

const withAuth = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    if(!token) {
        res.status(401).send('Unuathorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unuathorized: Invalid token');
            } else {
                req.email = decoded.email
                next();
            }
        })
    }
}

module.exports = withAuth;