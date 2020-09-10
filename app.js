//Importing SERVER utilities
const express = require("express");
const morgan = require("morgan"); // logger middlewhere
const rateLimit = require("express-rate-limit"); // Limit the number of requests our API can receive (you can create many limiters)
const helmet = require("helmet"); // security against HTTP headers
const xss = require("xss-clean"); // security againx cross domain scripting
const hpp = require("hpp"); // prevent parameter polution
const mongoSanitize = require("express-mongo-sanitize"); // prevent against Nosql Injection
const cors = require("cors");



const serviceRoutes = require('./routes/serviceRoutes')
const locationRoutes = require('./routes/locationRoutes')

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});



// ==========Security measures==========
app.use(limiter); // 
app.use(helmet());

//To accept other sites conection
app.use(cors());
app.enable("trust proxy");


//========== BODY PARSER: Reading data from the req.body==========
app.use(express.json({
    limit: '10kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));


// I use it after the body parser!!

app.use(mongoSanitize());
app.use(xss());



app.use("/services", serviceRoutes)
app.use("/locations", locationRoutes)


if (process.env.ENVIROMENT === 'development') {
    app.use(morgan('dev'));
    console.log("Yor're in development mode - Morgan Activated Master")
}



module.exports = app;