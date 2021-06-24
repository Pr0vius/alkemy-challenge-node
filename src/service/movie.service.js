const MovieRepository = require('../repositories/movie.repository');

const repository = new MovieRepository()

exports.findAll = async () => {
    return await repository.findAllMovies();
};
exports.findById = async (id) => {
    return await repository.findMovieById(id);
};
exports.create = async (movie) => {
    return repository.createMovie(movie);
};

exports.update = async (id, movie) => {
    return repository.updateMovie(id, movie);
};
exports.remove = async (id) => {
    return repository.deleteMovie(id);
};