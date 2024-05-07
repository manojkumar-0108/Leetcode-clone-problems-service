const express = require('express');

const { problemController, PingCheck } = require('../../controllers');
const { problemMiddleware } = require('../../middlewares');

const problemRouter = express.Router();

problemRouter.get('/ping', PingCheck('Problems Controller is live...'));

problemRouter.get('/:id', problemController.getProblem);

problemRouter.get('/', problemController.getProblems);

problemRouter.post('/',
    problemMiddleware.validateCreateProblem,
    problemController.addProblem
);

problemRouter.delete('/:id', problemController.deleteProblem);

problemRouter.put('/:id', problemController.updateProblem);


module.exports = problemRouter;

