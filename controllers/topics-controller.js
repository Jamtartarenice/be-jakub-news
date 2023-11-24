const {getAllTopics, 
    ReadEndPoint, 
    getArticleById, 
    getAllPossibleArticles, 
    getArticleCommentByID, 
    postAComment,
    updateArticleByID
    } = require('../models/topics-models')
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

exports.getAllArticles = (req,res,next) => {
    getAllPossibleArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
};

exports.getArticleComments = (req,res,next) => {
    const { article_id } = req.params;
    Promise.all([checkExists('articles', 'article_id', article_id), getArticleCommentByID(article_id)])
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch(next)
};

exports.postArticleComment = (req,res,next) => {
    const { article_id } = req.params;
    const body = req.body;
    postAComment(article_id, body)
    .then((comment) => {
        res.status(200).send({ comment });
    })
    .catch(next);
};

exports.patchArticleID = (req,res,next) => {
    const {article_id} = req.params;
    const body = req.body;
    Promise.all([checkExists('articles', 'article_id', article_id),updateArticleByID(article_id, body)])
    .then((result) => {
        res.status(200).send({ result:result[1] });
    })
    .catch(next);
};