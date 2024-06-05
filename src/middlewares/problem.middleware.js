const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");


function validateCreateProblem(req, res, next) {

    if (!req.body.title || !req.body.description) {
        let details = new Array();

        if (!req.body.title) {
            details.push("problem [title] is not found in incomming request in correct form")
        }

        if (!req.body.description) {
            details.push("problem [description] is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}


module.exports = {
    validateCreateProblem
}