const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // does header that start with 'Bearer exist?
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secreto');
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Authorization required' });
  }
  req.user = payload;
  next();
};
