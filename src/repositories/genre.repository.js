const GenreSchema = require("../models/genre.schema");
const Movie = require("../models/movies.schema");

class GenreRepository {
    constructor() {}

    async findAll({ name }) {
        let where = {};
        if (name) {
            where.name = name;
        }
        return await GenreSchema.findAll({ where });
    }

    async findById(id) {
        return await GenreSchema.findByPk(id, {
            include: [
                {
                    model: Movie,
                    as: "movies",
                    attributes: ["id", "title", "image_url"],
                },
            ],
        });
    }

    async findByName(name) {
        return await GenreSchema.findOne({ where: { name } });
    }

    async create(genre) {
        return await GenreSchema.create(genre);
    }

    async update(id, genre) {
        GenreSchema.update(genre, {
            where: { id: id },
        });
    }

    async delete(id) {
        return await GenreSchema.destroy({ where: { id } });
    }
}

module.exports = GenreRepository;
