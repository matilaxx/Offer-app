const multer = require("multer");

module.exports = (err, req, res, next) => {
  if (err.status) {
    console.log(err.status)
    res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
    });
  } else if (err instanceof multer.MulterError) {
    res.status(err.status).json({ message: err });
  } else {
    console.log(err);
    req.sentry.captureException(err);
    res.status(500).json({
      mesage: "Internal Server Error",
    });
  }
};
