const GenreSchema = require('../models/genre.schema');

class GenreRepository{

    constructor(){}

    async findAll() {
        return await GenreSchema.findAll();
    }

    async findById(id) {
        return await GenreSchema.findByPk(id)
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