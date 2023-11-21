const {getAllTopics, ReadEndPoint, getAllPossibleArticles} = require('../models/topics-models')

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

exports.getAllArticles = (req,res,next) => {
    getAllPossibleArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
};