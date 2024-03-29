const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')
const Analytics = require('./routes/analytics_routes')
const Help = require('./routes/help_routes')
const Storyline = require('./routes/storyline_routes')
const Tours = require('./routes/tour_routes')
const UserQueries = require('./routes/Postgres_Leasing/Queries/UserQueries')
const RentheroMessages = require('./routes/renthero_sms_routes')
const MappingQueries = require('./routes/Postgres_Leasing/Queries/MappingQueries')
const InquiryQuery = require('./routes/Postgres_Leasing/Queries/InquiryQuery')
const TourQuery = require('./routes/Postgres_Leasing/Queries/TourQuery')
const DynamoNotes = require('./DynamoDB/dynamodb_chat_thread_api')
// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*', limit: '10mb'})
const originCheck = require('./auth/originCheck').originCheck
const JWT_Check = require('./auth/JWT_Check').JWT_Check
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
	app.post('/get_user_building_browsing_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_building_browsing_history)
	app.post('/get_user_suite_browsing_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_suite_browsing_history)
	app.post('/get_user_preferences_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_preferences_history)
	app.post('/get_user_images_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_images_history)
	app.post('/get_user_amenities_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_amenities_history)
	app.post('/get_user_chat_history', [json_encoding, JWT_Check, originCheck], Storyline.get_user_chat_history)
	app.post('/get_recent_notes', [json_encoding], DynamoNotes.get_recent_notes)

	// User queries
	app.get('/get_all_users', [json_encoding, JWT_Check, originCheck], UserQueries.get_all_users)
	app.post('/get_specific_user_by_id', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_id)
	app.post('/get_specific_user_by_email', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_email)
	app.post('/get_specific_user_by_phone', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_phone)
	app.post('/get_specific_user_by_first_name', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_first_name)
	app.post('/get_specific_user_by_last_name', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_last_name)
	app.post('/get_specific_user_by_full_name', [json_encoding, JWT_Check, originCheck], UserQueries.get_specific_user_by_full_name)

	// chat thread for tours
	app.post('/get_chat_thread', [json_encoding, JWT_Check, originCheck], Tours.get_chat_thread)
  app.post('/clear_relevant_hints', [json_encoding, JWT_Check, originCheck], Tours.clear_relevant_hints)

	// message thread for renthero
	app.post('/get_all_renthero_sms', [json_encoding, JWT_Check, originCheck], RentheroMessages.get_all_renthero_sms)
	app.post('/query_renthero_messages', [json_encoding], RentheroMessages.query_renthero_messages)

	// SMS mappings
	app.post('/landlord_get_all_sms_matches', [json_encoding, JWT_Check, originCheck], MappingQueries.get_all_sms_matches)
	app.post('/landlord_get_all_email_matches', [json_encoding, JWT_Check, originCheck], MappingQueries.get_all_email_matches)
	app.post('/landlord_delete_sms_match', [json_encoding, JWT_Check, originCheck], MappingQueries.delete_sms_match)

	// Inquiry Routes
	app.post('/delete_tenant_inquiry_by_id', [json_encoding, JWT_Check, originCheck], InquiryQuery.delete_tenant_inquiry_by_id)

	// Tour Routes
	app.post('/delete_tour_by_id', [json_encoding, JWT_Check, originCheck], TourQuery.delete_tour_by_id)
}
