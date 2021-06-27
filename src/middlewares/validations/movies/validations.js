const { check } = require("express-validator");
const { validateJWT, hasRole } = require("../auth/validations");
const { USER_ROLE, ADMIN_ROLE } = require("../../../constants/index");
const { idRequired, validResult, roleValid } = require("../commons");
const { movieIdExistFunction, movieNameUniqueFunction } = require('../customFunctions/index'); 

const _titleRequired = check("title", "Title is required").not().isEmpty();
const _titleIsUnique = check("title").custom(movieNameUniqueFunction);
const _imageRequired = check("image_url", "Image is required")
    .not()
    .isEmpty()
;
const _imageType = check("image_url", "Image must be an URL").isURL();
const _releaseDateRequired = check("releaseDate", "Release Date is required").not().isEmpty();
const _ratingRequired = check("rating", "Rating is Required")
    .not()
    .isEmpty()
;
const _ratingType = check("rating", "Rating Must a number between 1 and 5")
    .isNumeric()
    .isLength({ min: 0, max: 5 })
;
const _idExist = check("id").custom(movieIdExistFunction);


const getMovieListValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    validResult
];
const getMovieByIdValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult
];

const postMovieValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    _titleRequired,
    _titleIsUnique,
    _imageRequired,
    _imageType,
    _releaseDateRequired,
    _ratingRequired,
    _ratingType,
    validResult,
];
const putMovieValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    idRequired,
    _idExist,
    validResult
];
const deleteMovieValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
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
