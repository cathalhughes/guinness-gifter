const RestaurantReviewModel = require('../models/RestaurantReview');

const create = async item => await RestaurantReviewModel.create(item);

const get = async id => await RestaurantReviewModel.findById(id)

const deleteOne = async id => RestaurantReviewModel.findByIdAndRemove(id)

const getAll =  async (restaurantId) => await RestaurantReviewModel.find({'restaurantId': restaurantId})

module.exports = {
    create,
    get,
    getAll,
    deleteOne,
}
