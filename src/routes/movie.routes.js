const { Router } = require("express");
const router = Router();
const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
} = require('../controllers/movie.controller');
const {
    getMovieListValidations,
    postMovieValidations,
    getMovieByIdValidations,
    putMovieValidations,
    deleteMovieValidations
} = require('../middlewares/validations/movies/validations');

router
    .route("/")
    .get(getMovieListValidations, getAllMovies)
    .post(postMovieValidations, createMovie)
;
router
    .route("/:id")
    .get(getMovieByIdValidations, getMovieById)
    .put(putMovieValidations, updateMovie)
    .delete(deleteMovieValidations, deleteMovie)
;
module.exports = router