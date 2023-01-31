const { Photo } = require('../models/index');
const fs = require('fs-extra');
const path = require('path');

exports.post = async (req, res, next) => {
  try {
    const { name, description, UserId } = req.body;
    const file = req.file.filename;
    const photo = await Photo.create({
      name,
      description,
      UserId,
      photo_url: `images/${file}`
    });
    return res.status(201).json({
      message: 'success',
      photo
    });
  } catch (error) {
    next(error);
  }
};
exports.get = async (req, res, next) => {
  try {
    const photo = await Photo.findByOwnerid(req.user.id);
    return res.status(200).json({
      message: 'Success',
      photo
    });
  } catch (error) {
    next(error);
  }
};
exports.put = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, UserId } = req.body;
  try {
    const findPhoto = await Photo.findOne({ where: { id } });
    if (!findPhoto) {
      return res.status(404).json({
        message: 'Fail, cannot find data photo'
      });
    }
    if (req.file == undefined) {
      const photo = (
        await Photo.update(
          { name, description, UserId },
          { where: { id }, returning: true }
        )
      )[1][0];
      return res.status(200).json({
        message: 'Success',
        photo: photo
      });
    } else {
      await fs.unlink(path.join(`public/${findPhoto.photo_url}`));
      const photo = (
        await Photo.update(
          {
            name,
            description,
            photo_url: `images/${req.file.filename}`,
            UserId
          },
          { where: { id }, returning: true }
        )
      )[1][0];
      return res.status(200).json({
        message: 'Success',
        photo: photo
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findPhoto = await Photo.findOne({ where: { id } });
    if (!findPhoto) {
      return res.status(404).json({
        message: 'photo does not exist'
      });
    }
    await fs.unlink(path.join(`public/${findPhoto.photo_url}`));
    // delete photo
    await Photo.destroy({
      where: { id }
    });
    return res.status(200).json({
      message: 'Success delete photo '
    });
  } catch (error) {
    next(error);
  }
};
exports.authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authenticationUser = req.user.id;
    const photo = await Photo.findOne({
      where: {
        id
      }
    });
    if (!photo) {
      res.status(404).json({
        name: 'Data Not Found',
        message: `Photo with id "${id}" not found`
      });
    } else if (photo.UserId === authenticationUser) {
      next();
    } else {
      res.status(403).json({
        name: 'Authorization Error',
        message: `User with id "${authenticationUser}" does not have permission to access Photo with id "${id}"`
      });
    }
  } catch (error) {
    next(error);
  }
};
