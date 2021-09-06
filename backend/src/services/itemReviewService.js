const ItemReviewModel = require('../models/ItemReview');

const create = async item => await ItemReviewModel.create(item);

const get = async id => await ItemReviewModel.findById(id)

const deleteOne = async id => ItemReviewModel.findByIdAndRemove(id)

const getAll =  async (restaurantId) => await ItemReviewModel.find({'itemId': restaurantId})

module.exports = {
    create,
    get,
    getAll,
    deleteOne,
}
