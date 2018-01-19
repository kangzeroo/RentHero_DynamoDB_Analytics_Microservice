const get_renthero_sms = require('../DynamoDB/dynamodb_renthero_messages_api').get_renthero_sms

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
