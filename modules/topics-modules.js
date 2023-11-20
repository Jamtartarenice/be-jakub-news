const db = require('../db/connection.js');
const format = require('pg-format');

exports.getAllTopics = () => {
return db.query(format(`SELECT * FROM topics;`))
    .then((topics) => {
        if(topics.rows.length !== 0)
            return topics.rows;
        else
            return Promise.reject({status: 500, msg: "Failed to find this DataBase"})
    });
};