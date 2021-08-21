const express = require("express");

const loader = require("./loader");
const logger = require("./utils/logger");

logger.info(`[0] Initiating the application setup`);

const app = express();
loader(app);

logger.info(`🟢 Completed the application setup`);

async function shutdown() {
  /**
   * tasks to be done before graceful shutdown must be placed here
   * e.g. closing DB connections, disconnect subscriptions, etc.
   **/
}

app.shutdown = shutdown;

module.exports = app;
