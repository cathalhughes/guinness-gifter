const mongoose = require('mongoose');
const { mongoUrl } = require('../../dbConstants');
const ItemModel =  require('../models/Item');
const RestaurantModel =  require('../models/Restaurant');
const MenuModel =  require('../models/Menu');
const OrderModel =  require('../models/Order');
const itemsToAdd = require('./sampleData/items')
const restaurantsToAdd = require('./sampleData/restaurants')
sampleData = async () => {


    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        useFindAndModify: false
    };

    await mongoose.connect(mongoUrl, mongooseOpts);
    await mongoose.connection.db.dropDatabase();

    const insertedItems = await ItemModel.collection.insert(itemsToAdd)
    const insertedItemsIdsArr = Object.values(insertedItems.insertedIds)
    console.log(insertedItemsIdsArr)

    restaurantsToAdd[0].auth0Id = 'auth0|5eb59834b8ae290bf15131a9'
    restaurantsToAdd[0].stripeAccountId = 'acct_1Gga61LK3s7xe9vD'
    const insertedRestaurants = await RestaurantModel.collection.insert(restaurantsToAdd.slice(0,3))

    const insertedRestaurantsIdsArr = Object.values(insertedRestaurants.insertedIds)
    console.log(insertedRestaurantsIdsArr)
    const menusToAdd = [
            {restaurantId: insertedRestaurantsIdsArr[0], itemIds: insertedItemsIdsArr.slice(0,5)},
            {restaurantId: insertedRestaurantsIdsArr[1], itemIds: insertedItemsIdsArr.slice(5,10)},
            {restaurantId: insertedRestaurantsIdsArr[2], itemIds: insertedItemsIdsArr.slice(10,15)}
        ]

    const insertedMenus = await MenuModel.collection.insert(menusToAdd)


    const insertedMenusIdsArr = Object.values(insertedMenus.insertedIds)
    console.log(insertedMenusIdsArr)
    
    const ordersToAdd = [1,2,3].map(() => ({restaurantId: insertedRestaurantsIdsArr[0], userId: null, items: itemsToAdd.map(item => ({itemId: item._id, price: item.price, quantity: 2, name: item.name})), total: 10.0, status: 'pending', location: 'Collection'}))
    const ordersToAdd2 = [1,2,3].map(() => ({restaurantId: insertedRestaurantsIdsArr[0], userId: null, items: itemsToAdd.map(item => ({itemId: item._id, price: item.price, quantity: 2, name: item.name})), total: 10.0, status: 'done', location: 'Collection'}))
    const ordersToAdd3 = [1,2,3].map(() => ({restaurantId: insertedRestaurantsIdsArr[0], userId: null, items: itemsToAdd.map(item => ({itemId: item._id, price: item.price, quantity: 2, name: item.name})), total: 10.0, status: 'active', location: 'Collection'}))
    const insertedOrders = await OrderModel.collection.insert([...ordersToAdd, ...ordersToAdd2, ...ordersToAdd3])
    console.log(insertedOrders)
    console.log(insertedRestaurantsIdsArr[0])

    process.exit(0)
}
sampleData()
