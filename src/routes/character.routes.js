const { Router } = require("express");
const router = Router();
const {
    getAllCharacters,
    createCharacter,
    getCharacterById,
    updateCharacter,
    deleteCharacter
} = require('../controllers/character.controller');
const {
    getCharListValidations,
    getCharByIdValidations,
    postCharValidations,
    putCharValidations,
    deleteCharValidations
} = require('../middlewares/validations/characters/validations');

router
    .route("/")
    .get(getCharListValidations, getAllCharacters)
    .post(postCharValidations, createCharacter)
;
router
    .route("/:id")
    .get(getCharByIdValidations, getCharacterById)
    .put(putCharValidations, updateCharacter)
    .delete(deleteCharValidations, deleteCharacter)
;
module.exports = router