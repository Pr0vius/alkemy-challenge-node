const { check } = require("express-validator");
const { validateJWT, hasRole } = require("../auth/validations");
const { ADMIN_ROLE } = require("../../../constants/index");
const { idRequired, validResult, roleValid } = require("../commons");
const { movieIdExistFunction, movieNameUniqueFunction } = require('../customFunctions/index'); 

const _nameRequired = check("name", "Name is required").not().isEmpty();
const _nameIsUnique = check("name").custom(movieNameUniqueFunction);
const _imageRequired = check("image_url", "Image is required")
    .not()
    .isEmpty()
;
const _imageType = check("image_url", "Image must be an URL").isURL();
const _ratingRequired = check("rating", "Rating is Required")
    .not()
    .isEmpty()
;
const _ratingType = check("rating", "Rating Must a number between 1 and 5")
    .isNumeric()
    .isLength({ min: 0, max: 5 })
;
const _idExist = check("id").custom(movieIdExistFunction);


const getMovieListValidations = [validResult];
const getMovieByIdValidations = [idRequired, _idExist, validResult];

const postMovieValidations = [
    validateJWT,
    _nameRequired,
    _nameIsUnique,
    _imageRequired,
    _imageType,
    _ratingRequired,
    _ratingType,
    validResult,
];
const putMovieValidations = [
    validateJWT,
    idRequired,
    _idExist,
    validResult
];
const deleteMovieValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    _idExist,
    roleValid,
    validResult,
];

module.exports = {
    getMovieListValidations,
    getMovieByIdValidations,
    postMovieValidations,
    putMovieValidations,
    deleteMovieValidations,
};
