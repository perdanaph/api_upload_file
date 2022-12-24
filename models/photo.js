'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User);
    }
  }
  Photo.init(
    {
      name: {
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
      description: DataTypes.TEXT,
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID cannot be omitted',
          },
          notEmpty: {
            msg: 'User ID cannot be an empty string',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );
  return Photo;
};
