const TENANT_NOTES = require('../dynamodb_tablenames').TENANT_NOTES


// ====================================

exports.reference_items = [
  {
    'TableName': TENANT_NOTES,
    'Item': {
      'TENANT_ID': 'tenant.tenant_id',
      'ALTERNATIVE_ID': 'By TourID, BuildingID...etc',
      'TOPIC': 'SALE || COMPLAINT || STATUS',
      'DATE': 4575647657567,
      'NOTES': '<p>Would like to check out unit with pet friendly...</p>',
    }
  }
]
