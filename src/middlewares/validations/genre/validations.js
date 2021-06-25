const {check} = require('express-validator');
const { validateJWT, hasRole } = require("../auth/validations");
const { genreIdExistFunction, genreUniqueFunction } = require('../customFunctions/index');
const { ADMIN_ROLE } = require("../../../constants/index");
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
    validResult,
];
const getGenreByIdValidations = [
    idRequired,
    _idExist,
    validResult,
];

const postGenreValidations = [
    validateJWT,
    _nameRequired,
    _nameIsUnique,
    _imageRequired,
    _imageType,
    validResult,
];

const putGenreValidations = [
    validateJWT,
    idRequired,
    _idExist,
    validResult,
];
const deleteGenreValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    _idExist,
    roleValid,
    validResult,
];

module.exports = {
    getGenreListValidations,
    getGenreByIdValidations,
    postGenreValidations,
    putGenreValidations,
    deleteGenreValidations
};