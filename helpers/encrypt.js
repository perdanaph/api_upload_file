const bcrypt = require('bcrypt');

exports.encryptPassword = {
  hash: (password) => {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  },
  compare: (password, passwordEncrypt) => {
    return bcrypt.compareSync(password, passwordEncrypt);
  },
};
