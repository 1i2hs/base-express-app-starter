const { AppError, commonErrors } = require("../error");

function create(sampleDataAccess) {
  if (sampleDataAccess === undefined || sampleDataAccess === null) {
    throw new AppError(
      commonErrors.objectCreationError,
      `an argument 'sampleDataAccessModule' must be given to create a sampleModule object`,
      false
    );
  }
  return {
    getSampleMessage: async function () {
      const message = await sampleDataAccess.getMessage();
      return message;
    },
  };
}

module.exports = {
  create,
};
