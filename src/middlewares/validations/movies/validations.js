const { check } = require("express-validator");
const { validateJWT, hasRole } = require("../auth/validations");
const movieService = require("../../../service/movie.service");
const { ADMIN_ROLE } = require("../../../constants/index");
const { idRequired, idExist, validResult, roleValid } = require("../commons");
const ErrorResponse = require("../../../helpers/errorResponse");

const _nameRequired = check("name", "Name is required").not().isEmpty();
const _nameIsUnique = check("name").custom(async (name = "") => {
    const movieFound = await movieService.findByName(name);
    if (movieFound) {
        throw new ErrorResponse("Movie Already Exist", 400);
    }
});
const _imageRequired = check("image_url", "Image is required").not().isEmpty();
const _imageType = check("image_url", "Image must be an URL").isURL();
const _ratingRequired = check("rating", "Rating is Required").not().isEmpty();
const _ratingType = check(
    "rating",
    "Rating Must a number between 1 and 5"
).isNumeric().isLength({ min: 0, max: 5 });


const getMovieListValidations = [validResult];
const getMovieByIdValidations = [idRequired, idExist, validResult];
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
    idExist,
    validResult
];
const deleteMovieValidations = [
    validateJWT,
    hasRole(ADMIN_ROLE),
    idRequired,
    idExist,
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
