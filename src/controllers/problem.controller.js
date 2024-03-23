const { StatusCodes } = require('http-status-codes');
const NotImplementedError = require('../errors/notImplemented.error');

function pingProblemController(req, res, next) {
    try {
        return res
            .status(StatusCodes.OK)
            .json(
                {
                    message: 'Ping Check Successfull'
                });
    } catch (err) {
        next(err);
    }

}

function addProblem(req, res, next) {
    try {

        throw new NotImplementedError("addProblem");

    } catch (error) {
        next(error);
    }
}

function getProblem(req, res, next) {
    try {

        throw new NotImplementedError("getProblem");

    } catch (error) {
        next(error);
    }
}

function getProblems(req, res, next) {
    try {

        throw new NotImplementedError("getProblems");

    } catch (error) {
        next(error);
    }
}

function deleteProblem(req, res, next) {
    try {

        throw new NotImplementedError("deleteProblem");

    } catch (error) {
        next(error);
    }
}

function updateProblem(req, res, next) {
    try {

        throw new NotImplementedError("updateProblem");

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}

/**
 * 
 * res
 * 
 * res.status -> returns the same response object with status property set
 * .json -> return the same response object which has status set but this json to be returned is also set
 * 
 */