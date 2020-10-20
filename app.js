//Importing SERVER utilities
const express = require("express");
const morgan = require("morgan"); // logger middlewhere
const rateLimit = require("express-rate-limit"); // Limit the number of requests our API can receive (you can create many limiters)
const helmet = require("helmet"); // security against HTTP headers
const xss = require("xss-clean"); // security againx cross domain scripting
const hpp = require("hpp"); // prevent parameter polution
const mongoSanitize = require("express-mongo-sanitize"); // prevent against Nosql Injection
const cors = require("cors");

const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHAndler = require("./controllers/errorController");
const AppError = require("./ultils/AppError");

const locationRoutes = require("./routes/locationRoutes");



const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// ==========Security measures==========
app.use(limiter); //


// ==========Security measures==========
app.use(limiter); // 
app.use(helmet());

//To accept other sites conection
app.use(cors());
app.enable("trust proxy");

//========== BODY PARSER: Reading data from the req.body==========
app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

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

app.use("/services", serviceRoutes);
app.use("/locations", locationRoutes);
app.use("/users", userRoutes);

// Error Handller:
//     The code Bellow aims to handler all the requests that not mactch any of our routes, so that it gives an response in JSON format
//             * Note:  This must bes at the en of our middlewherers!!! or else will be executed firtly

app.all("*", (req, res, next) => {
  //

  next(
    new AppError(
      `The route you've tried to reach : ${req.originalUrl} does not exists, please read our documentation at: https://documenter.getpostman.com/view/11499201/TVRg68zN`,
      404
    )
  );
});

// My global Error Handdler
app.use(globalErrorHAndler);

if (process.env.ENVIROMENT === "development") {
  app.use(morgan("dev"));
  console.log("Yor're in development mode - Morgan Activated Master");
}

module.exports = app;


app.use("/services", serviceRoutes)
app.use("/locations", locationRoutes)
app.use("/users", userRoutes)


if (process.env.ENVIROMENT === 'development') {
    app.use(morgan('dev'));
    console.log("Yor're in development mode - Morgan Activated Master")
}



module.exports = app;
