const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const Review = require('./models/review')

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be singed in first')
    return res.redirect('/login')
  }
  next()
}

const isAuthor = async (req, res, next) => {
  const { id } = req.params
  const campground = await Campground.findById(id).populate('author')
  if (!campground.author._id.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!')
    return res.redirect(`/campgrounds/${id}`)
  }
  next()
}

const isReviewAuthor = async (req, res, next) => {
  const { reviewId, id } = req.params
  const review = await Review.findById(reviewId).populate('author')
  if (!review.author._id.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!')
    return res.redirect(`/campgrounds/${id}`)
  }
  next()
}

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((el) => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

const validateReview = (res, req, next) => {
  const { error } = reviewSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((el) => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

module.exports = {
  isLoggedIn,
  isAuthor,
  isReviewAuthor,
  validateCampground,
  validateReview,
}
