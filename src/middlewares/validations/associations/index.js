const { check } = require("express-validator");
const { USER_ROLE } = require("../../../constants");
const { validateJWT, hasRole } = require("../auth/validations");
const { validResult } = require("../commons");
const {
    movieIdExistFunction,
    characterIdExistFunction,
} = require("../customFunctions/index");

const _idMovieExist = check("movieId").custom(movieIdExistFunction);
const _movieIdRequired = check("movieId", "Movie Id is Required")
    .not()
    .isEmpty()
;
const _idCharacterExist = check("charId").custom(characterIdExistFunction);
const _charIdRequired = check("charId", "Character Id is Required")
    .not()
    .isEmpty()
;
const movieCharValidations = [
    validateJWT,
    hasRole(USER_ROLE),
    _idMovieExist,
    _movieIdRequired,
    _idCharacterExist,
    _charIdRequired,
    validResult,
];

module.exports = {
    movieCharValidations,
};
