const { check, validationResult } = require("express-validator");
const ErrorResponse = require('../../helpers/errorResponse');
const { emailExistFunction, roleValidFunction} = require('./customFunctions/index');

const firstnameRequired = check("firstname", "Firstname is required")
    .not()
    .isEmpty()
;
const lastnameRequired = check("lastname", "Lastname is required")
    .not()
    .isEmpty()
;
const usernameRequired = check("username", "Username is required")
    .not()
    .isEmpty()
    .isLength({
        min:5,
        max:16
    }
);

const emailRequired = check("email", "Email is required")
    .not()
    .isEmpty()
;
const emailType = check("email", "Must be an email").isEmail();
const emailExist = check("email").custom(emailExistFunction);
const passwordRequired = check("password", "Password is required")
    .not()
    .isEmpty()
;
const roleValid = check("role")
    .optional()
    .custom(roleValidFunction)
;
const idRequired = check("id")
    .not()
    .isEmpty()
;
const optionalEmailValid = check("email", "Email is invalid")
    .optional()
    .isEmail()
;
const optionalEmailExist = check("email")
    .optional()
    .custom(emailExistFunction)
;


const validResult = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        throw new ErrorResponse(`Validation Error`, 400, err.errors);
    }
    next();
};

module.exports = {
    firstnameRequired,
    lastnameRequired,
    usernameRequired,
    emailRequired,
    emailType,
    emailExist,
    passwordRequired,
    roleValid,
    idRequired,
    optionalEmailValid,
    optionalEmailExist,
    validResult
}