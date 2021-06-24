const MovieSchema = require('../models/movies.schema');

class MovieRepository{

    constructor(){}

    async findAll() {
        return await MovieSchema.findAll()
    }

    async findById(id) {
        return await MovieSchema.findByPk(id)
    }

    async create(movie){
        return await MovieSchema.create(movie);
    }

    async update(id, movie){
        MovieSchema.update(movie, {
            where: { id: id },
        });
    }

    async delete(id){
        return await MovieSchema.destroy({where: {id}});
    }
}

module.exports = MovieRepository