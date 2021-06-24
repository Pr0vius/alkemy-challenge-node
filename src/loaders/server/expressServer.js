const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const config = require("../../config/index");
const logger = require("../logger/winston.logger");


class ExpressServer {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePath = config.api.prefix;

        this._middlewares();
        this._swagger();
        this._routes();
        this._errorhandler();
    }

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan("tiny"));
        this.app.use(cors());
    }

    _routes() {
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.app.use(
            `${this.basePath}/users`,
            require("../../routes/user.routes")
        );

        this.app.use(
            `${this.basePath}/characters`,
            require("../../routes/character.routes")
        );

        this.app.use(
            `${this.basePath}/auth`,
            require("../../routes/auth.routes")
        );

        this.app.use(require("../../routes/404.routes"));
    }

    _errorhandler() {
        this.app.use(require("../../middlewares/errorHandler"));
    }

    _swagger() {
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require("../swagger/swagger.json"))
        );
    }

    async start() {
        this.app.listen(this.port, (err) => {
            if (err) {
                logger.error(err);
                process.env(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;
