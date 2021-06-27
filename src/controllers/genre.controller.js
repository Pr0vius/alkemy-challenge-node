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
        const genreList = await Genre.findAll(req.query);

        res.status(200).json(new Success(genreList, 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't find the genre list", 404, err));
    }
};

/**
 * Post Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createGenre = async (req, res, next) => {
    const genre = ({name, image_url} = req.body);
    try {
        const newGenre = await Genre.create(genre);
        res.status(201).json(new Success(newGenre,201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Create the Genre", 401, err));
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
        const genre = await Genre.findById(req.params.id)
        res.status(200).json(new Success(genre, 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Get the Genre", 404, err));
    }
};

/**
 * Put Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateGenre = async (req, res, next) => {
    const genre = ({name, image_url} = req.body);
    try {
        await Genre.update(req.params.id, genre);

        res.status(201).json(new Success("Genre Updated", 201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Update the Genre", 401, err));
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
        await Genre.remove(req.params.id)
        res.status(200).json(new Success('Genre Deleted',200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Delete the Genre", 400, err));
    }
};
