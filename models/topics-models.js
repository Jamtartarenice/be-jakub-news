const db = require('../db/connection.js');
const fs = require('fs/promises');
const format = require('pg-format');

exports.getAllTopics = () => {
return db.query(`SELECT * FROM topics;`)
    .then((topics) => {
            return topics.rows;
    });
};

exports.ReadEndPoint = () => {
    return fs.readFile('endpoints.json')
    .then((ends) => { 
        const parse = JSON.parse(ends);
        return parse;
    });
};

exports.getArticleCommentByID = (id) => {
    return db.query(format(`SELECT * FROM comments WHERE article_id = $1;`,[id]))
    .then((comments) => {
        console.log(comments)
        return comments.rows;
    });
};