const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter an item name'],
            index: true,
        },
        price: {
            type: Number,
            required: [true, 'Please enter a price for the item'],
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
        label: {
            type: String
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'ItemReview'
        }]
    },
    { timestamps: true },
);

module.exports = mongoose.model('Item', Item);
