const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet =require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const router = require("./routes/index.js");
const swaggerDocs = require("./swagger.js");
const { rateLimiter } = require("./middleware");
var mqttClient = require("./mqtt/mqttClient");
mqttClient();
//mqttClient.client.subscribe("abcde", {qos: 0})

if (process.env.ALLOWED_ORIGIN_URL) {
    const whitelist = process.env.ALLOWED_ORIGIN_URL.split(',').map(address => address.trim());

    let corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    }

    app.use(cors(corsOptions));
}
// helmet security
if (process.env.NODE_ENV !== 'development') {
    app.use(helmet.frameguard({ action: 'deny'}));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.contentSecurityPolicy());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hsts({
        maxAge: 31536000,
        preload: true,
    }));
}

// parse requests increase
app.use(bodyParser({ limit: "50mb" }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

// set router
app.use(router)

// set proxy count
//app.enable("trust proxy");
//const PROXY_COUNT = process.env.PROXY_COUNT || 1
//app.set('trust proxy', PROXY_COUNT)
app.set('trust proxy', true);
//app.get('/ip', (req, res) => res.send(req.ip));

// api call limit
app.use(rateLimiter.apiLimiter)

// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

    if (process.env.NODE_ENV !== 'production') {
        swaggerDocs(app, PORT)
    }
});

