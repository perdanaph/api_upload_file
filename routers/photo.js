const router = require('express').Router();
const photoController = require('../controllers/photoController');
const { upload } = require('../middlewares/uploadFile');

// router.post('/photos', upload, photoController.post);
// router.get('/photos', photoController.get);
// router.put('/photo/:id', photoController.put);
// router.delete('/photo/:id', photoController.delete);

module.exports = router;
