const { check } = require("express-validator");
const { validateJWT, hasRole } = require("../auth/validations");
const { ADMIN_ROLE, USER_ROLE } = require("../../../constants/index");
const { idRequired, validResult, roleValid } = require("../commons");
const { charNameUniqueFunction, characterIdExistFunction } = require("../customFunctions");

const _idExist = check("id").custom(characterIdExistFunction);
const _nameRequired = check("name", "Name is required")
    .not()
    .isEmpty()
;
const _nameIsUnique = check("name").custom(charNameUniqueFunction);
const _imageRequired = check("image_url", "Image is required")
    .not()
    .isEmpty()
;
const _imageType = check("image_url", "Image must be an URL").isURL();
const _ageIsNumeric = check("age", "Age must be a number")
    .optional()
    .isNumeric()
;
const _weigthIsNumeric = check("weigth", "Must be a number")
    .optional()
    .isNumeric()
;
const _historyRequired = check("history", "History is required")
    .not()
    .isEmpty()
;


const getCharListValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    validResult
];
const getCharByIdValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];

const postCharValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    _nameRequired,
    _nameIsUnique,
    _imageRequired,
    _imageType,
    _ageIsNumeric,
    _weigthIsNumeric,
    _historyRequired,
    validResult,
];

const putCharValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];
const deleteCharValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];

module.exports = {
    getCharListValidations,
    getCharByIdValidations,
    postCharValidations,
    putCharValidations,
    deleteCharValidations,
};
