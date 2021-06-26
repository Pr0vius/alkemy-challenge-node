const { check } = require("express-validator");
const { USER_ROLE, ADMIN_ROLE } = require("../../../constants");
const { validateJWT, hasRole } = require("../auth/validations");
const { validResult, roleValid } = require("../commons");
const {
    movieIdExistFunction,
    characterIdExistFunction,
    genreIdExistFunction,
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
const _idGenreExist = check("genreId").custom(genreIdExistFunction);
const _idGenreRequired = check("genreId", "Genre Id is Required")
    .not()
    .isEmpty()
;

const movieCharValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    _idMovieExist,
    _movieIdRequired,
    _idCharacterExist,
    _charIdRequired,
    validResult,
];
const movieGenreValidations = [
    validateJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    roleValid,
    _idMovieExist,
    _movieIdRequired,
    _idGenreExist,
    _idGenreRequired,
    validResult,
]
module.exports = {
    movieCharValidations,
    movieGenreValidations
};
