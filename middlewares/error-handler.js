const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('Error from error handler: ', err);
  res.status(500).json({
    message: 'Something went wrong please try again !!!',
  });
};

module.exports = errorHandlerMiddleware;
