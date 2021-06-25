const MovieRepository = require('../repositories/movie.repository');
const CharacterRepository = require('../repositories/character.repository');
const movieRepo = new MovieRepository()
const charRepo = new CharacterRepository

exports.movieCharsAssociate = async (idMovie, idChar) => {
    const movieFound = await movieRepo.findById(idMovie);
    const charFound = await charRepo.findById(idChar)

    await movieFound.addCharacter(charFound)
}