const express = require("express");

const loader = require("./loader");
const logger = require("./utils/logger");

logger.info(`Initiating the application setup`);
const app = express();

loader.loadExpress(app);
logger.info(`Completed Express setup`);

/* some other setup process can be placed here */

logger.info(`Completed the application setup`);

module.exports = app;
