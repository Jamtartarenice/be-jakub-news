const express = require('express');
const app = express();
const {getTopics, getEndPoints, getArticleComments} = require('./controllers/topics-controller.js')
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
} = require('./errors.js');

app.use(express.json());

app.get('/api/articles/:article_id/comments', getArticleComments)

app.get('/api/topics', getTopics);

app.get('/api', getEndPoints);

//error handling
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app