const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

// Use minions router
const minionsRouter = require('./minionsRouter');
apiRouter.use('/minions', minionsRouter);

// Use ideas router
const ideasRouter = require('./ideasRouter');
apiRouter.use('/ideas', ideasRouter);

// Use meetings router
const meetingsRouter = require('./meetingsRouter');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
