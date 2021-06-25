const GenreRepository = require('../repositories/genre.repository');

const repository = new GenreRepository()

exports.findAll = async () => {
    return await repository.findAll();
};
exports.findById = async (id) => {
    return await repository.findById(id);
};
exports.findByName = async (name) => {
    return await repository.findByName(name);
};
exports.create = async (genre) => {
    return repository.create(genre);
};

exports.update = async (id, genre) => {
    return repository.update(id, genre);
};
exports.remove = async (id) => {
    return repository.delete(id);
};