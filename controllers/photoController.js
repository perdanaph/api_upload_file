const { Photo } = require('../models/index');

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
// exports.put = async (req, res, next) => {};
// exports.delete = async (req, res, next) => {};
