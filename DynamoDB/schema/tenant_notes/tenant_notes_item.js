const RENTHERO_NOTES = require('../dynamodb_tablenames').RENTHERO_NOTES


// ====================================

exports.reference_items = [
  {
    'TableName': RENTHERO_NOTES,
    'Item': {
      'TENANT_ID': 'tenant.tenant_id',
      'ALTERNATIVE_ID': 'By TourID, BuildingID...etc',
      'ALTERNATIVE_KEY': 'InquiryID',
      'AUTHOR_ID': 'By author',
      'TOPIC': 'SALE || COMPLAINT || STATUS',
      'DATE': 4575647657567,
      'NOTES': '<p>Would like to check out unit with pet friendly...</p>',
    }
  }
]
