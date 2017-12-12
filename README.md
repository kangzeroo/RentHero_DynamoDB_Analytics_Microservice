# Rentburrow Analytics
Use this for querying Rentburrow's NoSQL database hosted on AWS DynamoDB.

## To look at the table structures, check out:
/DynamoDB/schema/building_interactions/building_interactions_table.js

## To look at the possible database entries for that table, check out:
/DynamoDB/schema/building_interactions/building_interactions_item.js

## To look at all the different tables, check out:
/DynamoDB/schema/dynamodb_tablenames.js

# How to query?
To query, you must send a POST request to a specific endpoint. All you need to provide is a JSON object that specifies exactly what you are looking for. See the bottom of this README to understand the syntax.

## To query directly through DynamoDB:
Send a POST request to the endpoint `https://rentburrow.com:3007/query_dynamodb` <br />
with datatype as `application/json` and a JSON body complying with the syntax required by AWS <br />
See here for official AWS documentation: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property <br />
See here to see how we implemented it: /DynamoDB/dynamodb_api.js line 17 (params) * Note that our syntax is slightly different from official AWS as ours is a simplified version that we recommend

## To scan directly through DynamoDB:
Send a POST request to the endpoint `https://rentburrow.com:3007/scan_dynamodb` <br />
with datatype as `application/json` and a JSON body complying with the syntax required by AWS <br />
See here for official AWS documentation: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property <br />
See here to see how we implemented it: /DynamoDB/dynamodb_api.js line 17 (params) * Note that it is not exactly a scan, but follows this same similar syntax

### What is the difference between query and scan?
Query is to directly search a database by the primary key (aka main index), and scan is to search a database without using the primary key. Scan is good for when you want to search just anything matching a condition, searching through the entire database. Whereas Query is good for when you want to specifically search based on the primary key (which is faster since you dont need to go through the entire database, only those entries matching the primary key). The benefits of a scan are imitated when you add extra database indexes to query on.

### What is a database index?
A database index is an entire copy of the database, with different primary keys. For example, a database is originally indexed with a primary key of 'BUILDING_ID' so that we can generate a report about a building. If we wanted to instead generate a report about a user's interactions with a building, then we cannot query using the primary key of 'BUILDING_ID'. We would instead need to have a database index with the 'USER_ID' as the primary key.

# Explain to me the JSON object syntax?
Params is the JSON object that you must provide in order to query the database. The syntax looks like this:

Example Query JSON: <br />
`{
	"params": {
      "TableName": "Building_Interactions_Intel",
      "KeyConditionExpression": "#BUILDING_ID = :building_id",
      "IndexName": "By_Local_UserId",
      "ExpressionAttributeNames": {
        "#BUILDING_ID": "BUILDING_ID"
      },
      "ExpressionAttributeValues": {
        ":building_id": "350ee1fa-094b-421c-bf2e-e25e65cb0323"
      }
    }
}`

- TableName --> The name of the DynamoDB table (check out /DynamoDB/schema/dynamodb_tablenames.js)
- FilterExpression --> Optional additional filter conditions
- KeyConditionExpression --> Matching the primary key
- IndexName --> Optional index that you want to query on
- ExpressionAttributeNames --> Mapping the column name alias to actual text
- ExpressionAttributeValues --> Mapping the alias to actual text

Example Scan JSON: <br />
`{
	"params": {
      "TableName": "Building_Interactions_Intel",
      "FilterExpression": "#ACTION = :action1 AND #DATE > :date",
      "ExpressionAttributeNames": {
        "#ACTION": "ACTION",
        "#DATE": "DATE"
      },
      "ExpressionAttributeValues": {
        ":action1": "BUILDING_PAGE_LOADED",
        ":date": 1512940693
      }
    }
}`

- TableName --> The name of the DynamoDB table (check out /DynamoDB/schema/dynamodb_tablenames.js)
- FilterExpression --> Whatever filter condition you want
- IndexName --> Optional index that you want to query on
- ExpressionAttributeNames --> Mapping the column name alias to actual text
- ExpressionAttributeValues --> Mapping the alias to actual text
