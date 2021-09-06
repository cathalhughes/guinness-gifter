const express = require('express')
const router = express.Router()

const emitEvent = (eventName, res) => {
    res.write(`event: ${eventName}\ndata: empty\n\n`);
}

router.get("/", (req, res) => {
    console.log('line 9')
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders(); // flush the headers to establish SSE with client
    req.app.get('eventEmitter').on('newOrderReceived', (restaurantId) => {
        emitEvent(`newOrderReceived-${restaurantId}`, res)
    })

    req.app.get('eventEmitter').on('orderUpdated', (userId) => {
        emitEvent(`orderUpdated-${userId}`, res)
    })

    res.on('close', () => {
        console.log('client dropped me');
    });
});



module.exports = router
