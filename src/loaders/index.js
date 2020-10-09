const expressLoader = require('./express');
const { getLogger } = require('./logger');
const logger = getLogger('loaders');
/**
 * configures all required middlewares for express application
 * @param {import('express').Application} app
 */
module.exports = async (app) => {
  await expressLoader(app);
  logger.info('Express application loaded');
};
