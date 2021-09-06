const express = require('express')
const router = express.Router()
const reviewService = require('../services/restaurantReviewService')
const to = require('await-to-js').default

router.post("/review", async (req, res, next) => {
    const body = req.body
    const [err, item] = await to(reviewService.create(body))
    if(err) return next(err)
    return res.json(item)
})

router.get("/:id/reviews", async (req, res, next) => {
    const [err, items] = await to(reviewService.getAll(req.params.id))
    if(err) return next(err)
    return res.json(items)
})

router.get("/reviews/:reviewId", async (req, res, next) => {
    const [err, item] = await to(reviewService.get(req.params.reviewId))
    if(err) return next(err)
    return res.json(item)
})

router.delete("/reviews/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(reviewService.deleteOne(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
