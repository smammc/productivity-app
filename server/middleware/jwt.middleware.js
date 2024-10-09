const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // console.log(req);
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No headers provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Attach the payload (decoded token data) to the request object
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = isAuthenticated;
