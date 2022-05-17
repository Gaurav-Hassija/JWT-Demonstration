const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          success: false,
          error: "Invalid Token",
          message: "The Token you provided is incorrect!",
        });
      } else {
        let id = decodedToken.id;
        res.locals.id = id;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Bad Request",
      message: "Please provide token for authorization",
    });
  }
};

module.exports = { requireAuth };
