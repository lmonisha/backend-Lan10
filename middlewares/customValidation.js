const { body, validationResult } = require('express-validator');

module.exports.insertValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('dob').trim().notEmpty().withMessage('Date of birth is required'),
    body('age').trim().notEmpty().isNumeric().withMessage('Age is required and must be numeric'),
    body('gender').trim().notEmpty().withMessage('Gender is required'),
    body('mobileNo').trim().notEmpty().isNumeric().withMessage('Mobile number is required and must be numeric'),
    body('createdby').trim().notEmpty().withMessage('Createdby is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];



module.exports.updateValidation = [
    body('_id').trim().notEmpty().withMessage('ID is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('dob').trim().notEmpty().withMessage('Date of birth is required'),
    body('age').trim().notEmpty().isNumeric().withMessage('Age is required and must be numeric'),
    body('gender').trim().notEmpty().withMessage('Gender is required'),
    body('mobileNo').trim().notEmpty().isNumeric().withMessage('Mobile number is required and must be numeric'),
    body('createdby').trim().notEmpty().withMessage('Createdby is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports.deleteValidation = [
    body('_id').trim().notEmpty().withMessage('ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];



module.exports.loginValidation = [
    body('userName').trim().notEmpty().withMessage('userName is required'),
    body('password').trim().notEmpty().withMessage('password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports.forgotPassValidation = [
    body('userName').trim().notEmpty().withMessage('userName is required'),
    body('passwordNew').trim().notEmpty().withMessage('password is required'),
    body('confrmPasswrd').trim().notEmpty().withMessage('confirm password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
    console.log('iam here')

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
