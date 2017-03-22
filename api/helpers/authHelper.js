const jwt = require('jsonwebtoken');

var createToken = (payload)  => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 7*24*60*60 });
};

function checkMiddleware(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'Failed to authenticate token.' });
        }

        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided.'
      });
    }
}

module.exports = {
  checkMiddleware,
  createToken
};