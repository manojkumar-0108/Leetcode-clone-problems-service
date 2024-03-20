const express = require('express');

const v1Router = require('./v1');
const v2Router = require('./v2');

const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);
apiRouter.use('/v2', v2Router);

module.exports = apiRouter;