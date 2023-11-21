const {getAllTopics, ReadEndPoint, get} = require('../models/topics-models')

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
    getArticleCommentByID(article_id)
    .then((articleComments) => {
        res.status(200).send({ articleComments });
    });
};