const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (e) {
        return res.status(401).json({message: 'Authentication failed '})
    }

}