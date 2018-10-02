import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {i18n} from 'hub-dashboard-addons/dist/localization';

import Widget from './widget';
import Configuration from './configuration';
import Content from './content';

import {
  cancelConfiguration,
  reloadInvestigations,
  saveConfiguration,
  selectTeamcityService,
  startConfiguration,
  updateRefreshPeriod
} from './redux/actions';

const getPresentationalWidgetTitle = state => ({
  text: i18n('TeamCity Investigations'),
  counter: state.investigationsCount,
  href: state.teamcityService &&
    state.teamcityService.homeUrl &&
    `${state.teamcityService.homeUrl}/investigations.html`
});

const ConfigurationContainer = connect(
  state => ({
    refreshPeriod: state.configuration.refreshPeriod,
    isLoadingServices: state.configuration.isLoadingServices,
    selectedService: state.configuration.selectedTeamcityService,
    serviceList: state.configuration.teamcityServices,
    serviceNotFoundMessage: state.configuration.serviceLoadErrorMessage
  }),
  dispatch => ({
    onRefreshPeriodUpdate: newSeconds => dispatch(updateRefreshPeriod(newSeconds)),
    onServiceSelect: service => dispatch(selectTeamcityService(service)),
    onSave: () => dispatch(saveConfiguration()),
    onCancel: () => dispatch(cancelConfiguration())
  })
)(Configuration);

ConfigurationContainer.propTypes = {};

const ContentContainer = connect(
  state => ({
    isInitializing: state.isInitializing,
    teamcityService: state.teamcityService,
    investigations: state.investigations,
    investigationLoadErrorMessage: state.investigationLoadErrorMessage
  }),
  dispatch => ({
    onConfigure: () => dispatch(startConfiguration(false))
  })
)(Content);

ContentContainer.propTypes = {};

const WidgetContainer = connect(
  (state, {dashboardApi}) => ({
    isConfiguring: state.configuration.isConfiguring,
    isLoadingInvestigations: state.isLoadingInvestigations,
    // eslint-disable-next-line no-magic-numbers
    refreshPeriod: state.refreshPeriod * 1000,
    dashboardApi,
    title: state.configuration.isConfiguring
      ? i18n('TeamCity Investigations')
      : getPresentationalWidgetTitle(state),
    Configuration: ConfigurationContainer,
    Content: ContentContainer
  }),
  dispatch => ({
    onRefresh: () => dispatch(reloadInvestigations())
  })
)(Widget);

WidgetContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default WidgetContainer;
