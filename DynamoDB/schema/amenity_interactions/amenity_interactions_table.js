const AWS = require('aws-sdk')
const aws_config = require('../../../credentials/aws_config')
AWS.config.update(aws_config)


const amenityInteractionsTableParams = {
    TableName : "Amenity_Interactions_Intel",
    KeySchema: [
        // USE CASE: ALLOWS ME TO SHOW ALL INTEL RELATED TO A BUILDING, IN CHRONOLOGICAL ORDER
        { AttributeName: "USER_ID", KeyType: "HASH" },  //Partition key
        { AttributeName: "DATE", KeyType: "RANGE" },  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "AMENITY", AttributeType: "S" },
        { AttributeName: "REFERENCE_ID", AttributeType: "S" },
        { AttributeName: "DATE", AttributeType: "N" },
        { AttributeName: "ACTION", AttributeType: "S" },
        { AttributeName: "USER_ID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 5,
    },
    LocalSecondaryIndexes: [
      {
        // USE CASE: ALLOWS ME TO SHOW ALL INTEL RELATED TO SPECIFIC BUILDING, ORIGINATING FROM A SPECIFIC USER
        IndexName: 'By_Local_Amenity', /* required */
        KeySchema: [ /* required */
          {
            AttributeName: 'USER_ID', /* required */
            KeyType: 'HASH' /* required */
          },
          {
            AttributeName: 'AMENITY', /* required */
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
        // USE CASE: ALLOWS ME TO SEE ALL BUILDING INTEL ORIGINATING FROM A SPECIFIC USER
        IndexName: 'By_Global_ReferenceID', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'REFERENCE_ID', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 1, /* required */
          WriteCapacityUnits: 5 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL BUILDING INTEL IN CHRONOLOGICAL ORDER BY ALL USERS, GROUPED BY ACTION
        IndexName: 'By_Global_Action', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'ACTION', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
        ],
        Projection: { /* required */
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { /* required */
          ReadCapacityUnits: 1, /* required */
          WriteCapacityUnits: 5 /* required */
        }
      },
      {
        // USE CASE: ALLOWS ME TO SEE ALL BUILDING INTEL RELATED TO A CORPORATION, IN CHRONOLOGICAL ORDER. LETS ME GIVE LANDLORDS AN OVERVIEW OF HOW POPULAR THEIR BUILDINGS ARE IN THEIR ENTIRE PORTFOLIO
        IndexName: 'By_Global_CorpId', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'AMENITY', KeyType: 'HASH'},
          {AttributeName: 'DATE', KeyType: 'RANGE'}
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

  dynamodb.createTable(amenityInteractionsTableParams, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  })
}
