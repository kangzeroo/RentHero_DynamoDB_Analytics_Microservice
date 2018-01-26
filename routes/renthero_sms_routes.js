const get_renthero_sms = require('../DynamoDB/dynamodb_renthero_messages_api').get_renthero_sms
const stringSearchMessagesBetweenRentHeroAndCustomers = require('../DynamoDB/dynamodb_renthero_messages_api').stringSearchMessagesBetweenRentHeroAndCustomers

// POST /get_all_renthero_sms
exports.get_all_renthero_sms = (req, res, next) => {
  console.log('get_all_renthero_sms')
  get_renthero_sms().then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}

// POST /query_renthero_messages
exports.query_renthero_messages = (req, res, next) => {
  console.log('query_renthero_messages')
  const string = req.body.string
  const minDate = req.body.minDate
  const maxDate = req.body.maxDate
  const sender_id = req.body.sender_id
  const receiver_id = req.body.receiver_id
  const only_renthero = req.body.only_renthero

  stringSearchMessagesBetweenRentHeroAndCustomers(string, minDate, maxDate, sender_id, receiver_id, only_renthero).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
}
