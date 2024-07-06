const Listing = require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: maptoken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index.ejs", { allListings });
};

module.exports.createNewUser = (req, res) => {
  res.render("listing/newUserData.ejs");
};

module.exports.showRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: { path: "author" }
  }).populate("owner");
  if (!listing) {
    req.flash("error", "The Listing trying to access does not exist");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { listing });
};

module.exports.NewPost = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
  .send();
  console.log('Geocoding Response:', response.body);
    
  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);

  req.flash('success', 'New Listing has been created by You!');
  res.redirect('/listings');
};

module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "New Listing has been created by You!");
    return res.redirect("/listings");
  }
  let OriginalImageUrl = listing.image.url;
OriginalImageUrl = OriginalImageUrl.replace("/uploads","/uploads/h_250,w_250,q_auto:eco")

  res.render("listing/edit.ejs", { listing , OriginalImageUrl});
};

module.exports.UpdatePost = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== undefined) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save(); 
    req.flash("success", "Listing Updated by You!");
    res.redirect(`/listings/${id}`);
  }
  
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
  const { category } = req.body;
  const {id} = req.params;
  try {
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const results = await Listing.find(id);
    res.redirect("/listings", { results, category });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
