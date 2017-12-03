const STUDENT_PREFERENCES = require('../dynamodb_tablenames').STUDENT_PREFERENCES


// ====================================

exports.reference_items = [
  {
    // When a user changes their rent_type filter to 'sublet' or 'lease', in <FilterBar> of Tenant_Website
    'TableName': STUDENT_PREFERENCES,
    'Item': {
      'ACTION': 'CHANGED_RENT_TYPE',
      'DATE': new Date().getTime(),
      'RENT_TYPE': `'sublet' || 'lease'`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE'
    }
  }
]
