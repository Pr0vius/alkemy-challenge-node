const ErrorResponse = require("../../../helpers/errorResponse");
const { validateToken, validateRole } = require("../../../service/auth.service");
const {
    validResult,
    firstnameRequired,
    lastnameRequired,
    usernameRequired,
    usernameUnique,
    emailRequired,
    emailType,
    emailExist,
    passwordRequired,
    roleValid,
} = require("../commons");


const loginValidations = [
    emailRequired,
    emailType,
    passwordRequired,
    validResult,
];

const registerValidations = [
    firstnameRequired,
    lastnameRequired,
    usernameRequired,
    usernameUnique,
    emailRequired,
    emailType,
    emailExist,
    passwordRequired,
    roleValid,
    validResult,
];

const validateJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = await validateToken(token);
        req.user = user;
        next();
    } catch (err) {
        next(new ErrorResponse("Can't validate the token", 400, err));
    }
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validateRole(req.user, ...roles);
            next();
        } catch (err) {
            next(new ErrorResponse("User Unauthorized", 400, err));
        }
    };
};
module.exports = {
    loginValidations,
    registerValidations,
    validateJWT,
    hasRole,
};
