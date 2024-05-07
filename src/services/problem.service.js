const { StatusCodes } = require('http-status-codes');
const { markdownSanitizer } = require('../utils');
const { AppError, InternalServerError } = require('../errors');

class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {

        try {
            console.log(problemData.description);



            // 1. Sanitize the markdown for description
            problemData.description = markdownSanitizer(problemData.description);
            const problem = await this.problemRepository.create(problemData);
            return problem;
        } catch (error) {
            if (error.name == 'MongooseError') {
                console.log(error);
            }
            throw new InternalServerError('Cannot add a new problem');
        }

    }

    async getAllProblems() {

        try {
            console.log("Called get all problems");



            const problems = await this.problemRepository.getAll();
            return problems;

        } catch (error) {

            console.log(error);

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'No problems found';
                error.details = 'Problems requested is not present';
                throw error;
            }
            throw new InternalServerError('Unable to fetch all the problems');
        }

    }

}


module.exports = ProblemService;