const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Please Login!!" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Please Login!!" });
  }
}

module.exports = authenticate;
