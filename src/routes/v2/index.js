const express = require('express');

const problemRouter = require('./problems.routes');

const v2Router = express.Router();

v2Router.use('/problems', problemRouter);

module.exports = v2Router;
