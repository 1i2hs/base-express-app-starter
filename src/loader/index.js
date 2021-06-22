const logger = require("../utils/logger");

const { sampleDataAccess } = require("../data-access");
const { sampleModule } = require("../core");
const { sampleService } = require("../services");
const api = require("../api");

const initializeExpress = require("./initializeExpress");

module.exports = (app) => {
  // foundational components
  logger.info(`[1] Setting up foundational components`);

  // data-access layer
  logger.info(`[2] Setting up data-access components`);
  const sampleDataAccessObj = sampleDataAccess.create();
  logger.info(`- Completed creating sampleDataAccess object`);

  // core layer
  logger.info(`[3] Setting up core components`);
  const sampleModuleObj = sampleModule.create(sampleDataAccessObj);

  // service layer
  logger.info(`[4] Setting up service components`);
  const sampleServiceObj = sampleService.create(sampleModuleObj);

  // router layer
  logger.info(`[5] Setting up api components`);
  const apiObj = api.create({ sampleService: sampleServiceObj });

  logger.info(`[6] Setting up express application`);
  initializeExpress(app, apiObj);
  logger.info(`- Completed Express setup`);
};
