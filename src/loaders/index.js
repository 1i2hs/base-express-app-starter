const expressLoader = require('./express');
const Logger = require('./logger');

/**
 * configures all required middlewares for express application
 * @param {import('express').Application} app
 */
module.exports = async (app) => {
  await expressLoader(app);
  Logger.info('Express application loaded');
};
