const { Router } = require('express');
const router = Router();

const { charMovie } = require('../controllers/associations.controller');
const {movieCharValidations} = require('../middlewares/validations/associations');

router
    .route("/movie/:movieId/character/:charId")
    .put(movieCharValidations,charMovie)
;

module.exports = router;