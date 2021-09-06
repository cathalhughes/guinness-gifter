const mongoose = require('mongoose');

const dbRoute = process.env.DATABASE_URL;

const { mongoUrl } = require('../../dbConstants');

// connects our back end code with the database
module.exports.connect = async () => {

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        useFindAndModify: false
    };

    mongoose.connect(dbRoute, mongooseOpts);

    let db = mongoose.connection;
    db.once('open', () => console.log('connected to the database'));
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports.getConnection = async () => mongoose

module.exports.dropAllCollections = async () => {

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    useFindAndModify: false
  };

  await mongoose.connect(mongoUrl, mongooseOpts);
  mongoose.connection.db.dropDatabase();
} 
