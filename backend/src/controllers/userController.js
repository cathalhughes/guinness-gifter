const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const to = require('await-to-js').default

router.post("/", async (req, res, next) => {
    const { auth0Id } = req.body
    const [err, user] = await to(userService.getOrCreate(auth0Id))
    if(err) return next(err)
    return res.json(user)
})

module.exports = router;
