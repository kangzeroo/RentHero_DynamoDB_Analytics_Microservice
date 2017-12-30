
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


exports.get_all_chats_for_tenant = function(tenant_id) {
  const p = new Promise((res, rej) => {
    const promises = [
      getAllMessagesSendByTenant(tenant_id),
      getAllMessagesReceivedByTenant(tenant_id)
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



const getAllMessagesSendByTenant = (tenant_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#SENDER_ID = :sender_id",
      "IndexName": "By_SENDER_ID",
      "ExpressionAttributeNames": {
        "#SENDER_ID": "SENDER_ID",
      },
      "ExpressionAttributeValues": {
        ":sender_id": tenant_id,
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

const getAllMessagesReceivedByTenant = (tenant_id) => {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "KeyConditionExpression": "#RECEIVER_ID = :receiver_id",
      "IndexName": "By_RECEIVER_ID",
      "ExpressionAttributeNames": {
        "#RECEIVER_ID": "RECEIVER_ID",
      },
      "ExpressionAttributeValues": {
        ":receiver_id": tenant_id,
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
