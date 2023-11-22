const {getAllTopics, ReadEndPoint, getArticleById} = require('../models/topics-models')
const {checkExists} = require('../db/seeds/utils.js');

exports.getTopics = (req,res,next) => {
    getAllTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    });
}

exports.getEndPoints = (req,res,next) => {
    ReadEndPoint()
    .then((endPoints) => {
        res.status(200).send({ endPoints });
    })
}

exports.getArticleBy = (req,res,next) => {
    const { article_id } = req.params
        Promise.all([checkExists('articles', 'article_id', article_id), getArticleById(article_id)])
        .then(article => {
            res.status(200).send({ article: article[1][0] })
        })
        .catch(next);
};
