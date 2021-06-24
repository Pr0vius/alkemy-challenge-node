const { Sequelize } = require("sequelize");
const { database } = require("../../config/index");

const sequelize = new Sequelize(
    database.db_name,
    database.username,
    database.password,
    {
        host: database.host,
        port: database.port,
        dialect: database.dialect,
        logging: database.logging
    }
);

module.exports = {
    sequelize,
};
