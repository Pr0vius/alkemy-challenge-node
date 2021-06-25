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
        res.status(200).json(new Success(await Character.findAll(), 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Find the Character List", 404, err));
    }
};

/**
 * Post Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createCharacter = async (req, res, next) => {
    const char = ({name, image_url, age, weight, history} = req.body);
    try {
        const newUsr = await Character.create(char)
        res.status(201).json(new Success(newUsr, 201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Create the Character", 401, err));
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
        const character = await Character.findById(req.params.id)
        res.status(200).json(new Success(character,200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Find the Character", 404, err));
    }
};

/**
 * Put Method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateCharacter = async (req, res, next) => {
    const char = ({name, image_url, age, weight, history} = req.body);
    try {
        await Character.update(req.params.id, char)
        res.status(201).json(new Success("Character Updated", 201));
    } catch (err) {
        next(new ErrorResponse("Couldn't Update the Character", 401, err));
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
        await Character.remove(req.params.id)
        res.status(200).json(new Success("Character Deleted", 200));
    } catch (err) {
        next(new ErrorResponse("Couldn't Delete the Character", 400, err));
    }
};
