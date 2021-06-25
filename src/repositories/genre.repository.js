const GenreSchema = require('../models/genre.schema');

class GenreRepository{

    constructor(){}

    async findAll(filter) {
        let where = {}
        if (filter.name) {
            where.name = filter.name
        }
        return await GenreSchema.findAll(where);
    }

    async findById(id) {
        return await GenreSchema.findByPk(id)
    }

    async findByName(name) {
        return await GenreSchema.findOne({where: { name }})
    }

    async create(genre){
        return await GenreSchema.create(genre);
    }

    async update(id, genre){
        GenreSchema.update(genre, {
            where: { id: id },
        });
    }

    async delete(id){
        return await GenreSchema.destroy({where: {id}});
    }
}

module.exports = GenreRepository