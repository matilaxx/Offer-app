const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: "Unauthorized request",
      };
    } else {
      const user = jwt.decode(req.headers.authorization);
      if (user) {
        req.user = user;
        next();
      } else {
        throw {
          status: 401,
          message: "Unauthorized request",
        };
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
