const Promise = require('bluebird')
const { promisify } = Promise
const pool = require('./Postgres_Leasing/db_connect')
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

// POST /building_by_alias
exports.building_by_alias = function(req, res, next){

    const info = req.body
    const values = [info.building_alias]

    let get_building =  `SELECT a.building_id, a.corporation_id, a.building_alias,
                               a.building_desc, a.building_type, b.building_address,
                               b.gps_x, b.gps_y, b.place_id,
                               c.thumbnail, c.cover_photo, c.istaging_url, c.iguide_url, c.video_url, c.matterport_url,
                               d.imgs,
                               e.label, e.prize,
                               f.min_price, f.max_price,
                               g.min_rooms, g.max_rooms,
                               h.suite_info
                        FROM (SELECT * FROM building WHERE lower(building_alias) = $1) a
                        INNER JOIN
                          (SELECT address_id, CONCAT(street_code, ' ', street_name, ', ', city) AS building_address,
                                  gps_x, gps_y, place_id
                          FROM address) b
                          ON a.address_id = b.address_id
                        INNER JOIN
                          (SELECT building_id, thumbnail, cover_photo, istaging_url, iguide_url, video_url, matterport_url
                             FROM media
                            WHERE building_id IS NOT NULL
                              AND suite_id IS NULL
                              AND room_id IS NULL) c
                          ON a.building_id = c.building_id
                        INNER JOIN
                          (SELECT building_id, array_agg(image_url ORDER BY position) AS imgs
                            FROM images
                            WHERE suite_id IS NULL
                              AND room_id IS NULL
                            GROUP BY building_id
                          ) d
                        ON a.building_id = d.building_id
                        INNER JOIN building_details e ON a.building_id = e.building_id
                        LEFT OUTER JOIN
                          (
                           SELECT building_id, MIN(price) AS min_price, MAX(price) AS max_price
                             FROM room
                            GROUP BY building_id
                          ) f
                        ON a.building_id = f.building_id
                        LEFT OUTER JOIN
                          (SELECT au.building_id, MIN(bu.room_count) AS min_rooms, MAX(bu.room_count) AS max_rooms
                             FROM suite au
                             INNER JOIN
                             (SELECT suite_id, COUNT(*) AS room_count
                                FROM room
                                GROUP BY suite_id) bu
                              ON au.suite_id = bu.suite_id
                              GROUP BY au.building_id) g
                         ON a.building_id = g.building_id
                         LEFT OUTER JOIN
                            (SELECT building_id, json_agg((suite_id, suite_alias)) AS suite_info FROM suite GROUP BY building_id) h
                          ON a.building_id = h.building_id
                        `
    const return_rows = (rows) => {
      res.json(rows)
    }
    query(get_building, values)
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
          res.status(500).send('Failed to get property info')
      })
}
