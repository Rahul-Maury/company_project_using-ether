const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "something went wrong";
  return res.status(status).json({ message });

}

module.exports = { errorMiddleware };