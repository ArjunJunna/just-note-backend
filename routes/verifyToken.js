const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) res.status(403).json('Token not valid');
      req.user = decoded;
      next();
    });
  } else {
     res.status(401).json('You are not authenticated');
  }
};

module.exports = { verifyToken };
