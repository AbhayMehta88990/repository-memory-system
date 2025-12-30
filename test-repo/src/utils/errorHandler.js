/**
 * Custom Error Handler Class
 */
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle different types of errors
 * @param {Error} err - Error object
 * @param {Response} res - Express response object
 */
const handleError = (err, res) => {
  const { statusCode = 500, message } = err;
  
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Handle MongoDB duplicate key error
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new ErrorHandler(`${field} already exists`, 400);
};

/**
 * Handle MongoDB validation error
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  return new ErrorHandler(`Invalid input: ${errors.join(', ')}`, 400);
};

/**
 * Handle JWT errors
 */
const handleJWTError = () => {
  return new ErrorHandler('Invalid token. Please log in again', 401);
};

/**
 * Handle JWT expiration error
 */
const handleJWTExpiredError = () => {
  return new ErrorHandler('Token expired. Please log in again', 401);
};

module.exports = {
  ErrorHandler,
  handleError,
  handleDuplicateKeyError,
  handleValidationError,
  handleJWTError,
  handleJWTExpiredError
};
