const get_specific_chat_thread = require('../DynamoDB/dynamodb_chat_thread_api').get_specific_chat_thread
const verify_relevant_hints = require('../DynamoDB/dynamodb_chat_thread_api').verify_relevant_hints


// POST /get_chat_thread
exports.get_chat_thread = function(req, res, next){
  console.log('hello')
  const sender_id = req.body.sender_id
  const receiver_id = req.body.receiver_id

  get_specific_chat_thread(sender_id, receiver_id)
  .then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}

// POST /clear_relevant_hints
exports.clear_relevant_hints = function(req, res, next){
  const hints = req.body.hints

  const promises = hints.map((hint) => {
    return verify_relevant_hints(hint)
  })

  Promise.all(promises).then((results) => {
    console.log(results)
    res.json({
      success: true,
    })
  }).catch((err) => {
    console.log(err)
    res().status(500).send({
      success: false,
    })
  })
}
