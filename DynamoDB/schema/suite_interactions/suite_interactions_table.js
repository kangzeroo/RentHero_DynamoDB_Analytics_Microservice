const AWS = require('aws-sdk')
const aws_config = require('../../../credentials/aws_config')
AWS.config.update(aws_config)


const suiteInteractionsTableParams = {
    TableName : "Suite_Interactions_Intel",
    KeySchema: [
        // USE CASE: QUERY ALL INTEL RELATED TO THIS SUITE_ID IN CHRONOLOGICAL ORDER
        { AttributeName: "SUITE_ID", KeyType: "HASH" },  //Partition key
        { AttributeName: "DATE", KeyType: "RANGE" },  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "SUITE_ID", AttributeType: "S" },
        { AttributeName: "BUILDING_ID", AttributeType: "S" },
        { AttributeName: "USER_ID", AttributeType: "S" },
        { AttributeName: "DATE", AttributeType: "N" },
        { AttributeName: "ACTION", AttributeType: "S" },
        { AttributeName: "CORP_ID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 5,
    },
    LocalSecondaryIndexes: [
      {
        // USE CASE: QUERY ALL INTEL RELATED TO THIS SUITE_ID, FROM A CERTAIN USER
        IndexName: 'By_Local_UserId', /* required */
        KeySchema: [ /* required */
          {
            AttributeName: 'SUITE_ID', /* required */
            KeyType: 'HASH' /* required */
          },
          {
            AttributeName: 'USER_ID', /* required */
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
        // USE CASE: GIVE ME ALL SUITE INTEL FROM A SPECIFIC USER. THIS TELLS ME IF A USER HAS A PREFERENCE FOR ENSUITE BATH, BALCONY, 2 BEDROOMS...ETC
        IndexName: 'By_Global_UserId', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'USER_ID', KeyType: 'HASH'},
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
        // USE CASE: GIVE ME ALL SUITE INTEL BY CHRONOLOGICAL ORDER. THIS TELLS ME THE MOST RECENT ACTIVITY BY ALL USERS, RELATED TO SUITES, GROUPED BY ACTION
        IndexName: 'By_Global_DateAction', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'DATE', KeyType: 'HASH'},
          {AttributeName: 'ACTION', KeyType: 'RANGE'}
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
        // USE CASE: GIVE ME ALL SUITE INTEL RELATED TO A BUILDING. THIS LETS ME GIVE LANDLORDS AN ACTIVITY STREAM OF WHAT SUITES PEOPLE ARE LOOKING AT IN A BUILDING
        IndexName: 'By_Global_BuildingId', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'BUILDING_ID', KeyType: 'HASH'},
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
        // USE CASE: GIVE ME ALL SUITE INTEL RELATED TO A CORPORATION. THIS LETS ME GIVE LANDLORDS AN ACTIVITY STREAM OF WHAT SUITES PEOPLE ARE LOOKING AT IN THEIR ENTIRE PORTFOLIO
        IndexName: 'By_Global_CorpId', /* required */
        KeySchema: [ /* required */
          {AttributeName: 'CORP_ID', KeyType: 'HASH'},
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

  dynamodb.createTable(suiteInteractionsTableParams, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  })
}
