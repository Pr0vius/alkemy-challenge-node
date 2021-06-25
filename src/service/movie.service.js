const MovieRepository = require('../repositories/movie.repository');

const repository = new MovieRepository()

exports.findAll = async (filter) => {
    return await repository.findAll(filter);
};
exports.findById = async (id) => {
    return await repository.findById(id);
};
exports.findByName = async (title) => {
    return await repository.findByName(title);
};

exports.create = async (movie) => {
    movie.releaseDate = new Date(movie.releaseDate);
    return repository.create(movie);
};

exports.update = async (id, movie) => {
    return repository.update(id, movie);
};
exports.remove = async (id) => {
    return repository.delete(id);
};