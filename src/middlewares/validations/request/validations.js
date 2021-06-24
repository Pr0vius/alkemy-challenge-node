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
    idExist,
    optionalEmailValid,
    optionalEmailExist,
    validResult 
} = require('../commons');



const getAllUsersValidations = [
    // validateJWT,
    validResult,
]
const getUserByIdValidations = [
    // validateJWT,
    idRequired,
    idExist,
    validResult,
];

const postUserValidations = [
    // validateJWT,
    // hasRole(ADMIN_ROLE),
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
    // validateJWT,
    // hasRole(ADMIN_ROLE),
    idRequired,
    idExist,
    roleValid,
    optionalEmailValid,
    optionalEmailExist,
    validResult,
];
const deleteUserValidations = [
    // validateJWT,
    // hasRole(ADMIN_ROLE),
    idRequired,
    idExist,
    validResult,
];

module.exports = {
    getAllUsersValidations,
    getUserByIdValidations,
    postUserValidations,
    putUserValidations,
    deleteUserValidations
};
