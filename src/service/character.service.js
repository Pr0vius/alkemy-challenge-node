const CharacterRepository = require('../repositories/character.repository');

const repository = new CharacterRepository()

exports.findAll = async () => {
    return await repository.findAll();
};
exports.findById = async (id) => {
    return await repository.findById(id);
};

exports.create = async (character) => {
    return repository.create(character);
};

exports.update = async (id, character) => {
    return repository.update(id, character);
};
exports.remove = async (id) => {
    return repository.delete(id);
};