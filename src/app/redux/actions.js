import {createAction} from 'redux-act';

import TeamcityService from '../teamcity/teamcity-service';

export const setInitialSettings = createAction('Set initial settings');
export const openConfiguration = createAction('Open configuration mode');
export const selectTeamcityService = createAction('Select TeamCity service');
export const startedTeamcityServicesLoading =
    createAction('Started loading list of TeamCity services');
export const finishedTeamcityServicesLoading =
    createAction('Finished loading list of TeamCity services');
export const applyConfiguration = createAction('Apply configuration');
export const closeConfiguration = createAction('Close configuration mode');
export const startedInvestigationsLoading =
    createAction('Started loading list of investigations');
export const finishedInvestigationsLoading =
    createAction('Finished loading list of investigations');

export const loadInvestigations = (dashboardApi, teamcityService) => async dispatch => {
  await dispatch(startedInvestigationsLoading());

  const server = new TeamcityService(dashboardApi);
  const investigations = await server.getMyInvestigations(teamcityService);
  await dispatch(finishedInvestigationsLoading(investigations));
};

export const saveConfiguration = dashboardApi => async (dispatch, getState) => {
  const {configuration: {selectedTeamcityService}} = getState();
  await dashboardApi.storeConfig(selectedTeamcityService);
  await dispatch(applyConfiguration());
  await dispatch(closeConfiguration());
  await dispatch(loadInvestigations(dashboardApi, selectedTeamcityService));
};

export const cancelConfiguration = dashboardApi => async dispatch => {
  await dashboardApi.exitConfigMode();
  await dispatch(closeConfiguration());
};

export const initWidget = (dashboardApi, registerWidgetApi) => async dispatch => {
  registerWidgetApi({
    onConfigure: () => dispatch(openConfiguration())
  });
  const teamcityService = await dashboardApi.readConfig();
  await dispatch(setInitialSettings(teamcityService));
  await dispatch(loadInvestigations(dashboardApi, teamcityService));
};

export const loadTeamCityServices = dashboardApi => async dispatch => {
  await dispatch(startedTeamcityServicesLoading());
  const servicesPage = await dashboardApi.fetchHub(
    'api/rest/services', {
      query: {
        query: 'applicationName: TeamCity',
        fields: 'id,name,homeUrl',
        $skip: 0,
        $top: -1
      }
    }
  );
  await dispatch(finishedTeamcityServicesLoading(servicesPage.services || []));
};
