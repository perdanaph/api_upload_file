const { verify } = require('./../helpers/jsonwebtoken');
const { User } = require('./../models/index');

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({
        message: 'Fail to access, you not have credential',
      });
    }
    const token = authorization.split(' ')[1];
    const { id, email, username } = verify(token);
    const user = await User.findOne({ where: { id, email, username } });
    if (!user) {
      return res.status(401).json({
        message: 'Failed Authorization',
      });
    }
    req.user = { id, email, username };
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authMiddleware;
