const { StatusCodes } = require('http-status-codes');
const { markdownSanitizer } = require('../utils');
const { AppError, InternalServerError, BaseError } = require('../errors');

const { logger } = require('../config');



class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    logError(message, functionName, data, error) {
        logger.error({
            message: ` [MSG]: ${message}\n [FUNC]: [${functionName} function]\n [DATA]: ${JSON.stringify(data)}`,
            error: error.stack
        });
    }

    async createProblem(problemData) {

        try {

            // 1. Sanitize the markdown for description
            problemData.description = markdownSanitizer(problemData.description);

            const problem = await this.problemRepository.create(problemData);

            if (!problem) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to add new problem', []);
            }
            return problem;
        } catch (error) {

            this.logError('Failed to add new problem', 'createProblem()', problemData, error);
            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Cannot add a new problem", ['Database is not responding!']);
            }
            throw new InternalServerError('Cannot add a new problem');
        }

    }

    async getAllProblems() {

        try {
            const problems = await this.problemRepository.getAll();
            if (!problems) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'No problems found.', []);
            }
            return problems;

        } catch (error) {
            this.logError('Failed to get all problems', 'getAllProblems()', null, error);

            if (error instanceof BaseError) throw error;

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Database is not responding!", []);
            }
            throw new InternalServerError('Unable to fetch all the problems');
        }

    }


    async getProblem(id) {

        try {
            const problem = await this.problemRepository.get(id);
            if (!problem) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'No problem found.', ['Resource requested is not present']);
            }
            return problem;

        } catch (error) {

            this.logError('Failed to get problem', ' getProblem()', id, error);
            if (error instanceof BaseError) throw error;

            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Invalid object id received", ['Cannot cast the object id provided to mongodb id']);
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Database is not responding!", []);
            }

            throw new InternalServerError('Unable to fetch the problem');
        }

    }

    async deleteProblem(id) {

        try {
            const problem = await this.problemRepository.findByIdAndDelete(id);
            if (!problem) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'No problem found.', ['Resource requested to delete is not present']);
            }
            return problem;

        } catch (error) {

            this.logError('Failed to delete problem', ' deleteProblem()', id, error);
            if (error instanceof BaseError) throw error;

            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Invalid object id received", ['Cannot cast the object id provided to mongodb id']);
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Database is not responding!", []);
            }

            throw new InternalServerError('Unable to delete the problem');
        }

    }

    async updateProblem(id, data) {

        try {

            if (Object.keys(data).length === 0) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'No data recieved to update problem', []);
            }
            let problemData = {};
            if (data.title) problemData.title = data.title;
            if (data.difficulty) problemData.difficulty = data.difficulty;
            if (data.testCases) problemData.testCases = data.testCases;
            if (data.description) problemData.description = markdownSanitizer(data.description);;

            const updatedResponse = await this.problemRepository.findByIdAndUpdate(id, problemData);

            if (!updatedResponse) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update the problem', []);
            }
            return updatedResponse;
        } catch (error) {

            this.logError('Failed to update problem', 'updateProblem()', data, error);
            if (error instanceof BaseError) {
                throw error;
            }

            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Invalid object id received", ['Cannot cast the object id provided to mongodb id']);
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Cannot add a new problem", ['Database is not responding!']);
            }
            throw new InternalServerError('Cannot update problem');
        }

    }

}


module.exports = ProblemService;