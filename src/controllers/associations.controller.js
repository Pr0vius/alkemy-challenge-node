const {Request, Response, NextFunction} = require('express');
const ErrorResponse = require('../helpers/errorResponse');
const Success = require('../helpers/successHandler');
const { movieCharsAssociate } = require('../service/association.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
exports.charMovie = async (req,res,next) =>{
    try {
        await movieCharsAssociate(req.params.movieId, req.params.charId)
        res.status(201).json(new Success("Assiociation created", 201))
    } catch (err) {
        next(new ErrorResponse("Couldn't create the association"))
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
exports.genreMovie = async (req,res,next) =>{
    try {
        await movieGenresAssociate(req.params.movieId, req.params.genreId)
        res.status(201).json(new Success("Assiociation created", 201))
    } catch (err) {
        next(new ErrorResponse("Couldn't create the association"))
    }
}