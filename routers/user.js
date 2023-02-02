const router = require('express').Router();
const { register, login, logout } = require('./../controllers/userController');
const { refreshToken } = require('./../controllers/refreshToken');

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/token', refreshToken);
router.delete('/user/logout', logout);

module.exports = router;
