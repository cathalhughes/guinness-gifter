const MODEL_PATH = '../models/'
const OrderModel = require(MODEL_PATH + 'Order');

const create = async order => await OrderModel.create(order);

const get = async id => await OrderModel.findById(id)

const deleteOrder = async id => await OrderModel.findByIdAndRemove(id)

const updateOrder = async (id, update) => await OrderModel.findByIdAndUpdate(id, update);

const getAll = async filter => await OrderModel.find(filter)

const getByRestaurantId = async  restaurantId => await OrderModel.find({'restaurantId': restaurantId})

const getAllAggregatedByItems = async (filter) => {
    return await OrderModel.collection.aggregate(
        [
            { $match: { ...filter } },
            { $unwind: '$items' },
            { $addFields: {
                'itemId': '$items.itemId',
                'quantity': '$items.quantity',
                'name': '$items.name',
                'price': '$items.price',
            }},
            { $group: 
                {
                    _id: '$itemId',
                    totalTimesInOrder: { $sum: 1 },
                    name : { $first: '$name' },
                    totalTimesInOrderedQuantity: { $sum: '$quantity' },
                    totalMoneySpentOnItem: { $sum: { $multiply: ['$quantity', '$price']} },
                    averageQuantityItemOrdered: { $avg: '$quantity' },
                    averageMoneySpentOnItem: { $avg: { $multiply: ['$quantity', '$price']} },
                } 
            },
        ]
    )
    .toArray(); 
}

const getAllAggregatedByUser = async (filter) => {
    return await OrderModel.collection.aggregate(
        [
            { $match: { ...filter } },
            { $group: 
                {
                    _id: '$userId',
                    totalOrdersByUser: { $sum: 1 },
                    totalSpentByUser: { $sum: '$total' },
                    averageSpentByUser: { $avg: '$total' },
                } 
            },
        ]
    )
    .toArray(); 
}

const getAllAggregated = async (filter) => {
    return await OrderModel.collection.aggregate(
        [
            { $match: { ...filter } },
            { $addFields: {
                "orderSize": { "$size": "$items" }
            } },
            { $group: 
                {
                    _id: '$restaurantId',
                    totalNumberOfOrders: { $sum: 1 },
                    totalForAllOrders: { $sum: '$total' },
                    averageOfAllOrders: { $avg: '$total' },
                    totalNumberOfItemsOrdered: { $sum: '$orderSize' },
                    averageNumberOfItemsOrdered: { $avg: '$orderSize' },
                } 
            },
        ]
    )
    .toArray(); 
}


module.exports = {
    create,
    get,
    getAll,
    deleteOrder,
    getByRestaurantId,
    updateOrder,
    getAllAggregated,
    getAllAggregatedByItems,
    getAllAggregatedByUser,
}
