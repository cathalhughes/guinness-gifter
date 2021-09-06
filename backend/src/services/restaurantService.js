const MODEL_PATH = '../models/'
const RestaurantModel =  require(MODEL_PATH + 'Restaurant');

const create = async restaurant => await RestaurantModel.create(restaurant);

const get = async filter => await RestaurantModel.find(filter)

const deleteRestaurant = async id => RestaurantModel.findByIdAndRemove(id)

const getAll =  async () => await RestaurantModel.find()

const updateRestaurant = async (id, update) => await RestaurantModel.findByIdAndUpdate(id, update);

const getOrCreate = async auth0Id => await RestaurantModel.collection.findOneAndUpdate(
    { auth0Id },
    {
        $setOnInsert: { auth0Id },
    },
    {
        returnOriginal: false,
        upsert: true,
        returnNewDocument: true,
    }
);

const getByLocation =  async (longitude, latitude) => await RestaurantModel.find({
  location: {
    $nearSphere: {
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      $maxDistance: 900 * 1609.34
    }
  }
})

module.exports = {
    create,
    get,
    getAll,
    deleteRestaurant,
    getByLocation,
    deleteRestaurant,
    getOrCreate,
    updateRestaurant,
}
