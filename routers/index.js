const router = require('express').Router();
const userRouter = require('./user');
const photoRouter = require('./photo');
const errorMiddleware = require('./../middlewares/error');

router.use('/api/v1', userRouter);
router.use('/api/v1', photoRouter);

// router.use(errorMiddleware);

module.exports = router;
