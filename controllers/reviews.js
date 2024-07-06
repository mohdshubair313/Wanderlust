const Listing = require("../models/listing.js");
const Review = require("../models/reviews");

module.exports.ReviewPost = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review is created by You!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.DeletePost = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted by You!");
    res.redirect(`/listings/${id}`);
}
