const { StatusCodes } = require('http-status-codes');
const BaseError = require("../errors/base.error");
const { Logger } = require('../config');


function errorHandler(err, req, res, next) {

    if (err instanceof BaseError) {

        Logger.error({ message: err.name, error: err.stack });

        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                error: err.details,
                data: {}// because this is an exception so no data is going tobe provided
            });
    }

    Logger.error({ message: err.name, error: err.stack });
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: "Something went wrong!!",
            error: err,
            data: {}// because this is an exception so no data is going tobe provided
        });
}

module.exports = errorHandler;