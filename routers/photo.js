const router = require('express').Router();
const { post, get, put } = require('../controllers/photoController');
const { upload } = require('../middlewares/uploadFile');

// router.post('/photos', upload, post);
router.post('/photos', upload, post);
router.get('/photos', get);
router.put('/photos/:id', upload, put);

module.exports = router;
