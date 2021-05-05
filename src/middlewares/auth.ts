import { getRepository } from "typeorm";
import { User } from "../entity/User";

const jwt = require('jsonwebtoken');

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const userRepo = getRepository(User);
            const userResult = await userRepo.find({
                where: [{ email: decodedToken.email }],
                join: {
                    alias: 'user',
                    leftJoinAndSelect: {
                        token: "user.token"
                    }
                }
            })
            if (userResult.length > 0) {
                delete userResult[0].googleId;
                const tokenVal = userResult[0].token.token;
                delete userResult[0].token
                req.userData = { user: userResult[0], token: tokenVal }
                next()

            }
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