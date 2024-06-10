const express = require('express');
const router = express.Router();
const movieRouter = require('./movieRouter');
const genreRouter = require('./genreRouter');
const reviewRouter = require('./reviewRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/movie', movieRouter);
router.use('/genre', genreRouter);
router.use('/review', reviewRouter);

module.exports = router;
