const db = require('../db/connection.js');
const fs = require('fs/promises');

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

exports.getAllPossibleArticles = () => {
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC;`)
    .then((articles) => {
        return articles.rows;
    });
};