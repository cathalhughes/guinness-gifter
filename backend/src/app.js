const jwt = require("express-jwt")

const jwksRsa = require("jwks-rsa")
require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');


const cors = require('cors');
const express = require('express')
const app = express()
app.use(cors());
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()



const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://impact-apps.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://order-backend.com',
    issuer: 'https://impact-apps.eu.auth0.com/',
    algorithms: ['RS256']
});

const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();
app.set('eventEmitter', eventEmitter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use(jwtCheck);

// Define an endpoint that must be called with an access token
app.get("/api/external", (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});

app.use("/api", router)

router.use('/events', require('./notification'))

router.use("/restaurant", require('./controllers/restaurantController.js'))
router.use("/order", require('./controllers/orderController.js'))
router.use("/item", require('./controllers/itemController.js'))
router.use("/menu", require('./controllers/menuController.js'))
router.use("/restaurant", require('./controllers/restaurantReviewController.js'))
router.use("/item", require('./controllers/ItemReviewController.js'))
router.use("/user", require('./controllers/userController.js'))
router.use("/payment", require('./controllers/paymentController.js'))



router.get("/:id", async (req, res) => {
    return res.send('hello world: ' +  req.params.id)
})

module.exports = app;
