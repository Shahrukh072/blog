const jwt = require("jsonwebtoken");

exports.validateJwt = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Bearer token is required" });
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, req.app.get('secretKey'), (err, data) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      req.body.userId = data.userId; 
      next();
    });
  } catch (e) {
    console.log(e);
  }
};
