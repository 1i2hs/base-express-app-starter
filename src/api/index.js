const { Router } = require('express');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();

  // initialize app with custom middlewares and routers here

  return app;
};
