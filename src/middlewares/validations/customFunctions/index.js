const ErrorResponse = require("../../../helpers/errorResponse");
const { ROLES } = require("../../../constants/index");
const userService = require("../../../service/user.service");
const characterService = require('../../../service/character.service');
const genreService = require('../../../service/genre.service');
const movieService = require('../../../service/movie.service');

/*
    Users
*/
const emailExistFunction = async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
        throw new ErrorResponse("Email Already Exist", 400);
    }
};

const usernameUniqueFunction = async (username = "") => {
    const userFound = await userService.findByUsername(username)
    if (userFound) {
        throw new ErrorResponse("Username Already Exist", 400);
    }
}

const roleValidFunction = async (role = "") => {
    if (!ROLES.includes(role)) {
        throw new ErrorResponse("Invalid Role", 400);
    }
};

/*
    Characters
*/
const characterIdExistFunction = async (id = "") => {
    const charFound = await characterService.findById(id);
    if (!charFound) {
        throw new ErrorResponse("The Character id doesn't exist", 400);
    }
};
const charNameUniqueFunction = async (name = '') => {
    const charFound = await characterService.findByName(name);
    if(charFound) {
        throw new ErrorResponse( "Character Already Exist", 400);
    }
}

/*
    Movies
*/
const movieIdExistFunction = async (id = "") => {
    const movieFound = await movieService.findById(id);
    if (!movieFound) {
        throw new ErrorResponse("The Movie id doesn't exist", 400);
    }
}

const movieNameUniqueFunction = async (title = "") => {
    const movieFound = await movieService.findByName(title);
    if (movieFound) {
        throw new ErrorResponse("Movie Already Exist", 400);
    }
}
/*
    Genres
*/
const genreIdExistFunction = async (id = "") => {
    const genreFound = await genreService.findById(id);
    if (!genreFound) {
        throw new ErrorResponse("The Genre id doesn't exist", 400);
    }
}

const genreUniqueFunction = async (name = '') => {
    const genreFound = await genreService.findByName(name);
    if(genreFound) {
        throw new ErrorResponse("Genre Already Exist", 400);
    }
}
module.exports = {
    emailExistFunction,
    usernameUniqueFunction,
    roleValidFunction,
    // Characters
    characterIdExistFunction,
    charNameUniqueFunction,
    // Movies
    movieIdExistFunction,
    movieNameUniqueFunction,
    // Genres
    genreIdExistFunction,
    genreUniqueFunction
};
