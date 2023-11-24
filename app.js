const express = require('express');
const app = express();
const {getTopics, getEndPoints, getArticleBy, getAllArticles, getArticleComments, postArticleComment} = require('./controllers/topics-controller.js')
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    } = require('./errors.js');

app.use(express.json());

app.post('/api/articles/:article_id/comments',postArticleComment)

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticleBy)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.get('/api/topics', getTopics);

app.get('/api', getEndPoints);

//error handling
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app