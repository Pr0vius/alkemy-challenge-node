const { Op } = require("sequelize");
const CharacterSchema = require("../models/characters.schema");
class CharacterRepository {
    constructor() {}

    async findAll({ name, age, weight, movieId }) {
        let where = {};
        if (name) {
            where.name = { [Op.like]: `%${name}%` };
        }
        if (age) {
            where.age = { [Op.like]: `%${age}%` };
        }
        if (weight) {
            where.weight = { [Op.like]: `%${weight}%` };
        }
        return await CharacterSchema.findAll({
            where,
            attributes: ["name", "image_url"],
        });
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
