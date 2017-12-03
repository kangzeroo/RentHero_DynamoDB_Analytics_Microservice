
const AWS = require('aws-sdk')
const aws_config = require('../credentials/aws_config')
const dynaDoc = require("dynamodb-doc")
const BUILDING_INTERACTIONS = require('./schema/dynamodb_tablenames').BUILDING_INTERACTIONS
AWS.config.update(aws_config)

const dynamodb = new AWS.DynamoDB({
  dynamodb: '2012-08-10',
  region: "us-east-1"
})
const docClient = new dynaDoc.DynamoDB(dynamodb)


exports.get_building_views = function(building_id) {
  const p = new Promise((res, rej) => {
    const params = {
      "TableName": BUILDING_INTERACTIONS,
      "KeyConditionExpression": "#BUILDING_ID = :building_id",
      "IndexName": "By_Local_UserId",
      "FilterExpression": "#ACTION = :action1 AND #DATE > :date",
      "ExpressionAttributeNames": {
        "#BUILDING_ID": "BUILDING_ID",
        "#ACTION": "ACTION",
        "#DATE": "DATE",
        "#USER_ID": "USER_ID",
      },
      "ExpressionAttributeValues": {
        ":building_id": building_id,
        ":action1": 'BUILDING_PAGE_LOADED',
        // ":action2": 'SUBMITTED_BUILDING_APPLICATION',
        // ":action3": 'SUBMITTED_PHONE_CALL_BACK_FORM',
        // ":action4": 'APPLY_NOW_BUTTON_BUILDING',
        // ":action5": 'CALL_LANDLORD_BUTTON',
        ":date": unixDateSince(30)
      },
      "ProjectionExpression": "#ACTION, #DATE, #USER_ID"
    }
    // docClient.scan(params, function(err, data) {
    //   if (err){
    //     console.log(err, err.stack); // an error occurred
    //     rej(err)
    //   }else{
    //     console.log(data);           // successful response
    //     res(data)
    //   }
    // })
    // console.log(params)
    docClient.query(params, function(err, data) {
      if (err){
        console.log(err, err.stack); // an error occurred
        rej(err)
      }else{
        console.log(data)
        data.unique_visitors = determineUniqueVisitors(data.Items)
        data.Items = data.Items.map((it) => {
          return {
            ACTION: it.ACTION,
            DATE: it.DATE,
          }
        })
        res(data)
      }
    })
  })
  return p
}

const unixDateSince = (numDays) => {
  const today = new Date()
  const todayUnix = today.getTime()
  const sinceUnix = todayUnix - (numDays*24*60*60*1000)
  return sinceUnix
}

const determineUniqueVisitors = (Items) => {
    const uniques = []
    Items.forEach((it) => {
      let exists = false
      uniques.forEach((u) => {
        if (u === it.USER_ID) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(it.USER_ID)
      }
    })
    return uniques.length
  }
