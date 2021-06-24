const { Router } = require("express");
const router = Router();
const {
    getAllCharacters,
    createCharacter,
    getCharacterById,
    updateCharacter,
    deleteCharacter
} = require('../controllers/character.controller');

router
    .route("/")
    .get(getAllCharacters)
    .post(createCharacter)
;
router
    .route("/:id")
    .get(getCharacterById)
    .put(updateCharacter)
    .delete(deleteCharacter)
;
module.exports = router