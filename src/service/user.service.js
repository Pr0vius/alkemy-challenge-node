const UserRepository = require("../repositories/user.repository");
const repository = new UserRepository();

exports.findAll = async () => {
    return await repository.findAllUsers();
};
exports.findById = async (id) => {
    return await repository.findUserById(id);
};
exports.findByEmail = async (email) => {
    return await repository.findUserByEmail(email);
};
exports.findByUsername = async (username) => {
    return await repository.findUserByUsername(username);
}
exports.create = async (user) => {
    return repository.createUser(user);
};
exports.update = async (id, user) => {
    return repository.updateUser(id, user);
};
exports.remove = async (id) => {
    return repository.deleteUser(id);
};
