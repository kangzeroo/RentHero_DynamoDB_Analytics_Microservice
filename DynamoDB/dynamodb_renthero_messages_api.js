
const AWS = require('aws-sdk')
const aws_config = require('../credentials/aws_config')
const dynaDoc = require("dynamodb-doc")
const COMMUNICATIONS_HISTORY = require('./schema/dynamodb_tablenames').COMMUNICATIONS_HISTORY
AWS.config.update(aws_config)

const dynamodb = new AWS.DynamoDB({
  dynamodb: '2012-08-10',
  region: "us-east-1"
})
const docClient = new dynaDoc.DynamoDB(dynamodb)

exports.get_renthero_sms = () => {
  const p = new Promise((res, rej) => {
    getMessagesByAction('RENTHERO_SMS')
    .then((result) => {
      res(result)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })
  })
  return p
}

const getMessagesByAction = (action) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#ACTION = :action",
      "IndexName": "By_Action",
      "ExpressionAttributeNames": {
        "#ACTION": "ACTION",
      },
      "ExpressionAttributeValues": {
        ":action": action,
      }
    }
    docClient.query(params, function(err, data) {
      if (err){
        console.log(err, err.stack); // an error occurred
        rej(err)
      }else{
        console.log(data)
        res(data)
      }
    })
  })
  return p
}
