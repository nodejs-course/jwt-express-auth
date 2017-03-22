module.exports = (req, res, next) => {
  if(req.decoded.role === 'admin'){
    return next();
  } else {
    return res.status(403).send({
      message: 'You are not admin. Need special permission.'
    });
  }
};
