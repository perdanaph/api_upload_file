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
    const photo = await Photo.findAll();
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
// exports.delete = async (req, res, next) => {};
