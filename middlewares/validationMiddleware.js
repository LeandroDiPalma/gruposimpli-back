import { check, validationResult } from 'express-validator';
import { isValidEmail, isPositiveNumber } from '../utils/validationHelpers.js';

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const vehicleValidationRules = () => {
    return [
        check('make').not().isEmpty().withMessage('Make is required'),
        check('model').not().isEmpty().withMessage('Model is required'),
        check('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),
        check('price').custom(value => isPositiveNumber(value) && value >= 0).withMessage('Price must be a positive number'),
        validateResult
    ];
}

export const accessoryValidationRules = () => [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('price').custom(value => isPositiveNumber(value) && value >= 0).withMessage('Price must be non-negative and a valid number'),
    validateResult
];


export const dealerValidationRules = () => {
    return [
        check('name')
            .not().isEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

        check('location')
            .not().isEmpty().withMessage('Location is required')
            .isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),
        validateResult
    ];
}

export const leadValidationRules = () => {
    return [
        check('email').custom(isValidEmail).withMessage('Invalid email format'),
        check('firstName').not().isEmpty().withMessage('First name is required'),
        check('lastName').not().isEmpty().withMessage('Last name is required'),
        validateResult
    ];
}

export const postValidationRules = () => {
    return [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('content').not().isEmpty().withMessage('Content is required'),
        validateResult
    ];
}
