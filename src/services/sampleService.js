const { AppError, commonErrors } = require("../error");

function create(sampleModule) {
  if (sampleModule === undefined || sampleModule === null) {
    throw new AppError(
      commonErrors.objectCreationError,
      `an argument 'sampleModule' must be given to create a sampleService object`,
      false
    );
  }

  return {
    getMessageForUser: async function (username) {
      const message = await sampleModule.getSampleMessage();
      return `Hello ${username}. ${message}`;
    },
  };
}

module.exports = {
  create,
};
