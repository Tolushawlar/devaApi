const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token and decode it to get user information
    const decoded = jwt.verify(token, "your-secret-key");

    // Attach user information to the request object
    req.user = decoded.user;

    next(); // User is authenticated, proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authenticate;
