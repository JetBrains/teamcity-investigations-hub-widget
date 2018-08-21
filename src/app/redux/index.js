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
  finishedInvestigationsLoading
} from './actions';

const reduce = createReducer({
  [setInitialSettings]: (state, {teamcityService, investigations}) => ({
    ...state,
    teamcityService,
    investigations: investigations || []
  }),
  [openConfiguration]: state => ({
    ...state,
    configuration: {
      ...state.configuration,
      isConfiguring: true,
      selectedTeamcityService: state.teamcityService
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
      teamcityServices: services
    }
  }),
  [selectTeamcityService]: (state, selectedService) => ({
    ...state,
    configuration: {
      ...state.configuration,
      selectedTeamcityService: selectedService
    }
  }),
  [applyConfiguration]: state => ({
    ...state,
    teamcityService: state.configuration.selectedTeamcityService
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
    investigations
  })
}, {
  teamcityService: {},
  investigations: [],
  configuration: {
    isConfiguring: false,
    isLoadingServices: false,
    teamcityServices: [],
    selectedTeamcityService: null
  }
});

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reduce, composeEnhancers(applyMiddleware(thunkMiddleware)));
};
