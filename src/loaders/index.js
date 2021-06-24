require('colors');
const ExpressServer = require("./server/expressServer");
const config = require("../config/index");
const logger = require('./logger/winston.logger');
const { sequelize } = require('./database/database');

module.exports = async () => {
	const server = new ExpressServer();
	logger.info(`Express Server Loaded`);

	server.start();
	logger.info(`#####################################\n	Server is listening on PORT: ${config.port}\n      #####################################`.cyan)
	;
	try {
		await sequelize.authenticate();
		logger.info('Database connection has been established successfully.'.green);
		// sequelize.sync({ alter: true })
		sequelize.sync({ force: false})
	} catch (err) {
		logger.error(`Unable to connect to the database: ${err}`.red);
	}

};
