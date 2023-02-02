const { User } = require('./../models/index');
const { encryptPassword } = require('./../helpers/encrypt');
const { jwtHelpers } = require('./../helpers/jsonwebtoken');

exports.register = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const cekUniqEmail = await User.findOne({ where: { email: email } });

    if (cekUniqEmail) {
      return res.status(400).json({
        message: 'Fail, your email has been registered'
      });
    }

    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({
        message: 'Fail, password length should be 8 - 10 characters'
      });
    }

    const hashPsw = encryptPassword.hash(password);
    const data = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPsw
    });

    return res.status(201).json({
      message: 'Success register'
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        message: 'Fail, email has required'
      });
    }

    if (!password) {
      return res.status(400).json({
        message: 'Fail, password has required'
      });
    }

    const data = await User.findOne({ where: { email: email } });
    if (!data) {
      return res.status(400).json({
        message: 'Fail, Your email is not registered'
      });
    }

    if (!encryptPassword.compare(password, data.password)) {
      return res.status(400).json({
        message: 'Fail, Your password incorrect'
      });
    }

    const token = jwtHelpers.sign(
      {
        id: data.id,
        email: data.email,
        username: data.username
      },
      { expiresIn: '30s' }
    );
    const refreshToken = jwtHelpers.signRefreshToken(
      {
        id: data.id,
        email: data.email,
        username: data.username
      },
      { expiresIn: '1d' }
    );

    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    await User.update(
      { refreshToken: refreshToken },
      { where: { id: data.id } }
    );
    res.status(200).json({
      message: 'Success',
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(204);
    const user = await User.findOne({
      where: { refreshToken: token }
    });
    if (!user) return res.sendStatus(204);
    const userId = user.id;
    await User.update({ refreshToken: null }, { where: { id: userId } });
    res.clearCookie('token');
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
