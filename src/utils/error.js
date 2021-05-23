class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const routeNotFound = () => {
  throw new ErrorHandler(404, 'fail', 'Route not found');
};

const handleError = (err, res, next) => {
  const { statusCode, message } = err;

  if (statusCode && message) {
    res.status(statusCode).json({
      message,
    });
  } else {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
  next();
};

module.exports = {
  ErrorHandler,
  routeNotFound,
  handleError,
};
