const BUILDING_INTERACTIONS = require('../dynamodb_tablenames').BUILDING_INTERACTIONS

// ====================================

exports.reference_items = [
  {
    // When a user hovers over <BuildingCard> in <HousingPanel> of <HousingPage> in Tenant_Website
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_CARD_HOVER',
      'DATE': new Date().getTime(),
      'BUILDING_ID': `building.building_id`,
      'ADDRESS': `building.building_address`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
    }
  },
  {
    // When a user clicks <BuildingCard> or <BuildingPreview> in <HousingPanel> in Tenant_Website
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_CARD_CLICKED',
      'DATE': new Date().getTime(),
      'BUILDING_ID': `building.building_id`,
      'ADDRESS': `building.building_address`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
    }
  },
  {
    // When a user clicks the map pins of a building in <MapComponent> in Tenant_Website
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_PIN_CLICKED',
      'DATE': new Date().getTime(),
      'BUILDING_ID': `building.building_id`,
      'ADDRESS': `building.building_address`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
    }
  },
  {
    // When the <BuildingPage> loads
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_PAGE_LOADED',
      'DATE': new Date().getTime(),
      'BUILDING_ID': `building.building_id`,
      'ADDRESS': `building.building_address`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'EXPLORE_BUILDING_BUTTON_CLICKED',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'APPLY_NOW_BUTTON_BUILDING',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'CALL_LANDLORD_BUTTON',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'SUBMITTED_BUILDING_APPLICATION',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'DATA': 'JSON.stringify(dataObj)'
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'SUBMITTED_PHONE_CALL_BACK_FORM',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'DATA': 'JSON.stringify(dataObj)'
    }
  },
  {
    'TableName': BUILDING_INTERACTIONS,
    'Item': {
      'ACTION': 'BUILDING_CHECK_SUBLETS',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
    }
  },
]
