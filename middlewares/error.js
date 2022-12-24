const errorMiddleware = (error, req, res, next) => {
  let statusCode;
  let message;

  switch (error.name) {
    case 'SequelizeValidationError':
      statusCode = 400;
      message = error.errors.map((e) => e.message);
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      error.errors.map((e) => {
        if (e.message == 'Email is already exist') {
          message = 'Email is alredy exist, please replace your email';
        } else {
          message = error.errors.map((e) => e.message);
        }
      });
      break;
    default:
      statusCode = 500;
      message = 'Internal Server Error';
      break;
  }
  return res.status(statusCode).json({ message });
};

module.exports = errorMiddleware;
