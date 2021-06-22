class AppError extends Error {
  constructor(name, description, isOperational, httpCode) {
    super(description);
    Error.captureStackTrace(this);
    this.name = name;
    this.isOperational = isOperational;
    this.httpCode = httpCode;
  }
}

module.exports = AppError;
