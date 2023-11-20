const {getAllTopics, ReadEndPoint} = require('../modules/topics-modules')

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