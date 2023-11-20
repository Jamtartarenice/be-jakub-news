const {getAllTopics} = require('../modules/topics-modules')

exports.getTopics = (req,res,next) => {
    getAllTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(next)
}