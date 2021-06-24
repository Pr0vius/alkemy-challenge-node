const { Router } = require("express");
const router = Router();
const {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genre.controller');

router
    .route("/")
    .get(getAllGenres)
    .post(createGenre)
;
router
    .route("/:id")
    .get(getGenreById)
    .put(updateGenre)
    .delete(deleteGenre)
;
module.exports = router