const express = require('express');
const app = express();
const {getTopics, getEndPoints} = require('./controllers/topics-controller.js')

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getEndPoints);

//error handling
app.use((err,req,res,next) => {
    if(!err.status)
    res.status(err.status).send(err.msg);
    else
    next(err);
}) 

module.exports = app