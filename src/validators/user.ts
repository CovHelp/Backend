import { isString } from 'class-validator';
import { check, checkSchema, validationResult } from 'express-validator';

export const createUserValidator = [
    check('email').exists().isEmail(),
    check('givenName').exists().withMessage('First Name is required'),
    check('googleId').exists().withMessage('Google Id not found'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]