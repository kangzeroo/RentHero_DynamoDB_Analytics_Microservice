const get_specific_chat_thread = require('../DynamoDB/dynamodb_chat_thread_api').get_specific_chat_thread

// POST /get_chat_thread
exports.get_chat_thread = function(req, res, next){
  const sender_contact_id = req.body.sender_contact_id
  const receiver_contact_id = req.body.receiver_contact_id

  get_specific_chat_thread(sender_contact_id, receiver_contact_id).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}
