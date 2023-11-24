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

exports.getAllPossibleArticles = () => {
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC;`)
    .then((articles) => {
        return articles.rows;
    });
};

exports.getArticleCommentByID = (id) => {
    return db.query(format(`SELECT * FROM comments WHERE article_id = %s;`,id))
    .then((comments) => {
        return comments.rows;
    });
};

exports.postAComment = (article_id, body) => {
    body.votes = 0;
    return db.query(`INSERT INTO comments (body, author,article_id) 
    VALUES ($1,$2,$3) RETURNING *;`,[body.body,body.username, article_id])
    .then((comment) => {
        return comment.rows[0];
    });
}

exports.removeCommentByID = (comment_id) => {
    return db.query(format(`DELETE FROM comments WHERE comment_id = %s;`,comment_id))
};