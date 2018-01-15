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


exports.delete_tenant_inquiry_by_id = (req, res, next) => {
  const info = req.body
  const values = [info.inquiry_id]

  const delete_inquiry = `DELETE FROM tenant_inquiries
                           WHERE inquiry_id = $1`

  query(delete_inquiry, values)
  .then((data) => {
    res.json({
      message: 'deleted inquiry'
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send('Inquiry not deleted. Error.')
  })
}
