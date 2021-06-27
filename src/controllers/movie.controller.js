const { Request, Response, NextFunction } = require("express");
const ErrorResponse = require("../helpers/errorResponse");
const Success = require("../helpers/successHandler");
const Movie = require("../service/movie.service");

/**
 * Get Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllMovies = async (req, res, next) => {
    try {
        const movieList = await Movie.findAll(req.query);
        res.status(200).json(new Success(movieList, 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Find the Movie List", 404, err));
    }
};

/**
 * Post Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createMovie = async (req, res, next) => {
    const movie = ({ image_url, title, releaseDate, rating } = req.body);
    try {
        const newMovie = await Movie.create(movie);
        res.status(201).json(new Success(newMovie, 201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Create the Movie ", 401, err));
    }
};

/**
 * Get Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(new Success(movie, 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Find the Movie", 404, err));
    }
};

/**
 * Put Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateMovie = async (req, res, next) => {
    const movie = ({ image_url, name, releaseDate, rating } = req.body);
    try {
        await Movie.update(req.params.id, movie);
        res.status(201).json(new Success("Movie Updated", 201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Update the Movie", 401, err));
    }
};

/**
 * Delete Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.deleteMovie = async (req, res, next) => {
    try {
        await Movie.remove(req.params.id);
        res.status(200).json(new Success("Movie Deleted", 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Delete the Movie", 400, err));
    }
};
