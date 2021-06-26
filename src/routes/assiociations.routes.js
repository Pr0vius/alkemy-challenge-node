const { Router } = require('express');
const router = Router();

const { charMovie,genreMovie } = require('../controllers/associations.controller');
const {movieCharValidations, movieGenreValidations} = require('../middlewares/validations/associations');

router
    .route("/movie/:movieId/character/:charId")
    .put(movieCharValidations,charMovie)
;
router
    .route("/movie/:movieId/genre/:genreId")
    .put(movieGenreValidations, genreMovie)
;
module.exports = router;