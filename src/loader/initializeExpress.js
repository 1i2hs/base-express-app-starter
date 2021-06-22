const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const config = require("../config");
const errorHandler = require("../utils/errorHandler");
const { AppError, commonErrors } = require("../error");

function initializeExpress(app, api) {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  // HTTP request logger middleware
  app.use(
    process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev")
  );

  // Load API routes
  app.use(config.api.prefix, api);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error = new AppError(
      commonErrors.resourceNotFoundError,
      "Not Found",
      true,
      400
    );
    error["status"] = 404;
    next(error);
  });

  /// error handlers
  app.use((error, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (error.name === "UnauthorizedError") {
      errorHandler.handleError(error, res);
      return;
    }
    return next(error);
  });

  app.use((error, req, res, next) => {
    errorHandler.handleError(error, res);
  });

  return app;
}

module.exports = initializeExpress;
