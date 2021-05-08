import { isString } from 'class-validator';
import { check, checkSchema, validationResult } from 'express-validator';

export const createNeedHelpPostValidator = [
    check('city').exists().withMessage("City not found"),
    check('state').exists().withMessage("State not found"),
    check('lat').exists().withMessage("Latitude not found"),
    check('long').exists().withMessage("Longitude not found"),
    check('body').exists().bail().withMessage("Post Body not found").isString(),
    check('body').isString().bail().withMessage('Invalid Body'),
    check('body').isLength({min: 10}).bail().withMessage('atleast 10 chars shd be present in Body'),
    check('category').exists().bail().withMessage('Category is not present'),
    check('category').isNumeric().isIn([1, 2, 3, 4, 5, 6]).withMessage('Invalid Category'),
    check('phoneNumber').exists().bail().withMessage("Phone Number not found"),
    check('urgency').exists().withMessage("Urgency level not found"),
    check('isPhoneNumberPublic').exists().bail().withMessage("Phone Number visibility not found").isBoolean().withMessage("Expecting a bool"),
    check('isClosed').exists().withMessage('Post status missing'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]

export const createProvideHelpPostValidator = [
    check('locations').exists().bail().withMessage('Locations not found'),
    check('locations').isArray({min: 1}).withMessage("At least one Locations shd be present"),
    check('body').exists().bail().withMessage("Post Body not found"),
    check('body').isString().bail().withMessage('Invalid Body'),
    check('body').isLength({min: 10}).bail().withMessage('atleast 10 chars shd be present in Body'),
    check('category').exists().bail().withMessage('Category is not present'),
    check('category').isNumeric().isIn([1, 2, 3, 4, 5, 6]).withMessage('Invalid category'),
    check('phoneNumber').exists().bail().withMessage("Phone Number not found"),
    check('urgency').exists().withMessage("Urgency level not found"),
    check('isPhoneNumberPublic').exists().bail().withMessage("Phone Number visibility not found").isBoolean().withMessage("Expecting a bool"),
    check('isClosed').exists().withMessage('Post status missing'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]