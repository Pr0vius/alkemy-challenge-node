const { Router } = require("express");
const router = Router();
const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
} = require('../controllers/movie.controller');

router
    .route("/")
    .get(getAllMovies)
    .post(createMovie)
;
router
    .route("/:id")
    .get(getMovieById)
    .put(updateMovie)
    .delete(deleteMovie)
;
module.exports = router