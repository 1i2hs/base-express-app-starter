const { Router } = require("express");
const { AppError, commonErrors } = require("../../error");

function create(sampleService) {
  if (sampleService === undefined || sampleService === null) {
    throw new AppError(
      commonErrors.objectCreationError,
      `An argument 'sampleService' must be given to create a sampleRouter object`,
      false
    );
  }
  const router = Router();

  router.get("/", async (req, res) => {
    const message = await sampleService.getMessageForUser("John");
    res.send({ msg: message });
  });

  return router;
}

module.exports = {
  create,
};
