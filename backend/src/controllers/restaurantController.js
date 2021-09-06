const express = require('express')
const router = express.Router()
const restaurantService = require('../services/restaurantService')
const to = require('await-to-js').default
const stripe = require('stripe')('sk_test_3cJsDJW6yKPIWO1tMolUXH0I00S2qw90bw'); // Secret key
const { get } = require('lodash')

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, restaurant] = await to(restaurantService.create(body))
    if(err) return next(err)
    return res.json(restaurant)
})

router.get("/", async (req, res, next) => {
    let err, restaurants
    // const { longitude, latitude } = req.query
    // if (longitude && latitude) {
    //     console.log(longitude, latitude);
    //     [err, restaurants] = await to(restaurantService.getByLocation(longitude, latitude))
    // } else{
    //     [err, restaurants] = await to(restaurantService.getAll())
    // }
    [err, restaurants] = await to(restaurantService.getAll())
    if(err) return next(err)
    return res.json(restaurants)
})

router.get("/:auth0Id", async (req, res, next) => {
    const { auth0Id } = req.params || {}
    const { email } = req.query || {}
    console.log(email, auth0Id)
    const [err, restaurant] = await to(restaurantService.getOrCreate(auth0Id))
    if(err) return next(err)
    if(get(restaurant, ['lastErrorObject', 'updatedExisting'])) return res.json(restaurant.value)
    const stripeAccount = await stripe.accounts.create({
        email,
        country: "ie",
        type: "custom",
        requested_capabilities: [
            'card_payments',
            'transfers',
        ],
    })
    await restaurantService.updateRestaurant(restaurant.value._id, { stripeAccountId: stripeAccount.id })
    return res.json({...restaurant.value, stripeAccountId: stripeAccount.id})

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(restaurantService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})

router.patch('/:id', async (req, res, next) => {
    const update = req.body;
    const [err, updateResponse] = await to(restaurantService.updateRestaurant(req.params.id, update))
    if(err) return next(err)
    return res.send(updateResponse)
})



module.exports = router
