const logger = require("./logger");

function handleError(error, responseStream) {
  logger.error(error);
  if (responseStream !== undefined) {
    responseStream.status(error.status || 500);
    responseStream.json({
      error: `${error.message}`,
    });
  }
}

function isTrustedError(error) {
  return error.isOperational;
}

module.exports = {
  handleError,
  isTrustedError,
};
/*  */
