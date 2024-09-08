class apiResponse {
    constructor(success , data , statuscode , error , message){
        this.success = success,
        this.data = data,
        this.statuscode = statuscode,
        this.error = error,
        this.message = message
    }
}

module.exports = {apiResponse}