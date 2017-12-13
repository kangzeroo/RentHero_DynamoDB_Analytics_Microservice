const get_building_views = require('../DynamoDB/dynamodb_api').get_building_views
const query_dynamodb = require('../DynamoDB/general_queryable').query_dynamodb
const scan_dynamodb = require('../DynamoDB/general_queryable').scan_dynamodb

// POST /building_stats
exports.building_stats = function(req, res, next){
  const building_id = req.body.building_id
  get_building_views(building_id).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}

// POST /building_stats
exports.query_dynamodb = function(req, res, next){
  const params = req.body.params
  query_dynamodb(params).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}

// POST /building_stats
exports.scan_dynamodb = function(req, res, next){
  const params = req.body.params
  scan_dynamodb(params).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}
