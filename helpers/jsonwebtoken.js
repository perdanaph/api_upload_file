const jsonwebtoken = require('jsonwebtoken');

exports.jwtHelpers = {
  sign: (payload, option) => {
    const secretToken = process.env.SECRET_TOKEN;
    return jsonwebtoken.sign(payload, secretToken, option);
  },
  verify: (token, option) => {
    const secretToken = process.env.SECRET_TOKEN;
    return jsonwebtoken.verify(token, secretToken, option);
  },
  signRefreshToken: (payload, option) => {
    const refreshToken = process.env.REFRESH_TOKEN;
    return jsonwebtoken.sign(payload, refreshToken, option);
  },
  verifyRefreshToken: (token, option) => {
    const refreshToken = process.env.REFRESH_TOKEN;
    return jsonwebtoken.verify(token, refreshToken, option);
  }
};
