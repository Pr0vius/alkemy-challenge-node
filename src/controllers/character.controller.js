const { Request, Response, NextFunction } = require("express");
const ErrorResponse = require("../helpers/errorResponse");
const Success = require("../helpers/successHandler");
const Character = require("../service/character.service");

/**
 * Get Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllCharacters = async (req, res, next) => {
    try {
        res.json(Success(await Character.findAll()));
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
exports.createCharacter = async (req, res, next) => {
    const char = ({} = req.body);
    try {
        res.json(Success(await Character.create(char)));
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
exports.getCharacterById = async (req, res, next) => {
    try {
        res.json(Success(await Character.findById(req.params.id)));
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
exports.updateCharacter = async (req, res, next) => {
    const char = ({} = req.body);
    try {
        res.json(Success(await Character.update(req.params.id, char)));
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
exports.deleteCharacter = async (req, res, next) => {
    try {
        res.json(Success(await Character.remove(req.params.id)));
    } catch (err) {
        next(new ErrorResponse("ErrorMessage", 400, err));
    }
};
