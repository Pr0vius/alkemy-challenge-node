const { Router } = require("express");
const router = Router();
const {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genre.controller');
const {
    getGenreListValidations,
    getGenreByIdValidations,
    postGenreValidations,
    putGenreValidations,
    deleteGenreValidations
} = require('../middlewares/validations/genre/validations');
router
    .route("/")
    .get(getGenreListValidations, getAllGenres)
    .post(postGenreValidations, createGenre)
;
router
    .route("/:id")
    .get(getGenreByIdValidations, getGenreById)
    .put(putGenreValidations, updateGenre)
    .delete(deleteGenreValidations, deleteGenre)
;
module.exports = router