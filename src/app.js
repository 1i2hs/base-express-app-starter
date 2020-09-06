const express = require('express');

const Logger = require('./loaders/logger');
const config = require('./config');

async function startServer() {
  const app = express();
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders')(app);

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
