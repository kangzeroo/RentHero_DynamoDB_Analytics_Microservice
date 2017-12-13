
// GET /get_all_users
exports.get_all_users = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}

// POST /get_specific_user
exports.get_specific_user = function(req, res, next){
  // this should be able to take a user's id, first name, phone or email and return a list of matching
  // req.body = { user_id, user_first_name, user_last_name, user_email, user_phone }
  res.json({
    message: "Test says alive and well"
  })
}
