const AWS = require('aws-sdk')
const aws_config = require('../../../credentials/aws_config')
AWS.config.update(aws_config)


const studentPreferencesTableParams = {
    TableName : "Student_Preferences_Intel",
    KeySchema: [
        // USE CASE: ALLOWS ME TO SEE ALL USER PREFERENCES INTEL IN CHRONOLOGICAL ORDER. EG: USER LOOKS FOR ENSUITE FIRST BEFORE CHANGING THEIR FILTERS TO LOOK FOR LESS ROOMATES NO ENSUITE
        { AttributeName: "USER_ID", KeyType: "HASH" },  //Partition key
        { AttributeName: "DATE", KeyType: "RANGE" },  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "USER_ID", AttributeType: "S" },
        { AttributeName: "DATE", AttributeType: "N" },
        { AttributeName: "ACTION", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 5,
    },
    LocalSecondaryIndexes: [
      {
        // USE CASE: ALLOWS ME TO SHOW ALL USER PREFERENCES INTEL GROUPED BY ACTION. EG: I CAN SHOW THE TRENDS OF A USER ADJUSTING THEIR RENT PRICE THROUGHOUT THEIR 4 YEARS IN UNIVERSITY
        IndexName: 'By_Local_Action', /* required */
        KeySchema: [ /* required */
          {
            AttributeName: 'USER_ID', /* required */
            KeyType: 'HASH' /* required */
          },
          {
            AttributeName: 'ACTION', /* required */
            KeyType: 'RANGE' /* required */
          }
          /* more items */
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        }
      },
      /* more items */
    ],
    GlobalSecondaryIndexes: [
      {
        // USE CASE: ALLOWS ME TO SEE ALL INTEL OF A SPECIFIC ACTION, GROUPED BY USERS. EG: SHOW ME ALL PRICE ADJUSTMENTS, AND NOW I CAN GROUP USER POPULATIONS INTO PRICE RANGES.
        IndexName: 'By_Global_Action', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'ACTION', KeyType: 'HASH'},
          {AttributeName: 'USER_ID', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 1, /* required */
          WriteCapacityUnits: 5 /* required */
        }
      }
    ]
}

exports.createTables = function(){

  console.log("==> About to create DynamoDB tables!")

  const dynamodb = new AWS.DynamoDB({
    dynamodb: '2012-08-10',
    region: "us-east-1"
  })

  dynamodb.createTable(studentPreferencesTableParams, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  })
}
