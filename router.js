const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')
const Analytics = require('./routes/analytics_routes')
const Help = require('./routes/help_routes')
const Storyline = require('./routes/storyline_routes')
const UserQueries = require('./routes/Postgres_Leasing/Queries/UserQueries')

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

	// landlord website storyline
	app.post('/get_user_building_browsing_history', [json_encoding], Storyline.get_user_building_browsing_history)
	app.post('/get_user_suite_browsing_history', [json_encoding], Storyline.get_user_suite_browsing_history)
	app.post('/get_user_preferences_history', [json_encoding], Storyline.get_user_preferences_history)
	app.post('/get_user_images_history', [json_encoding], Storyline.get_user_images_history)

	// User queries
	app.get('/get_all_users', [json_encoding], UserQueries.get_all_users)
	app.post('/get_specific_user_by_id', [json_encoding], UserQueries.get_specific_user_by_id)
	app.post('/get_specific_user_by_email', [json_encoding], UserQueries.get_specific_user_by_email)
	app.post('/get_specific_user_by_phone', [json_encoding], UserQueries.get_specific_user_by_phone)
	app.post('/get_specific_user_by_first_name', [json_encoding], UserQueries.get_specific_user_by_first_name)
	app.post('/get_specific_user_by_last_name', [json_encoding], UserQueries.get_specific_user_by_last_name)
	app.post('/get_specific_user_by_full_name', [json_encoding], UserQueries.get_specific_user_by_full_name)
}
