const express = require('express');
const meetingsRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

// GET all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).send('No meetings');
    }
});

//POST meeting
meetingsRouter.post('/', (req, res, next) => {
    const meeting = req.body;
    meeting.time = String(meeting.time);
    meeting.date = Date.parse(meeting.date);
    meeting['day'] = String(meeting.day) || 'monday';
    meeting['note'] = String(meeting.note) || ' ';
    const meetingAdded = addToDatabase('meetings', meeting);
    if (meetingAdded === null) {
        res.status(404).send('Not a valid meeting');
    } else {
        res.status(201).send(meetingAdded);
    }
});

 // DELETE meeting
 meetingsRouter.delete('/', (req, res, next) => {
    const meetingDeleted = deleteAllFromDatabase('meetings');
    if (meetingDeleted === null) {
        res.status(404).send('Not meeting data');
    } else {
        res.status(204).send(meetingDeleted);
    }
 });


 module.exports = meetingsRouter;