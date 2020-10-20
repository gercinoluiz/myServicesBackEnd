// I will use it in the app as the last middleWheren, so that everytime my app gets an errors, it throws tah to right here
// The status code and Messagem I am receiving from the parent Class Error
// As the express recognize 4 parameter as error handler, it gets whatEver the class receives

// creating separeted functions to send them back to client

const senError = {
  dev: (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err,
    });
  },

  prod: (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // If the error is not operational I will send them a generic message haha

    err.isOperational
      ? res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        })
      : res.status(err.statusCode).json({
          status: "Error",
          message: "Something Went Wrong",
        });
  },
};

module.exports = (err, req, res, next) => {
  // call the function according to the enviroment

  console.log("Enviroment:", process.env.ENVIROMENT);

  if (process.env.ENVIROMENT === "development") {
    senError.dev(err, res);
  } else if (process.env.ENVIROMENT === "production") {
    senError.prod(err, res);
  }
};
