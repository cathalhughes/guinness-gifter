const mongoose = require('mongoose');
const { mongoUrl } = require('../../dbConstants');
const OrderModel =  require('../models/Order');

dropAllCollections = async () => {


    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        useFindAndModify: false
    };


    await mongoose.connect(mongoUrl, mongooseOpts);
    await mongoose.connection.db.dropDatabase();
    // await OrderModel.collection.drop()
    process.exit(0)
}
dropAllCollections()
