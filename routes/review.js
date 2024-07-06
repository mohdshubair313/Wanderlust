const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapAsync.js");
const expressError = require("../Utils/expressError.js");
const Review = require("../models/reviews");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn , isReviewAuthor} = require("../AuthMiddleware.js"); 
const reviewController = require("../controllers/reviews.js");

// Route to create a new review
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.ReviewPost));

// Route to delete a review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.DeletePost));

module.exports = router;
