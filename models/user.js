'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'first name has required',
          },
          notEmpty: {
            msg: "first name can't be empty string",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'last name has required',
          },
          notEmpty: {
            msg: "last name can't be empty string",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'username is already exist',
        },
        validate: {
          notNull: {
            msg: 'username has required',
          },
          notEmpty: {
            msg: "username can't be empty string",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email is already exist',
        },
        validate: {
          notNull: {
            msg: 'email has required',
          },
          notEmpty: {
            msg: "email can't be empty string",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'password has required',
          },
          notEmpty: {
            msg: "password can't be empty string",
          },
          len: {
            args: [8, 10],
            msg: 'password must consist of 8 to 10 characters',
          },
        },
      },
      profile_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
