const express = require('express');
const minionsRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (!minion) {
        res.status(404).send('Minion not found');
    } else {
        req.minion = minion;
        next();
    }
})

// GET all
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    if(minions){
        res.send(minions);
    } else {
        res.status(404).send()
    }
     
})

// POST
minionsRouter.post('/', (req, res, next) => {
    const minionToAdd = req.body;
    const newMinion = addToDatabase('minions', minionToAdd);
    if(newMinion === null){
        res.status(404).send('Not a valid Minion')
    } else {
        res.status(201).send(minionToAdd);
    }
    
})

// GET by minionId
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})
// PUT (update minion)
minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.minion.id;
    const minionToUpdate = req.body;
    minionToUpdate.id = req.params.minionId;
    const minionUpdated = updateInstanceInDatabase('minions', minionToUpdate);
    if (!minionUpdated) {
        res.status(404).send('Not a valid minion');
    } else {
        res.send(minionUpdated);
    }
})
// DELETE
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionToDelete = req.minion;
    const minionDeleted = deleteFromDatabasebyId('minions', minionToDelete.id);
    if (minionDeleted) {
        res.status(204).send(minionToDelete);
    } else {
        res.status(404).send('Minion not found');
    }
})


module.exports = minionsRouter;