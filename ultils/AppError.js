// Lets create a classe thea extends the built in class Error

class AppError extends Error {
  // Now I got to set my consttructor in order to force what calls it to use those methods bellow

  constructor(message, statusCode) {
    // now with the super keyWord we force to use also the constructor of the parent class
    //     In our case bellow, The Error class only acepts the message parameter
    //          By setting this, our messagem propertie gets the messa itself
    super(message);


    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // I use this option to chose if I wanna give it back to the client. True means yes in this case

    /// in order to avoid polution of the return of an error

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
