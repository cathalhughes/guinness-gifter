const express = require('express')
const router = express.Router()
const itemService = require('../services/itemService')
const to = require('await-to-js').default

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, item] = await to(itemService.create(body))
    if(err) return next(err)
    return res.json(item)
})

router.get("/", async (req, res, next) => {
    const [err, items] = await to(itemService.getAll())
    if(err) return next(err)
    return res.json(items)
})

router.get("/:id", async (req, res, next) => {
    const [err, item] = await to(itemService.get(req.params.id))
    if(err) return next(err)
    return res.json(item)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(itemService.deleteItem(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})

router.delete("/", async (req, res, next) => {
    const { deletions } = req.query
    const filter = {_id: {$in: deletions}}
    const [err, deleteResponse] = await to(itemService.deleteMany(filter))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
