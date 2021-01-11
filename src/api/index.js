const { Router } = require("express");

const routers = require("./routers");

// guaranteed to get dependencies
function createAPIRouter() {
  const app = Router();

  // initialize app with custom middlewares and routers here
  app.use("/sample", routers.sampleRouter());

  return app;
}

module.exports = {
  createAPIRouter,
};
