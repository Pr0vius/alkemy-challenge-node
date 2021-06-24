const { Request, Response, NextFunction } = require("express");
const ErrorResponse = require("../helpers/errorResponse");
const Success = require("../helpers/successHandler");
const Genre = require("../service/genre.service");

/**
 * Get Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllGenres = async (req, res, next) => {
    try {
        const genreList = await Genre.findAll();

        res.json(new Success(genreList, 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't find the genre list", 400, err));
    }
};

/**
 * Post Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createGenre = async (req, res, next) => {
    const genre = ({} = req.body);
    try {
        res.json(new Success(await Genre.create(genre)));
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
exports.getGenreById = async (req, res, next) => {
    try {
        res.json(new Success(await Genre.findById(req.params.id)));
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
exports.updateGenre = async (req, res, next) => {
    const genre = ({} = req.body);
    try {
        res.json(new Success(await Genre.update(req.params.id, genre)));
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
exports.deleteGenre = async (req, res, next) => {
    try {
        res.json(new Success(await Genre.remove(req.params.id)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
    }
};
