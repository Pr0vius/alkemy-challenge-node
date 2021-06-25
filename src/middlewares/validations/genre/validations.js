const {check} = require('express-validator');
const { validateJWT, hasRole } = require("../auth/validations");
const characterService = require('../../../service/character.service');
const { ADMIN_ROLE } = require("../../../constants/index");
const {
    idRequired,
    idExist,
    validResult, 
    roleValid
} = require('../commons');
const ErrorResponse = require("../../../helpers/errorResponse");


const _nameRequired = check('name', 'Name is required').not().isEmpty();
const _nameIsUnique = check('name').custom(
    async (name = '') => {
        const charFound = await characterService.findByName(name);
        if(charFound) {
            throw new ErrorResponse("Couldn't create the char", 400, "Name Already Exist");
        }
    }
);
const _imageRequired = check('image_url', 'Image is required').not().isEmpty();
const _imageType = check('image_url', "Image must be an URL").isURL()

const getGenreListValidations = [
    validResult,
];
const getGenreByIdValidations = [
    idRequired,
    idExist,
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
    idExist,
    validResult,
];
const deleteGenreValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    idExist,
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