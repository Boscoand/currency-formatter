class ErrorHandler extends Error {
  constructor(statusCode, status, message) {
    super();
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

const routeNotFound = () => {
  throw new ErrorHandler(404, 'fail', 'Route not found');
};

module.exports = {
  routeNotFound,
};
