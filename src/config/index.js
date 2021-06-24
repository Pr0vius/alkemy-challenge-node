const dotenv = require("dotenv");

const envFound = dotenv.config();

if (!envFound) {
    throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.LOGGING === 'true') {
    process.env.LOGGING = true
} else{
    process.env.LOGGING = false
}

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: "/api",
    },
    log: {
        level: process.env.LOG_LEVEL || "silly",
    },
    swagger:{
        path: '/api/documentation'
    },
    database:{
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || null,
        db_name: process.env.DB_NAME || "disney_chars_api",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false
    },
    webtoken:{
        secret: process.env.JWT_SECRET || "secret",
        expires: process.env.JWT_EXPIRES || "1d"
    }
};
