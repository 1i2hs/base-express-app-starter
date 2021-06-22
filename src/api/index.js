const { Router } = require("express");

const { sampleRouter } = require("./routers");

// guaranteed to get dependencies
function create({ sampleService }) {
  const app = Router();

  app.use("/sample", sampleRouter.create(sampleService));

  return app;
}

module.exports = {
  create,
};
