const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantReview = new Schema(
    {
        review: {
          type: String,
          required: [true, 'Review cannot be empty!']
        },
        rating: {
          type: Number,
          min: [0, 'Rating cannot be below 0.0'],
          max: [5, 'Rating cannot be above 5.0']
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        reviewer: {
          type: mongoose.Schema.ObjectId,
          required: [true, 'Review must have an reviewer']
        },
        restaurantId: {
          type: mongoose.Schema.ObjectId,
          required: [true, 'Review must be associated to a restaurant']
        }
  }
);

module.exports = mongoose.model('RestaurantReview', RestaurantReview);
