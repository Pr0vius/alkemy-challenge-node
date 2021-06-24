const {Request, Response, NextFunction} = require("express");
const ErrorResponse = require("../helpers/errorResponse");
const Success = require("../helpers/successHandler");
const User = require("../service/user.service");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,

        }
        const userList = await User.findAll();

        res.json(new Success(userList, 200));
    } catch (err) {
        next(
            new ErrorResponse(`Can't find the user list`, 404, err)
        );
    }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.createUser = async (req, res, next) => {
    try {
        const user = ({
            firstname,
            lastname,
            username,
            birthdate,
            email,
            password,
        } = req.body);

        const newUser = await User.create(user);
        
        res.status(201).json({
            status: 200,
            data: newUser,
        });
    } catch (err) {
        next(new ErrorResponse(`Can't create user`, 400, err));
    }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne(req.params.id);
        
        res.status(200).json({
            status: 200,
            data: user,
        });
    } catch (err) {
        next(new ErrorResponse(`Can't find the user id`, 404, err));
    }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.updateUser = async (req, res, next) => {
    try {
        const user = ({
            firstname,
            lastname,
            username,
            birthdate,
            email,
            password,
        } = req.body);

        await User.update(req.params.id, user);

        res.status(201).json({
            status: 200,
            data: "User Updated",
        });
    } catch (err) {
        next(new ErrorResponse(`Can't update user`, 400, err));
    }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.deleteUser = async (req, res, next) => {
    try {
        await User.remove(req.params.id);
        res.status(200).json({
            status: 200,
            message: `User deleted`,
        });
    } catch (err) {
        next(new ErrorResponse(`Can't delete user`, 400, err));
    }
};
