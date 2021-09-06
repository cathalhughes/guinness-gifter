const express = require('express')
const router = express.Router()
const orderService = require('../services/orderService')
const userService = require('../services/userService')
const paymentsService = require('../services/paymentsService')
const restaurantService = require('../services/restaurantService')
const to = require('await-to-js').default
const { isEmpty, has, get } = require('lodash')
const mongoose = require('mongoose');

router.post("/", async (req, res, next) => {
    const body = req.body
    const user = await userService.get(body.userId) // Some method to get a user from the database
    const stripeCustomer = await paymentsService.findOrCreateStripeCustomer(user, body.tokenId)
    if(!get(user, 'stripeCustomerId', null)) {
        await userService.updateUser(body.userId, {stripeCustomerId: stripeCustomer.id})
    }
    const restaurants = await restaurantService.get({_id: body.restaurantId})
    const { stripeAccountId } = restaurants[0]

    // change amount and create it on the backend
    console.log(body.amount, )
    const [paymentErr, payment] = await to(paymentsService.createPayment({amount: body.amount, stripeAccountId, stripeCustomer}))
    if(paymentErr) return next(paymentErr)
    console.log(payment)

    const [err, order] = await to(orderService.create(body))
    if(err) return next(err)
    req.app.get('eventEmitter').emit('newOrderReceived', order.restaurantId)
    return res.json(order)
})


router.get("/", async (req, res, next) => {
    const { filter }  = req.query || {};
    const parsedFilter = isEmpty(filter) ? {} : JSON.parse(filter);
    console.log(parsedFilter)
    if(has(parsedFilter, 'userId')) parsedFilter.userId = mongoose.Types.ObjectId(parsedFilter.userId)
    if(has(parsedFilter, 'restaurantId')) parsedFilter.restaurantId = mongoose.Types.ObjectId(parsedFilter.restaurantId)
    const [err, orders] = await to(orderService.getAll({...parsedFilter}))
    if(err) return next(err) 
    return res.json(orders)
})

router.get("/restaurant/:restaurantId/aggregated", async (req, res, next) => {
    const { restaurantId } = req.params
    const filter = {
        restaurantId: mongoose.Types.ObjectId(restaurantId)
    }
    const [err, aggregatedOrders] = await to(orderService.getAllAggregated(filter))
    if(err) return next(err) 
    return res.json(aggregatedOrders)

})

router.get("/restaurant/:restaurantId/aggregated/user", async (req, res, next) => {
    const { restaurantId } = req.params
    const filter = {
        restaurantId: mongoose.Types.ObjectId(restaurantId)
    }
    const [err, aggregatedOrders] = await to(orderService.getAllAggregatedByUser(filter))
    if(err) return next(err) 
    return res.json(aggregatedOrders)

})

router.get("/restaurant/:restaurantId/aggregated/item", async (req, res, next) => {
    const { restaurantId } = req.params
    const filter = {
        restaurantId: mongoose.Types.ObjectId(restaurantId)
    }
    const [err, aggregatedOrders] = await to(orderService.getAllAggregatedByItems(filter))
    if(err) return next(err) 
    return res.json(aggregatedOrders)

})

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    const [err, updatedOrder] = await to(orderService.updateOrder(id, update))
    if(err) return next(err)
    // req.app.get('eventEmitter').emit('newOrderReceived', order.restaurantId)
    console.log('hello emit')
    req.app.get('eventEmitter').emit('orderUpdated', updatedOrder.userId)
    return res.json(updatedOrder)
})

router.get("/:id", async (req, res, next) => {
    const [err, order] = await to(orderService.get(req.params.id))
    if(err) return next(err)
    return res.json(order)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(orderService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
