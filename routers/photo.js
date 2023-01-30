const router = require('express').Router();
const { post, get } = require('../controllers/photoController');
const { upload } = require('../middlewares/uploadFile');

// router.post('/photos', upload, post);
router.post('/photos', upload, post);
router.get('/photos', get);

module.exports = router;
