const {check} = require('express-validator');
const { validateJWT, hasRole } = require("../auth/validations");
const { genreIdExistFunction, genreUniqueFunction } = require('../customFunctions/index');
const { USER_ROLE, ADMIN_ROLE } = require("../../../constants/index");
const {
    idRequired,
    validResult, 
    roleValid
} = require('../commons');


const _nameRequired = check('name', 'Name is required')
    .not()
    .isEmpty()
;
const _nameIsUnique = check('name').custom(genreUniqueFunction);
const _imageRequired = check('image_url', 'Image is required')
    .not()
    .isEmpty()
;
const _imageType = check('image_url', "Image must be an URL").isURL()
const _idExist = check("id").custom(genreIdExistFunction);



const getGenreListValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    validResult,
];
const getGenreByIdValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];

const postGenreValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameIsUnique,
    _imageRequired,
    _imageType,
    validResult,
];

const putGenreValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];
const deleteGenreValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult,
];

module.exports = {
    getGenreListValidations,
    getGenreByIdValidations,
    postGenreValidations,
    putGenreValidations,
    deleteGenreValidations
};