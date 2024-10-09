const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No headers provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = isAuthenticated;

/* // Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
}; */
