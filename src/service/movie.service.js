const MovieRepository = require('../repositories/movie.repository');

const repository = new MovieRepository()

exports.findAll = async () => {
    return await repository.findAll();
};
exports.findById = async (id) => {
    return await repository.findById(id);
};
exports.findByName = async (name) => {
    return await repository.findByName(name);
};

exports.create = async (movie) => {
    return repository.create(movie);
};

exports.update = async (id, movie) => {
    return repository.update(id, movie);
};
exports.remove = async (id) => {
    return repository.delete(id);
};