const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Handdleing server errors
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! - Shuting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

// creating the enviroment variables: Important{The .env file mut be in the same path as the node modules folder}

dotenv.config({
  path: "./config.env",
});

const app = require("./app.js");

// DATABASE CONNECTION
//TODO: Understand Why only one equal
let DB = process.env.ENVIROMENT;

if (DB = 'development') {
    
  DB = process.env.DATABASE.replace("<DATABASE>", process.env.dbDevelopment);
 
} else if (process.env.ENVIROMENT = "production") {
  DB = process.env.DATABASE.replace("<DATABASE>", process.env.dbProduction);
}

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`Database connected to ${process.env.ENVIROMENT} mode...`);
})


const server = app.listen(process.env.PORT, () => {
  console.log(
    `Welcome to the server, it is running on port: ${process.env.PORT}`
  );

});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down...");
  server.close(() => {
    console.log("Process ended");
  });
});


