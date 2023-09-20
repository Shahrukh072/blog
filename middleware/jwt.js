const jwt = require("jsonwebtoken");

exports.validateJwt = (req, res, next) => {
  try {
    const token = req.headers["access-token"]; 
    if (!token) {
      return res.status(400).json({ message: "Jwt is required" });
    }
    jwt.verify(token, req.app.get('secretKey'), function (err, data) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      req.body.userId = data._id;
    });
    next();
  } catch (e) {
    console.log(e);
  }
};
