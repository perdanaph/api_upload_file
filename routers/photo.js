const router = require('express').Router();
const { post, get, put, destroy } = require('../controllers/photoController');
const { upload } = require('../middlewares/uploadFile');
const authentication = require('./../middlewares/authentication');

router.use(authentication);
router.post('/photos', upload, post);
router.get('/photos', get);
router.put('/photos/:id', upload, put);
router.delete('/photos/:id', destroy);

module.exports = router;
