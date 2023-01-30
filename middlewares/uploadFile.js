const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = 'public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file');

// // Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only !!!');
  }
}

module.exports = { upload };

// This code option 2
// const util = require('util');
// const multer = require('multer');

// const maxSize = 3 * 1024 * 1024;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + '/storage/public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   }
// });

// const uploadFile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize }
// }).single('file');

// const uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;
