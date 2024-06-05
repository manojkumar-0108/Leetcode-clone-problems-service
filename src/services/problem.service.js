const { StatusCodes } = require('http-status-codes');
const { markdownSanitizer } = require('../utils');
const { AppError, InternalServerError, BaseError } = require('../errors');

const { logger } = require('../config');



class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    logError(message, functionName, data, error) {
        logger.error(`${message}\n [FUNC]: [${functionName} function]\n [DATA]: ${data}\n [ERROR]: ${error}`);
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
}


module.exports = ProblemService;