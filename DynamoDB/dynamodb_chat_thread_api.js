
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


exports.get_specific_chat_thread = function(sender_id, receiver_id) {
  const p = new Promise((res, rej) => {
    const promises = [
      getMessagesFromSendersPOV(sender_id, receiver_id),
      getMessagesFromReceiversPOV(sender_id, receiver_id)
    ]
    Promise.all(promises).then((result) => {
      // console.log(result)
      res(result)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })
  })
  return p
}

const getMessagesFromSendersPOV = (sender_id, receiver_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#SENDER_ID = :sender_id",
      "IndexName": "By_SENDER_ID",
      "FilterExpression": "#RECEIVER_ID = :receiver_id",
      "ExpressionAttributeNames": {
        "#SENDER_ID": "SENDER_ID",
        "#RECEIVER_ID": "RECEIVER_ID",
      },
      "ExpressionAttributeValues": {
        ":sender_id": sender_id,
        ":receiver_id": receiver_id,
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

const getMessagesFromReceiversPOV = (sender_id, receiver_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#SENDER_ID = :receiver_id",
      "IndexName": "By_SENDER_ID",
      "FilterExpression": "#RECEIVER_ID = :sender_id",
      "ExpressionAttributeNames": {
        "#SENDER_ID": "SENDER_ID",
        "#RECEIVER_ID": "RECEIVER_ID",
      },
      "ExpressionAttributeValues": {
        ":sender_id": sender_id,
        ":receiver_id": receiver_id,
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
