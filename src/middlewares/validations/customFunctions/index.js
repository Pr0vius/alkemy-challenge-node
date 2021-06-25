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
    if (!ROLES.includes(role)) {
        throw new ErrorResponse("Invalid Role", 400);
    }
};

module.exports = {
    emailExistFunction,
    roleValidFunction,
};
