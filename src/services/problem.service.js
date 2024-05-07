const { StatusCodes } = require('http-status-codes');
const { markdownSanitizer } = require('../utils');
const { AppError, InternalServerError } = require('../errors');


class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {

        try {

            // 1. Sanitize the markdown for description
            problemData.description = markdownSanitizer(problemData.description);

            const problem = await this.problemRepository.create(problemData);
            return problem;
        } catch (error) {

            if (error.name == 'MongooseError') {
                console.log(error);
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Cannot add a new problem", ['Database is not responding!']);
            }
            throw new InternalServerError('Cannot add a new problem');
        }

    }

    async getAllProblems() {

        try {

            const problems = await this.problemRepository.getAll();
            return problems;

        } catch (error) {

            console.log(error);

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'No problems found';
                error.details = 'Problems requested is not present';
                throw error;
            }
            if (error.name == 'MongooseError') {
                console.log(error);
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Database is not responding!", []);
            }

            throw new InternalServerError('Unable to fetch all the problems');
        }

    }


    async getProblem(id) {

        try {
            console.log("id recieved : ", id);

            const problem = await this.problemRepository.get(id);
            return problem;

        } catch (error) {
            if (error.name == 'CastError') {
                console.log(error);
                throw new AppError(StatusCodes.BAD_REQUEST, "Invalid object id received", ['Cannot cast the object id provided to mongodb id']);
            }

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = `No problem found for given ${id}`;
                error.details = 'Problem requested is not present';
                throw error;
            }
            if (error.name == 'MongooseError') {
                console.log(error);
                throw new AppError(StatusCodes.GATEWAY_TIMEOUT, "Database is not responding!", []);
            }

            throw new InternalServerError('Unable to fetch the problem');
        }

    }
}


module.exports = ProblemService;