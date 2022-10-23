const router = require('express').Router();
const movieRouter = require('./movieRouter');
const userRouter = require('./userRouter');

router.use('/movies', movieRouter);
router.use('/users', userRouter);

module.exports = router;