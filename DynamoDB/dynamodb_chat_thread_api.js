
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


exports.get_specific_chat_thread = function(sender_contact_id, receiver_contact_id) {
  const p = new Promise((res, rej) => {
    const promises = [
      getMessagesFromSendersPOV(sender_contact_id, receiver_contact_id),
      getMessagesFromReceiversPOV(sender_contact_id, receiver_contact_id)
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



const getMessagesFromSendersPOV = (sender_contact_id, receiver_contact_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#SENDER_CONTACT_ID = :sender_contact_id",
      "IndexName": "By_SENDER_ID",
      "FilterExpression": "#RECEIVER_CONTACT_ID = :receiver_contact_id",
      "ExpressionAttributeNames": {
        "#SENDER_CONTACT_ID": "SENDER_CONTACT_ID",
        "#RECEIVER_CONTACT_ID": "RECEIVER_CONTACT_ID",
      },
      "ExpressionAttributeValues": {
        ":sender_contact_id": sender_contact_id,
        ":receiver_contact_id": receiver_contact_id,
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

const getMessagesFromReceiversPOV = (sender_contact_id, receiver_contact_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#SENDER_CONTACT_ID = :receiver_contact_id",
      "IndexName": "By_SENDER_ID",
      "FilterExpression": "#RECEIVER_CONTACT_ID = :sender_contact_id",
      "ExpressionAttributeNames": {
        "#SENDER_CONTACT_ID": "SENDER_CONTACT_ID",
        "#RECEIVER_CONTACT_ID": "RECEIVER_CONTACT_ID",
      },
      "ExpressionAttributeValues": {
        ":sender_contact_id": sender_contact_id,
        ":receiver_contact_id": receiver_contact_id,
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
