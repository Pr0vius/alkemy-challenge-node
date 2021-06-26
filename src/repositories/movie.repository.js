const Characters = require("../models/characters.schema");
const Genre = require("../models/genre.schema");
const MovieSchema = require("../models/movies.schema");

class MovieRepository {
    constructor() {}

    async findAll({ title, releaseDate, order, genre }) {
        let where = {};
        let through = {};
        let required = false;

        if (title) {
            where.title = title;
        }
        if (releaseDate) {
            where.releaseDate = releaseDate;
        }
        if (order === "ASC") {
            order = "ASC";
        } else {
            order = "DESC";
        }
        if (genre) {
            through = { where: { genreId: genre } };
            required = true;
        }
        return await MovieSchema.findAll({
            where,
            attributes: ["id", "title", "image_url", "releaseDate"],
            order: [["releaseDate", order]],
            include: [
                {
                    model: Genre,
                    as: "genre",
                    through,
                    attributes: ["name"],
                    required,
                },
            ],
        });
    }

    async findById(id) {
        return await MovieSchema.findByPk(id, {
            include: [
                {
                    model: Characters,
                    as: "characters",
                    attributes: ["id", "name", "image_url"],
                },
                {
                    model: Genre,
                    as: "genre",
                    attributes: ["id", "name"],
                },
            ],
        });
    }

    async findByName(title) {
        return await MovieSchema.findOne({ where: { title } });
    }
    async create(movie) {
        return await MovieSchema.create(movie);
    }

    async update(id, movie) {
        MovieSchema.update(movie, {
            where: { id: id },
        });
    }

    async delete(id) {
        return await MovieSchema.destroy({ where: { id } });
    }
}

module.exports = MovieRepository;
