/*
exports.validateSigninRequest = [
    check('Email')
    .isEmail()
    .withMessage('Valid Email  is required'),
    check('Password')
    .isLength({min:6})
    .withMessage('password must be at least 6 character long')
];

exports.isRequestValidated = ( req , res , next ) => {
    const errors = validationResult(req);
    if( errors.array().length > 0  ){
        return res.status(400).json({ error : errors.array()[0].msg })
    }
    next();
}*/