import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import WidgetTitle from './lib/widget-title/widget-title';

const WidgetTitleContainer = connect(
  (state, {dashboardApi}) => (state.configuration.isConfiguring
    ? {
      title: i18n('TeamCity Investigations'),
      counter: -1,
      href: null,
      dashboardApi
    }
    : {
      title: i18n('TeamCity Investigations'),
      counter: state.investigationsCount,
      href: state.teamcityService &&
        state.teamcityService.homeUrl &&
        `${state.teamcityService.homeUrl}/investigations.html`,
      dashboardApi
    })
)(WidgetTitle);

WidgetTitleContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default WidgetTitleContainer;
