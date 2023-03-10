const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).send("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("you are not authenticated!");
  }
};

module.exports = { verifyToken };