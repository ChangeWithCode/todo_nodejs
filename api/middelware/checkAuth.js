const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.userData = decoded;

    req.userData = {
        userId: decoded.userId, // Make sure this property matches your token payload
      };

  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }

  next();
};
