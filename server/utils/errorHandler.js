//Error handler class
class ErrorHandler extends Errors {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports = ErrorHandler;