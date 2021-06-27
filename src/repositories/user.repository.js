const bcrypt = require("bcrypt");
const ErrorResponse = require("../helpers/errorResponse");
const UserSchema = require("../models/user.schema");

class UserRepository {
    constructor() {}

    async findAllUsers() {
        return await UserSchema.findAll();
    }

    async findUserById(id) {
        const user = await UserSchema.findByPk(id);
        if (!user) {
            throw new ErrorResponse(
                `Can't find the user with id: ${id}`,
                404,
                "User doesn't exist"
            );
        }
        return user;
    }

    async findUserByEmail(email) {
        return await UserSchema.findOne({ where: { email } });
    }
    async findUserByUsername(username) {
        return await UserSchema.findOne({ where: { username } });
    }
    async createUser(user) {
        user.password = await bcrypt.hash(user.password, 10);

        return await UserSchema.create(user);
    }

    async updateUser(id, user) {
        return await UserSchema.update(user, { where: {id} });
    }

    async deleteUser(id) {
        return await UserSchema.destroy({where: {id}});
    }
}

module.exports = UserRepository;
