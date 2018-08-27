import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';

import {
  applyConfiguration,
  closeConfiguration,
  startedTeamcityServicesLoading,
  finishedTeamcityServicesLoading,
  openConfiguration,
  selectTeamcityService,
  setInitialSettings,
  startedInvestigationsLoading,
  finishedInvestigationsLoading,
  updateRefreshPeriod,
  setRefreshHandler,
  clearRefreshHandler,
  failedTeamcityServicesLoading,
  failedInvestigationsLoading
} from './actions';

// eslint-disable-next-line no-magic-numbers
const DEFAULT_PERIOD = 300;

const reduce = createReducer({
  [setInitialSettings]: (state, {teamcityService, refreshPeriod, investigations}) => ({
    ...state,
    teamcityService,
    refreshPeriod: refreshPeriod || DEFAULT_PERIOD,
    investigations: investigations || []
  }),
  [openConfiguration]: state => ({
    ...state,
    configuration: {
      ...state.configuration,
      isConfiguring: true,
      selectedTeamcityService: state.teamcityService,
      refreshPeriod: state.refreshPeriod
    }
  }),
  [startedTeamcityServicesLoading]: state => ({
    ...state,
    configuration: {
      ...state.configuration,
      isLoadingServices: true
    }
  }),
  [finishedTeamcityServicesLoading]: (state, services) => ({
    ...state,
    configuration: {
      ...state.configuration,
      isLoadingServices: false,
      teamcityServices: services,
      serviceLoadErrorMessage: null,
      selectedTeamcityService: state.selectedTeamcityService || services[0]
    }
  }),
  [failedTeamcityServicesLoading]: (state, serviceLoadErrorMessage) => ({
    ...state,
    configuration: {
      ...state.configuration,
      isLoadingServices: false,
      teamcityServices: [],
      serviceLoadErrorMessage
    }
  }),
  [selectTeamcityService]: (state, selectedService) => ({
    ...state,
    configuration: {
      ...state.configuration,
      selectedTeamcityService: selectedService
    }
  }),
  [updateRefreshPeriod]: (state, refreshPeriod) => ({
    ...state,
    configuration: {
      ...state.configuration,
      refreshPeriod
    }
  }),
  [applyConfiguration]: state => ({
    ...state,
    teamcityService: state.configuration.selectedTeamcityService,
    refreshPeriod: state.configuration.refreshPeriod
  }),
  [closeConfiguration]: state => ({
    ...state,
    configuration: {
      ...state.configuration,
      isConfiguring: false
    }
  }),
  [startedInvestigationsLoading]: state => state,
  [finishedInvestigationsLoading]: (state, investigations) => ({
    ...state,
    investigations,
    investigationLoadErrorMessage: null
  }),
  [failedInvestigationsLoading]: (state, investigationLoadErrorMessage) => ({
    ...state,
    investigations: [],
    investigationLoadErrorMessage
  }),
  [setRefreshHandler]: (state, refreshHandler) => ({
    ...state,
    refreshHandler
  }),
  [clearRefreshHandler]: state => ({
    ...state,
    refreshHandler: null
  })
}, {
  teamcityService: {},
  investigations: [],
  investigationLoadErrorMessage: null,
  refreshPeriod: DEFAULT_PERIOD,
  refreshHandler: null,
  configuration: {
    isConfiguring: false,
    isLoadingServices: false,
    teamcityServices: [],
    serviceLoadErrorMessage: null,
    selectedTeamcityService: null,
    refreshPeriod: null
  }
});

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reduce, composeEnhancers(applyMiddleware(thunkMiddleware)));
};
