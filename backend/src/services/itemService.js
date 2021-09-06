const MODEL_PATH = '../models/'
const ItemModel = require(MODEL_PATH + 'Item');
const _ = require('lodash');
const mongoose = require('mongoose');

const create = async item => await ItemModel.create(item);

const get = async id => await ItemModel.findById(id)

const deleteItem = async id => ItemModel.findByIdAndRemove(id)

const getAll =  async () => await ItemModel.find()

const findItemsForMenu = async (itemIds) => await ItemModel.find({ '_id': {$in: itemIds} })

const reduceUpdate = function(update) {
    const reducer = (accumulator, val, key) => {
      let path = key;
      return _.setWith(accumulator, path, val, Object);
    };
  
    return _.reduce(update, reducer, {});
  };

const upsertItems = async function(items) {
    const mongoUpdateArray = _.map(items, item => {
      const { _id, ...updateSet} = item
      const reducedUpdate = reduceUpdate(updateSet)
      return {
        updateOne: { filter: { _id: mongoose.Types.ObjectId(_id) }, update: { $set: reducedUpdate }, upsert: true },
      };
    });
    try {
      const { upsertedIds } = await ItemModel.collection.bulkWrite(mongoUpdateArray);
      return upsertedIds;
    } catch (e) {
      return { err: e };
    }
};

const deleteMany = async (filter) => {
    return await ItemModel.deleteMany(filter)
}

module.exports = {
    create,
    get,
    getAll,
    deleteItem,
    findItemsForMenu,
    upsertItems,
    deleteMany,
}
