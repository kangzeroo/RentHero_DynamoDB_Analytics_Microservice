const query_dynamodb = require('../DynamoDB/general_queryable').query_dynamodb
const scan_dynamodb = require('../DynamoDB/general_queryable').scan_dynamodb

const BUILDING_INTERACTIONS = require('../DynamoDB/schema/dynamodb_tablenames').BUILDING_INTERACTIONS
const SUITE_INTERACTIONS = require('../DynamoDB/schema/dynamodb_tablenames').SUITE_INTERACTIONS
const STUDENT_PREFERENCES = require('../DynamoDB/schema/dynamodb_tablenames').STUDENT_PREFERENCES
const IMAGE_INTERACTIONS = require('../DynamoDB/schema/dynamodb_tablenames').IMAGE_INTERACTIONS
const AMENITY_INTERACTIONS = require('../DynamoDB/schema/dynamodb_tablenames').AMENITY_INTERACTIONS


exports.retrieve_user_building_browsing_history = function(tenant_id) {
  // build the params to query
  const params = {
    "TableName": BUILDING_INTERACTIONS,
    "KeyConditionExpression": "#USER_ID = :user_id AND #DATE > :date",
    "IndexName": "By_Global_UserId",
    "ExpressionAttributeNames": {
      "#USER_ID": "USER_ID",
      "#DATE": "DATE"
    },
    "ExpressionAttributeValues": {
      ":user_id": tenant_id,
      ":date": unixDateSince(240)
    }
  }
  return query_dynamodb(params)
}

exports.retrieve_user_suite_browsing_history = function(tenant_id) {
  const params = {
    "TableName": SUITE_INTERACTIONS,
    "KeyConditionExpression": "#USER_ID = :user_id AND #DATE > :date",
    "IndexName": "By_Global_UserId",
    "ExpressionAttributeNames": {
      "#USER_ID": "USER_ID",
      "#DATE": "DATE"
    },
    "ExpressionAttributeValues": {
      ":user_id": tenant_id,
      ":date": unixDateSince(240)
    }
  }
  return query_dynamodb(params)
}

exports.retrieve_user_preferences_history = function(tenant_id) {
  const params = {
    "TableName": STUDENT_PREFERENCES,
    "KeyConditionExpression": "#USER_ID = :user_id AND #DATE > :date",
    "ExpressionAttributeNames": {
      "#USER_ID": "USER_ID",
      "#DATE": "DATE"
    },
    "ExpressionAttributeValues": {
      ":user_id": tenant_id,
      ":date": unixDateSince(240)
    }
  }
  return query_dynamodb(params)
}

exports.retrieve_user_images_history = function(tenant_id) {
  const params = {
    "TableName": IMAGE_INTERACTIONS,
    "KeyConditionExpression": "#USER_ID = :user_id AND #DATE > :date",
    "ExpressionAttributeNames": {
      "#USER_ID": "USER_ID",
      "#DATE": "DATE"
    },
    "ExpressionAttributeValues": {
      ":user_id": tenant_id,
      ":date": unixDateSince(240)
    }
  }
  return query_dynamodb(params)
}

exports.retrieve_user_amenities_history = function(tenant_id) {
  const params = {
    "TableName": AMENITY_INTERACTIONS,
    "KeyConditionExpression": "#USER_ID = :user_id AND #DATE > :date",
    "ExpressionAttributeNames": {
      "#USER_ID": "USER_ID",
      "#DATE": "DATE"
    },
    "ExpressionAttributeValues": {
      ":user_id": tenant_id,
      ":date": unixDateSince(240)
    }
  }
  return query_dynamodb(params)
}

const unixDateSince = (numDays) => {
  const today = new Date()
  const todayUnix = today.getTime()
  const sinceUnix = todayUnix - (numDays*24*60*60*1000)
  return sinceUnix
}
