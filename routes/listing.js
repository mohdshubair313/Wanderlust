const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../AuthMiddleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(wrapAsync(listingControllers.index));

router.route("/new")
  .get(isLoggedIn, listingControllers.createNewUser)
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.NewPost));

router.route("/:id")
  .get(wrapAsync(listingControllers.showRoute))
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingControllers.UpdatePost))
  .delete(isLoggedIn, wrapAsync(listingControllers.deletePost));

router.post("/searchpost", isLoggedIn, validateListing, wrapAsync(listingControllers.searchListings));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editPost));

module.exports = router;
