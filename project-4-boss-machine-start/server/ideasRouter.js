const express = require('express');
const ideasRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

//GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas);
    } else {
        res.status(404).send()
    }
})

// param
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (!idea) {
        res.status(404).send('Not idea found')
    } else {
        req.idea = idea;
        next();
    }
});

//POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/',checkMillionDollarIdea, (req, res, next) => {
    const idea = req.body;
    const ideaAdded = addToDatabase('ideas', idea);
    if (ideaAdded) {
        res.status(201).send(ideaAdded);
    } else {
        res.status(404).send('Not a valid idea');
    }
});

//GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

//PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId',checkMillionDollarIdea, (req, res, next) => {
    const ideaToModify = req.idea;
    const ideaModified = req.body;
    ideaModified.id = ideaToModify.id;
    const modified = updateInstanceInDatabase('ideas', ideaModified);
    if (modified) {
        res.send(modified);
    } else {
        res.status(404).send('Not a valid idea');
    }
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaToDelete = req.idea;
    const deleted = deleteFromDatabasebyId('ideas', ideaToDelete.id);
    res.status(204).send(deleted);
});


module.exports = ideasRouter;