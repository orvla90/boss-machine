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


// GET all
apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    if(minions){
        res.send(minions);
    } else {
        res.status(404).send()
    }
     
})

// POST
apiRouter.post('/', (req, res, next) => {
    if(req.query.id && req.query.data){
        const minionToAdd = {"name":req.query.name, "title":req.query.title, "weaknesses": req.query.weaknesses, "salary": req.query.salary};
        const newMinion = addToDatabase('minions', minionToAdd);
    } else {
        res.status(404).send('Not a valid Minion')
    }
    
})

// GET by minionId

// PUT (update minion)

// DELETE

module.exports = apiRouter;
