import { isString } from 'class-validator';
import { check, checkSchema, validationResult } from 'express-validator';

export const createOrganizationValidator = [
    check('name').exists().withMessage("Organization Name not found"),
    check('donation').exists().bail().withMessage("Donation medium not found"),
    check('website').exists().withMessage("Website not found"),
    check('image').exists().withMessage("Image Name not found"),
    check('category').exists().withMessage("Category Name not found"),
    check('locations').exists().bail().withMessage('Locations not found'),
    check('locations').isArray({min: 1}).withMessage("At least one Locations shd be present"),
    check('address').exists().withMessage("address not found"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]