const IMAGE_INTERACTIONS = require('../dynamodb_tablenames').IMAGE_INTERACTIONS

// ====================================

exports.reference_items = [
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': IMAGE_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_IMAGE_VIEWED',
      'REFERENCE_ID': 'other',
      'DATE': new Date().getTime(),
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'IMAGE_URL': 'url'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': IMAGE_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_COMMON_AREA_PHOTO_VIEWED',
      'REFERENCE_ID': 'other',
      'DATE': new Date().getTime(),
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'IMAGE_URL': 'url'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': IMAGE_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_AMENITY_PHOTO_VIEWED',
      'REFERENCE_ID': 'other',
      'DATE': new Date().getTime(),
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'IMAGE_URL': 'url'
    }
  },
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': IMAGE_INTERACTIONS,
    'Item': {
      'ACTION': 'SUITE_PHOTO_VIEWED',
      'REFERENCE_ID': 'other',
      'DATE': new Date().getTime(),
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'IMAGE_URL': 'url'
    }
  }
]
