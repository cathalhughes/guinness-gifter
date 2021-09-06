const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema(
    {
        restaurantId: {type: mongoose.Schema.Types.ObjectId, required:true},
        itemIds: [{type: mongoose.Schema.Types.ObjectId}]
    },
    { timestamps: true },
);

module.exports = mongoose.model('Menu', Menu);
