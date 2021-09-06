const mongoose = require('mongoose');
const locationSchema = require('./Location')
const Schema = mongoose.Schema;

const Restaurant = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    auth0Id: {
      type: String,
      index: true,
    },
    email: {
      type: String,
    },
    cuisine: {
      type: String,
      lowercase: true,
    },
    isVegetarian: {
      type: Boolean,
    },
    image: {
      type: String,
      lowercase: true,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String
    //   index: "2dsphere",
    //   required: true
    },
    stripeAccountId: {
      type: String
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'RestaurantReview'
    }],
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
      default: 'CLOSED'
    }
  },
    { timestamps: true },
);

module.exports = mongoose.model('Restaurant', Restaurant);
