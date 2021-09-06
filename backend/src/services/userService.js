const MODEL_PATH = '../models/'
const UserModel =  require(MODEL_PATH + 'User');

const get = async id => await UserModel.findById(id)

const updateUser = async (id, update) => await UserModel.findByIdAndUpdate(id, update);

const getOrCreate = async auth0Id => await UserModel.collection.findOneAndUpdate(
    { auth0Id },
    {
        $setOnInsert: { auth0Id },
    },
    {
        returnOriginal: false,
        upsert: true,
    }
);

module.exports = {
    getOrCreate,
    get,
    updateUser,
}
