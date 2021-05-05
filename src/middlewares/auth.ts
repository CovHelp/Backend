const jwt = require('jsonwebtoken');

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if(decodedToken){
            next()
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            res.status(401).json({
                error: 'Token malformed'
            });
        } else if (e.name === 'TokenExpiredError') {
            res.status(401).json({
                error: 'Token Expired, login again'
            });
        }
    }
};

