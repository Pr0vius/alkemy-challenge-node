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
        res.json(Success(await Movie.findAll()));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
    }
};

/**
 * Post Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createMovie = async (req, res, next) => {
    const movie = ({} = req.body);
    try {
        res.json(Success(await Movie.create(movie)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
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
        res.json(Success(await Movie.findById(req.params.id)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
    }
};

/**
 * Put Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateMovie = async (req, res, next) => {
    const movie = ({} = req.body);
    try {
        res.json(Success(await Movie.update(req.params.id, movie)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
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
        res.json(Success(await Movie.remove(req.params.id)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
    }
};
