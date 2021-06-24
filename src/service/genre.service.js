const GenreRepository = require('../repositories/genre.repository');

const repository = new GenreRepository()

exports.findAll = async () => {
    return await repository.findAllGenres();
};
exports.findById = async (id) => {
    return await repository.findGenreById(id);
};
exports.create = async (genre) => {
    return repository.createGenre(genre);
};

exports.update = async (id, genre) => {
    return repository.updateGenre(id, genre);
};
exports.remove = async (id) => {
    return repository.deleteGenre(id);
};