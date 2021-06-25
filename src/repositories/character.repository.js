const CharacterSchema = require("../models/characters.schema");

class CharacterRepository {
    constructor() {}

    async findAll() {
        return await CharacterSchema.findAll();
    }

    async findById(id) {
        return await CharacterSchema.findByPk(id);
    }

    async findByName(name) {
        return await CharacterSchema.findOne({ where: { name } });
    }
    async create(character) {
        return await CharacterSchema.create(character);
    }

    async update(id, character) {
        CharacterSchema.update(character, {
            where: { id: id },
        });
    }

    async delete(id) {
        return await CharacterSchema.destroy({ where: { id } });
    }
}

module.exports = CharacterRepository;
