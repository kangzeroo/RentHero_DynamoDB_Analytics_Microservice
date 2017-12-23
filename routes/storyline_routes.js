const retrieve_user_building_browsing_history = require('../Storyline/user_browsing_history').retrieve_user_building_browsing_history
const retrieve_user_suite_browsing_history = require('../Storyline/user_browsing_history').retrieve_user_suite_browsing_history
const retrieve_user_preferences_history = require('../Storyline/user_browsing_history').retrieve_user_preferences_history
const retrieve_user_images_history = require('../Storyline/user_browsing_history').retrieve_user_images_history
const retrieve_user_amenities_history = require('../Storyline/user_browsing_history').retrieve_user_amenities_history

// POST /get_user_building_browsing_history
exports.get_user_building_browsing_history = function(req, res, next){
  const tenant_id = req.body.tenant_id
  retrieve_user_building_browsing_history(tenant_id).then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.send(500).send({
      message: 'Failed to retrieve user building browsing history'
    })
  })
}

// POST /get_user_suite_browsing_history
exports.get_user_suite_browsing_history = function(req, res, next){
  const tenant_id = req.body.tenant_id
  retrieve_user_suite_browsing_history(tenant_id).then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.send(500).send({
      message: 'Failed to retrieve user building browsing history'
    })
  })
}

// POST /get_user_preferences_history
exports.get_user_preferences_history = function(req, res, next){
  const tenant_id = req.body.tenant_id
  retrieve_user_preferences_history(tenant_id).then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.send(500).send({
      message: 'Failed to retrieve user building browsing history'
    })
  })
}

// POST /get_user_images_history
exports.get_user_images_history = function(req, res, next){
  const tenant_id = req.body.tenant_id
  retrieve_user_images_history(tenant_id).then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.send(500).send({
      message: 'Failed to retrieve user image browsing history'
    })
  })
}

// POST /get_user_amenities_history
exports.get_user_amenities_history = function(req, res, next){
  const tenant_id = req.body.tenant_id
  retrieve_user_amenities_history(tenant_id).then((data) => {
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.send(500).send({
      message: 'Failed to retrieve user amenity browsing history'
    })
  })
}
