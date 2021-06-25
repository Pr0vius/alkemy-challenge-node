const { check } = require('express-validator');
const { validateJWT, hasRole } = require("../auth/validations");
const { ADMIN_ROLE } = require("../../../constants/index");
const { 
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
} = require('../commons');


const _idExist = check("id").custom(async (id = "") => {
    const userFound = await userService.findById(id);
    if (!userFound) {
        throw new ErrorResponse("The id doesn't exist", 400);
    }
});

const getAllUsersValidations = [
    validateJWT,
    validResult,
]
const getUserByIdValidations = [
    validateJWT,
    idRequired,
    _idExist,
    validResult,
];

const postUserValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    firstnameRequired,
    lastnameRequired,
    usernameRequired,
    emailRequired,
    emailType,
    emailExist,
    passwordRequired,
    roleValid,
    validResult,
];

const putUserValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    _idExist,
    roleValid,
    optionalEmailValid,
    optionalEmailExist,
    validResult,
];
const deleteUserValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    _idExist,
    validResult,
];

module.exports = {
    getAllUsersValidations,
    getUserByIdValidations,
    postUserValidations,
    putUserValidations,
    deleteUserValidations
};
