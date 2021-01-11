const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("Couldn't find .env file.");
}

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
  jwtSecret: process.env.JWT_SECRET,

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
