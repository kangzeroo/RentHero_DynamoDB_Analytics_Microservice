const Rx = require('rxjs')
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


exports.stringSearchMessagesBetweenRentHeroAndCustomers = function(string, minDate, maxDate, sender_id, receiver_id, only_renthero){
  const p = new Promise((res, rej) => {
    let Items = []
    let params = {
      "TableName": COMMUNICATIONS_HISTORY,
      "FilterExpression": `#DATE BETWEEN :minDate AND :maxDate${ only_renthero ? ' AND #ACTION = :action' : ''}${ string ? ' AND contains(#TEXT, :string)' : ''}${ sender_id ? ' AND #SENDER_ID = :sender_id' : ''}${ receiver_id ? ' AND #RECEIVER_ID = :receiver_id' : '' }`,
      "ExpressionAttributeNames": {
        "#DATE": "DATE"
      },
      "ExpressionAttributeValues": {
        ":minDate": minDate,
        ":maxDate": maxDate
      }
    }
    if (only_renthero) {
      params.ExpressionAttributeNames["#ACTION"] = "ACTION"
      params.ExpressionAttributeValues[":action"] = "RENTHERO_SMS"
    }
    if (string) {
      params.ExpressionAttributeNames["#TEXT"] = "TEXT"
      params.ExpressionAttributeValues[":string"] = string
    }
    if (sender_id) {
      params.ExpressionAttributeNames["#SENDER_ID"] = "SENDER_ID"
      params.ExpressionAttributeValues[":sender_id"] = sender_id
    }
    if (receiver_id) {
      params.ExpressionAttributeNames["#RECEIVER_ID"] = "RECEIVER_ID"
      params.ExpressionAttributeValues[":receiver_id"] = receiver_id
    }
    console.log(params)
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
  })
  return p
}
