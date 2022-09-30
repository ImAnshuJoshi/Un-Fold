const errorHandler = (err, _, res, __) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
}
module.exports = errorHandler
