const express = require('express')
const router = express.Router()
const menuService = require('../services/menuService')
const itemService = require('../services/itemService')
const to = require('await-to-js').default
const {isEmpty} = require('lodash')

router.post("/", async (req, res, next) => {
    const body = req.body
    const [updateErr, upsertedItems] = await to(itemService.upsertItems(body.items))
    if(updateErr) return next(updateErr)
    const itemIds = Object.values(upsertedItems)
    const menuToCreate = {
        restaurantId: body.restaurantId,
        itemIds,
    }
    const [createErr, menu] = await to(menuService.create(menuToCreate))
    if(createErr) return next(createErr)
    return res.json(menu)
})

router.patch("/:restaurantId", async (req, res, next) => {
    const body = req.body
    const [updateErr, upsertedItems] = await to(itemService.upsertItems(body.items))
    if(updateErr) return next(updateErr)
    const itemIds = Object.values(upsertedItems)
    // New items were added, add their IDs to the menu
    const currentItems = body.items.map(item => item._id)
    const [err] = await to(menuService.updateMenuWithNewItems([...currentItems, ...itemIds], body.restaurantId))
    if(err) return next(err)
    return res.sendStatus(200)
})

router.get("/", async (req, res, next) => {
    const [err, menus] = await to(menuService.getAll())
    if(err) return next(err)
    return res.json(menus)
})

router.get("/:id", async (req, res, next) => {
    const [err, menu] = await to(menuService.get(req.params.id))
    if(err) return next(err)
    return res.json(menu)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(menuService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})

router.delete("/", async (req, res, next) => {
    const {restaurantId} = req.query
    const filter = {
        restaurantId
    }
    const [err, deleteResponse] = await to(menuService.deleteMenuByFilter(filter))
    if(err) return next(err)
    return res.send(deleteResponse)
})

router.get('/:restaurantId/items', async (req, res, next) => {
    console.log(req.user.sub)
    const [err, menu] = await to(menuService.getByRestaurantId(req.params.restaurantId))
    if(err) return next(err);
    if(!menu || isEmpty(menu.itemIds)) return res.send([])
    const [itemsErr, items] = await to(itemService.findItemsForMenu(menu.itemIds)) 
    if(itemsErr) return next(itemsErr)
    return res.send(items)
})


module.exports = router
