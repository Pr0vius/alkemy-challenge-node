const CharacterRepository = require('../repositories/character.repository');

const repository = new CharacterRepository()

exports.findAll = async () => {
    return await repository.findAll();
};
exports.findById = async (id) => {
    return await repository.findCharacterById(id);
};

exports.create = async (character) => {
    return repository.createCharacter(character);
};

exports.update = async (id, character) => {
    return repository.updateCharacter(id, character);
};
exports.remove = async (id) => {
    return repository.deleteCharacter(id);
};