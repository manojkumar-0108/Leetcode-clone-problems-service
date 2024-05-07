const { StatusCodes } = require('http-status-codes');
const NotImplementedError = require('../errors/notImplemented.error');
const { SuccessResponse } = require('../utils/common/');

const { Enums } = require('../utils/common');
const { ProblemService } = require('../services');
const { ProblemRepository } = require('../repositories');
const { Problem } = require('../models');



const problemRepository = new ProblemRepository(Problem);
const problemService = new ProblemService(problemRepository);

async function addProblem(req, res, next) {
    try {

        const response = await problemService.createProblem({
            title: req.body.title,
            description: req.body.description,
            difficulty: (req.body.difficulty) ? req.body.difficulty : Enums.PROBLEMS_DIFFICULTY.EASY,
            testCases: (req.body.testCases) ? req.body.testCases : []
        });


        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully created problem";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

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

async function getProblems(req, res, next) {
    try {

        const problems = await problemService.getAllProblems();

        SuccessResponse.data = problems;
        SuccessResponse.message = "Successfully fetched problem";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


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
    updateProblem
}

/**
 * 
 * res
 * 
 * res.status -> returns the same response object with status property set
 * .json -> return the same response object which has status set but this json to be returned is also set
 * 
 */