const ErrorResponse = require("../../../helpers/errorResponse");
const userService = require("../../../service/user.service");
const { ROLES } = require("../../../constants/index");

const emailExistFunction = async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
        throw new ErrorResponse("Email Already Exist", 400);
    }
};

const roleValidFunction = async (role = "") => {
    if (!ROLES.include(role)) {
        throw new ErrorResponse("Invalid Role", 400);
    }
};

const idExistFunction = async (id = "") => {
    const userFound = await userService.findById(id);
    if (!userFound) {
        throw new AppError("The id doesn't exist", 400);
    }
};
module.exports = {
    emailExistFunction,
    roleValidFunction,
    idExistFunction,
};
