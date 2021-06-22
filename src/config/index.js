const dotenv = require("dotenv");
const { AppError, commonErrors } = require("../error");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new AppError(
    commonErrors.configError,
    "Couldn't find .env file",
    false
  );
}

// if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null) {
//   throw new AppError(
//     commonErrors.config,
//     `JWT secret key is not provided. the key must be provided through an enviroment variable: JWT_SECRET`,
//     false
//   );
// }

module.exports = {
  /**
   * Your application name
   */
  applicationName: process.env.APPLICATION_NAME || "app",
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * Your secret sauce
   */
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION || 24 * 60, // in seconds (default 24 hours)
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 3 * 24 * 60, // in seconds (default 3 days)
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};
