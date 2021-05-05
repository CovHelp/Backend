import { isString } from 'class-validator';
import { check, checkSchema, validationResult } from 'express-validator';

export const createNeedHelpPostValidator = [
    check('city').exists().withMessage("City not found"),
    check('state').exists().withMessage("State not found"),
    check('lat').exists().withMessage("Latitude not found"),
    check('long').exists().withMessage("Longitude not found"),
    check('body').exists().bail().withMessage("Post Body not found").isString(),
    check('category').exists().withMessage('Category is not present'),
    check('phoneNumber').exists().withMessage("Phone Number not found"),
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