const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')
const Analytics = require('./routes/analytics_routes')
const Help = require('./routes/help_routes')
const Storyline = require('./routes/storyline_routes')
const Users = require('./routes/user_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
const originCheck = require('./auth/originCheck').originCheck
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	// routes
	app.get('/test', json_encoding, Test.test)

	// tenant website basic stats
	app.post('/building_stats', [json_encoding, originCheck], Analytics.building_stats)

	// karsten API
	app.post('/building_by_alias', [json_encoding], Help.building_by_alias)
	app.post('/query_dynamodb', [json_encoding], Analytics.query_dynamodb)
	app.post('/scan_dynamodb', [json_encoding], Analytics.scan_dynamodb)

	// users
	app.get('/get_all_users', [json_encoding], Users.get_all_users)
	app.post('/get_specific_user', [json_encoding], Users.get_specific_user)

	// landlord website storyline
	app.post('/get_user_building_browsing_history', [json_encoding], Storyline.get_user_building_browsing_history)
}
