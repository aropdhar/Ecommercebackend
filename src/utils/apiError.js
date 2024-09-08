class apiError {
  constructor(success = false , data = {} , statusCode = 400 , message = "error occurs"){
    this.success = success,
    this.data = data,
    this.statusCode = statusCode,
    this.message = message

  }
}

module.exports = {apiError}