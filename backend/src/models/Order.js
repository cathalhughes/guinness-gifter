const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId, 
            required:true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        items: [{type: Object}],
        price: {
            type: Number,
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId, 
            default: null,
        },
        total: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'active', 'done'],
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
