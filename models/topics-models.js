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

exports.getArticleById = (ID) => {
    return db.query(format('SELECT * FROM articles WHERE article_id = %L ;', [ID]))
    .then((article) => {
        return article.rows;
    })
};