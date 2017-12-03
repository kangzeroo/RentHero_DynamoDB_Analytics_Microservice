const get_building_views = require('../DynamoDB/dynamodb_api').get_building_views

// GET /building_stats
exports.building_stats = function(req, res, next){
  const building_id = req.body.building_id
  get_building_views(building_id).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}
