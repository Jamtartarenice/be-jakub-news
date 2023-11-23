const {getAllTopics, ReadEndPoint, getArticleCommentByID} = require('../models/topics-models')
const { checkExists } = require('../db/seeds/utils')

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

exports.getArticleComments = (req,res,next) => {
    const { article_id } = req.params;
    console.log('in controller get')
    Promise.all([checkExists('comments', 'article_id', article_id), getArticleCommentByID(article_id)])
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch(console.log('failed in check'))
};
