const express = require('express')
const router = express.Router()
const restaurantService = require('../services/restaurantService')
const paymentsService = require('../services/paymentsService')

router.post('/addCard', async (req, res, next) => {
    const card = await addCard(req)
    return res.json(card)
});

router.get('/getCards', async (req, res, next) => {
    const cards = await getCards(req)
    return res.json(cards)
});

router.get('/:restaurantId/setup', async (req, res, next) => {
    const { restaurantId } = req.params 
    const restaurants = await restaurantService.get({_id: restaurantId})
    const { stripeAccountId } = restaurants[0]
    const accountSetupLink = await paymentsService.getAccountSetUpLink(stripeAccountId)
    return res.json(accountSetupLink)
})

router.get('/:restaurantId/setupBankAccount', async (req, res, next) => {
    const { restaurantId } = req.params 
    const { token } = req.query
    const restaurants = await restaurantService.get({_id: restaurantId})
    const { stripeAccountId } = restaurants[0]
    const accountUpdate = await paymentsService.addExternalAccount(stripeAccountId, token)
    return res.json(accountUpdate)
})

module.exports = router
