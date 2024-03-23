const BaseError = require("./base.error");
const { StatusCodes } = require('http-status-codes');


class NotImplementedError extends BaseError {

    constructor(propertyName) {
        super("NOT-IMPLEMENTED-ERROR", StatusCodes.NOT_IMPLEMENTED, `${propertyName} is not implemented`, {});
    }

}

module.exports = NotImplementedError;