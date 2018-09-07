import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {i18n} from 'hub-dashboard-addons/dist/localization';

import Widget from './widget';

const WidgetContainer = connect(
  (state, {dashboardApi}) => ({
    dashboardApi,
    isConfiguring: state.configuration.isConfiguring,
    title: state.configuration.isConfiguring
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
      }

  }))(Widget);

WidgetContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default WidgetContainer;
