const { User } = require('./../models/index');
const { jwtHelpers } = require('./../helpers/jsonwebtoken');

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    const user = await User.findOne({ where: { refreshToken: token } });
    if (!user) return res.sendStatus(403);
    jwtHelpers.verifyRefreshToken(token, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const token = jwtHelpers.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username
        },
        { expiresIn: '30s' }
      );
      res.json({ token });
    });
  } catch (error) {
    next(error);
  }
};
