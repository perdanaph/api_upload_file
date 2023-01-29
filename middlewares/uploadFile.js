const multer = require('multer');
const fs = require('fs');
const path = require('path');

const maxSize = 5 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = 'storage/public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cd) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// check te file type
function checkFileType(file, cb) {
  const allowFileTypes = /jpeg|jpg|png/;
  const extName = allowFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowFileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: file must be image !!');
  }
}

module.exports = upload;
