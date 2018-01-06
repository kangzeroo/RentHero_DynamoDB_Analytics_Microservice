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

exports.get_all_email_matches = (req, res, next) => {
  const get_matches = `SELECT * FROM email_map`

  const return_rows = (rows) => {
    res.json(rows)
  }

  return query(get_matches)
  .then((data) => {
    return stringify_rows(data)
  })
  .then((data) => {
    return json_rows(data)
  })
  .then((data) => {
    return return_rows(data)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send('Failed to get email mappings')
  })
}

exports.get_all_sms_matches = (req, res, next) => {
  const get_matches = `SELECT * FROM sms_map`

  const return_rows = (rows) => {
          res.json(rows)
        }
  return query(get_matches)
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
    console.log(error)
    res.status(500).send('Failed to get sms mappings')
  })
}

exports.delete_sms_match = (req, res, next) => {
  const info = req.body
  const values = [info.id]

  const delete_match = `DELETE FROM sms_map WHERE id = $1`

  query(delete_match, values)
  .then((data) => {
    res.json({
      message: 'successfully deleted'
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send('Could not delete match')
  })
}
