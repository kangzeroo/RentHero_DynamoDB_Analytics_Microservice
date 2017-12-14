const Promise = require('bluebird')
const { promisify } = Promise
const pool = require('../db_connect')
const uuid = require('uuid')

// to run a query we just pass it to the pool
// after we're done nothing has to be taken care of
// we don't have to return any client to the pool or close a connection

const query = promisify(pool.query)

// stringify_rows: Convert each row into a string
const stringify_rows = res => res.rows.map(row => JSON.stringify(row))

const json_rows = res => res.map(row => JSON.parse(row))

//log_through: log each row
const log_through = data => {
  // console.log(data)
  return data
}

exports.get_all_users = function(req, res, next){

  const get_all_users = `SELECT * FROM tenant`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_all_users)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get Users')
  })
}

// POST /get_specific_user
exports.get_specific_user_by_id = function(req, res, next){
  const info = req.body
  const values = [info.tenant_id]

  const get_user = `SELECT * FROM tenant WHERE tenant_id = $1`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}

exports.get_specific_user_by_email = function(req, res, next){
  const info = req.body
  const values = [info.email]

  const get_user = `SELECT * FROM tenant WHERE email = $1`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}

exports.get_specific_user_by_phone = function(req, res, next){
  const info = req.body
  const values = [info.phone]

  const get_user = `SELECT * FROM tenant WHERE phone = $1`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}

exports.get_specific_user_by_first_name = function(req, res, next){
  const info = req.body
  const values = [info.first_name.toLowerCase()]

  const get_user = `SELECT * FROM tenant WHERE LOWER(first_name) = $1`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}

exports.get_specific_user_by_last_name = function(req, res, next){
  const info = req.body
  const values = [info.last_name.toLowerCase()]

  const get_user = `SELECT * FROM tenant WHERE LOWER(last_name) = $1`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}

exports.get_specific_user_by_full_name = function(req, res, next){
  const info = req.body
  const values = [info.first_name.toLowerCase(), info.last_name.toLowerCase()]

  const get_user = `SELECT * FROM tenant WHERE LOWER(first_name) = $1 AND LOWER(last_name) = $2`

  const return_rows = (rows) => {
    res.json(rows)
  }

  query(get_user, values)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((error) => {
      res.status(500).send('Failed to get User')
  })
}
