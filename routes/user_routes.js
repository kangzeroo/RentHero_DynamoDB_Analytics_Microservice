
// GET /get_all_users
exports.get_all_users = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}

// POST /get_specific_user
exports.get_specific_user = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}
