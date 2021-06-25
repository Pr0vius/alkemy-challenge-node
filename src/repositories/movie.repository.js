const MovieSchema = require("../models/movies.schema");

class MovieRepository {
    constructor() {}

    async findAll({ title, releaseDate, order }) {
        let where = {};
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

        return await MovieSchema.findAll({
            where,
            attributes: ["title","image_url","releaseDate"],
            order: [["releaseDate", order]],
        });
    }

    async findById(id) {
        return await MovieSchema.findByPk(id);
    }

    async findByName(title) {
        return await MovieSchema.findOne({where:{title}})
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
