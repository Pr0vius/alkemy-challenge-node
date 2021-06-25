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
            throw new ErrorResponse( "Character Already Exist", 400);
        }
    }
);
const _imageRequired = check('image_url', 'Image is required').not().isEmpty();
const _imageType = check('image_url', "Image must be an URL").isURL()
const _ageIsNumeric = check('age', "Age must be a number").optional().isNumeric();
const _weigthIsNumeric = check('weigth', "Must be a number").optional().isNumeric();
const _historyRequired = check('history', "History is required").not().isEmpty();

const getCharListValidations = [
    validResult,
]
const getCharByIdValidations = [
    idRequired,
    idExist,
    validResult,
];

const postCharValidations = [
    validateJWT,
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
    idRequired,
    idExist,
    validResult,
];
const deleteCharValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    idExist,
    roleValid,
    validResult,
];

module.exports = {
    getCharListValidations,
    getCharByIdValidations,
    postCharValidations,
    putCharValidations,
    deleteCharValidations
};
