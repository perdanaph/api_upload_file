const router = require('express').Router();
const userRoute = require('./user');
const errorMiddleware = require('./../middlewares/error');

router.use('/api/v1', userRoute);

router.use(errorMiddleware);

module.exports = router;
