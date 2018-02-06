const Rx = require('rxjs')
const AWS = require('aws-sdk')
const aws_config = require('../credentials/aws_config')
const dynaDoc = require("dynamodb-doc")
const COMMUNICATIONS_HISTORY = require('./schema/dynamodb_tablenames').COMMUNICATIONS_HISTORY
const TOUR_HINTS = require('./schema/dynamodb_tablenames').TOUR_HINTS
const RENTHERO_NOTES = require('./schema/dynamodb_tablenames').RENTHERO_NOTES
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


exports.verify_relevant_hints = function(hint){
  const p = new Promise((res, rej) => {
    hint.VERIFIED = true
    const updatedHint = {
      'TableName': TOUR_HINTS,
      'Item': hint,
    }
    docClient.putItem(updatedHint, function(err, data) {
      if (err){
          console.log(JSON.stringify(err, null, 2));
          rej()
      }else{
          console.log('HINT UPDATED!')
          res('success')
      }
    })
  })
  return p
}

exports.get_recent_notes = function(request, resolve, next) {
  console.log('get_recent_notes')
  // console.log(request.body)
  // resolve.json([])
  const p = new Promise((res, rej) => {

    const params = {
      "TableName": RENTHERO_NOTES,
      "FilterExpression": "#DATE > :date",
      "ExpressionAttributeNames": {
        "#DATE": "DATE"
      },
      "ExpressionAttributeValues": {
        ":date": unixDateSince(30)
      }
    }
    let Items = []
    const onNext = ({ obs, params }) => {
      setTimeout(() => {
        console.log('OBSERVABLE NEXT')
        console.log('=========== accumlated size: ' + Items.length)
        docClient.scan(params, (err, data) => {
          if (err){
            console.log(err, err.stack); // an error occurred
            obs.error(err)
          }else{
            console.log(data);           // successful response
            Items = Items.concat(data.Items)
            if (data.LastEvaluatedKey) {
              params.ExclusiveStartKey = data.LastEvaluatedKey
              obs.next({
                obs,
                params
              })
            } else {
              obs.complete(data)
            }
          }
        })
      }, 1500)
    }
    Rx.Observable.create((obs) => {
      obs.next({
        obs,
        params
      })
    }).subscribe({
      next: onNext,
      error: (err) => {
        console.log('OBSERVABLE ERROR')
        console.log(err)
      },
      complete: (y) => {
        console.log('OBSERVABLE COMPLETE')
        console.log(Items.length)
        res(Items)
      }
    })
  }).then((data) => {
    resolve.json(data)
  }).catch((err) => {
    console.log(err)
    resolve.status(500).send(err)
  })
}

const unixDateSince = (numDays) => {
  const today = new Date()
  const todayUnix = today.getTime()
  const sinceUnix = todayUnix - (numDays*24*60*60*1000)
  return sinceUnix
}
