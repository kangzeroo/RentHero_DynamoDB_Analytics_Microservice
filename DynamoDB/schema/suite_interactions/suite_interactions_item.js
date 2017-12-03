const SUITE_INTERACTIONS = require('../dynamodb_tablenames').SUITE_INTERACTIONS

// ====================================

exports.reference_items = [
  {
    // when a user hovers over a <SuiteOverviewRow> in <HomeOverview> on the <BuildingPage> of Tenant_Website
    'TableName': SUITE_INTERACTIONS,
    'Item': {
      'ACTION': 'SUITE_OVERVIEW_HOVER',
      'DATE': new Date().getTime(),
      'SUITE_ID': `suite.suite_id`,
      'SUITE_NAME': `suite.suite_alias`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'BUILDING_ID': `this.props.building.building_id`,
      'BUILDING_NAME': `this.props.building.building_address`,
    }
  },
  {
    // when a user hovers over a <SuiteOverviewRow> in <HomeOverview> on the <BuildingPage> of Tenant_Website
    'TableName': SUITE_INTERACTIONS,
    'Item': {
      'ACTION': 'APPLY_NOW_BUTTON_SUITE',
      'DATE': new Date().getTime(),
      'SUITE_ID': `suite.suite_id`,
      'SUITE_NAME': `suite.suite_alias`,
      'USER_ID': `this.props.tenant_profile.id` || 'NONE',
      'BUILDING_ID': `this.props.building.building_id`,
      'BUILDING_NAME': `this.props.building.building_address`,
    }
  },
  {
    'TableName': SUITE_INTERACTIONS,
    'Item': {
      'ACTION': 'EXPLORE_SUITE_BUTTON_CLICKED',
      'DATE': new Date().getTime(),
      'BUILDING_ID': 'building.building_id',
      'ADDRESS': 'building.building_address',
      'USER_ID': 'this.props.tenant_profile.tenant_id' || 'NONE',
      'SUITE_ID': `suite.suite_id`,
      'SUITE_NAME': `suite.suite_alias`,
    }
  },
]
