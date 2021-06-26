const MovieRepository = require('../repositories/movie.repository');
const CharacterRepository = require('../repositories/character.repository');
const GenreRepository = require('../repositories/genre.repository');

const movieRepo = new MovieRepository();
const charRepo = new CharacterRepository();
const genreRepo = new GenreRepository();

exports.movieCharsAssociate = async (idMovie, idChar) => {
    const movieFound = await movieRepo.findById(idMovie);
    const charFound = await charRepo.findById(idChar)

    await movieFound.addCharacter(charFound)
}

exports.movieGenreAssociate = async (idMovie, idGenre) => {
    const movieFound = await movieRepo.findById(idMovie);
    const genreFound = await genreRepo.findById(idGenre);

    await movieFound.addGenre(genreFound);
}