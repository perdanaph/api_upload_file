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

    const token = jwtHelpers.sign({
      id: data.id,
      email: data.email,
      username: data.username
    });

    return res.status(200).json({
      message: 'Success',
      token
    });
  } catch (error) {
    console.log(error);
  }
};
