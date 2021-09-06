const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: {
            type: String,
        },
        auth0Id: {
            type: String,
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            index: true,
        },
        stripeCustomerId: {
            type: String,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
