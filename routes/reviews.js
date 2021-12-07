const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils//catchAsync')
const reviews = require('../controllers/reviews')
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware')

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview))

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview),
)

module.exports = router
