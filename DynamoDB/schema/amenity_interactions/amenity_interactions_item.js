const AMENITY_INTERACTIONS = require('../dynamodb_tablenames').AMENITY_INTERACTIONS

// ====================================

exports.reference_items = [
  {
    'TableName': AMENITY_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_AMENITY_CLICKED',
      'DATE': new Date().getTime(),
      'REFERENCE_ID': 'this.props.building.building_id',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'AMENITY': 'am.amenity_alias',
    }
  },
  {
    'TableName': AMENITY_INTERACTIONS,
    'Item': {
      'ACTION': 'SUITE_AMENITY_CLICKED',
      'DATE': new Date().getTime(),
      'REFERENCE_ID': 'this.props.suite.suite_id',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'AMENITY': 'am.amenity_alias',
    }
  },
  {
    'TableName': AMENITY_INTERACTIONS,
    'Item': {
      'ACTION': 'ROOM_AMENITY_CLICKED',
      'DATE': new Date().getTime(),
      'REFERENCE_ID': 'this.props.room.room_id',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'AMENITY': 'am.amenity_alias',
    }
  }
]
