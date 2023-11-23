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
    console.log('in modoles');
    return db.query(format(`SELECT * FROM comments WHERE article_id = %s;`,id))
    .then((comments) => {
        return comments.rows;
    });
};