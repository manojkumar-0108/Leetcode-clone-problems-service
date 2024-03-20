const express = require('express');

const { problemControllerUpdated } = require('../../controllers');

const problemRouter = express.Router();

problemRouter.get('/ping', problemControllerUpdated.pingProblemController);

problemRouter.get('/:id', problemControllerUpdated.getProblem);

problemRouter.get('/', problemControllerUpdated.getProblems);

problemRouter.post('/', problemControllerUpdated.addProblem);

problemRouter.delete('/:id', problemControllerUpdated.deleteProblem);

problemRouter.put('/:id', problemControllerUpdated.updateProblem);


module.exports = problemRouter;
