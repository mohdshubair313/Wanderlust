const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Reviews = require("./reviews");

const listingSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: schema.Types.ObjectId,
    ref: "User"
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: ['Trending', 'Amazing Pools', 'Amazing Views',"Farms","Tropical",'Beach','Country Side','Castle','Top cities','Mountaneous Region']
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
