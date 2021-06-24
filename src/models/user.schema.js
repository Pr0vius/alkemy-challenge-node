const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../loaders/database/database");

class User extends Model {}

User.init(
    {
        //Model Attributes
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        role: {
            type: DataTypes.ENUM({ values: ["USER_ROLE", "ADMIN_ROLE"] }),
            defaultValue: "USER_ROLE",
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { is: /^[a-z ,.'-]+$/i },
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { is: /^[a-z ,.'-]+$/i },
        },
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
            validate: { is: /^[a-z0-9_-]{5,16}$/ },
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true,
            validate: { is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        },
        password: { type: DataTypes.STRING, allowNull: false },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        //Models Options
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: false,
    }
);

module.exports = User;
