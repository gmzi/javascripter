class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack); // method in the Error class to lead us in the debugging
  }
}

module.exports = ExpressError;
