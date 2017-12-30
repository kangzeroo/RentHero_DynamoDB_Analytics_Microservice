const get_specific_chat_thread = require('../DynamoDB/dynamodb_chat_thread_api').get_specific_chat_thread

// POST /get_chat_thread
exports.get_chat_thread = function(req, res, next){
  const sender_id = req.body.sender_id
  const receiver_id = req.body.receiver_id

  get_specific_chat_thread(sender_id, receiver_id).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}
