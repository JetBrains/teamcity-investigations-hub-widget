import {createAction} from 'redux-act';

import TeamcityService from '../teamcity/teamcity-service';
import numberToSuperDigits from '../number-to-super-digits';

export const setInitialSettings = createAction('Set initial settings');
export const openConfiguration = createAction('Open configuration mode');
export const selectTeamcityService = createAction('Select TeamCity service');
export const updateRefreshPeriod = createAction('Update refresh period');
export const startedTeamcityServicesLoading =
  createAction('Started loading list of TeamCity services');
export const finishedTeamcityServicesLoading =
  createAction('Finished loading list of TeamCity services');
export const failedTeamcityServicesLoading =
  createAction('Failed to load list of TeamCity services');
export const applyConfiguration = createAction('Apply configuration');
export const closeConfiguration = createAction('Close configuration mode');
export const startedInvestigationsLoading =
  createAction('Started loading list of investigations');
export const finishedInvestigationsLoading =
  createAction('Finished loading list of investigations');
export const failedInvestigationsLoading =
  createAction('Failed to load list of investigations');
export const setRefreshHandler = createAction('Set refresh handler');
export const clearRefreshHandler = createAction('Clear refresh handler');

async function setWidgetTitle(dashboardApi, count) {
  await dashboardApi.setTitle(`TeamCity Investigations ${numberToSuperDigits(count)}`);
}

export const reloadInvestigations = dashboardApi => async (dispatch, getState) => {
  const {teamcityService} = getState();
  if (teamcityService) {
    await dispatch(startedInvestigationsLoading());

    dashboardApi.setLoadingAnimationEnabled(true);
    const server = new TeamcityService(dashboardApi);
    try {
      const investigations = await server.getMyInvestigations(teamcityService);
      await setWidgetTitle(dashboardApi, investigations.count);
      await dashboardApi.storeCache(investigations);
      await dispatch(finishedInvestigationsLoading(investigations.data));
    } catch (e) {
      const error = (e.data && e.data.message) || e.message || e.toString();
      await dispatch(failedInvestigationsLoading(error));
    }
    dashboardApi.setLoadingAnimationEnabled(false);
  }
};

export const setupRefresh = dashboardApi => async (dispatch, getState) => {
  const {refreshPeriod, refreshHandler} = getState();
  if (refreshHandler) {
    clearTimeout(refreshHandler);
  }

  const task = async () => {
    await dispatch(clearRefreshHandler());
    await dispatch(reloadInvestigations(dashboardApi));
    // eslint-disable-next-line no-magic-numbers
    const newRefreshHandler = setTimeout(task, refreshPeriod * 1000);
    await dispatch(setRefreshHandler(newRefreshHandler));
  };
  await task();
};

export const loadTeamCityServices = dashboardApi => async dispatch => {
  await dispatch(startedTeamcityServicesLoading());
  try {
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
  } catch (e) {
    const error = (e.data && e.data.message) || e.message || e.toString();
    const message = `Cannot load list of TeamCity services: ${error}`;
    await dispatch(failedTeamcityServicesLoading(message));
  }
};

export const startConfiguration = dashboardApi => async dispatch => {
  await dashboardApi.enterConfigMode();
  await dispatch(openConfiguration());
  await dispatch(loadTeamCityServices(dashboardApi));
};

export const saveConfiguration = dashboardApi => async (dispatch, getState) => {
  const {configuration: {selectedTeamcityService, refreshPeriod}} = getState();
  await dashboardApi.storeConfig({
    teamcityService: selectedTeamcityService,
    refreshPeriod
  });
  await dispatch(applyConfiguration());
  await dispatch(closeConfiguration());
  await dispatch(setupRefresh(dashboardApi));
};

export const cancelConfiguration = dashboardApi => async dispatch => {
  await dashboardApi.exitConfigMode();
  await dispatch(closeConfiguration());
};

export const initWidget = (dashboardApi, registerWidgetApi) => async dispatch => {
  registerWidgetApi({
    onConfigure: () => dispatch(openConfiguration()),
    onRefresh: () => dispatch(reloadInvestigations(dashboardApi))
  });
  const config = await dashboardApi.readConfig();
  const {teamcityService, refreshPeriod} = config || {};
  const {result: {data: investigations, count}} = (await dashboardApi.readCache()) || {result: {}};
  await dispatch(setInitialSettings({
    teamcityService,
    refreshPeriod,
    investigations
  }));
  await setWidgetTitle(dashboardApi, count);
  await dispatch(setupRefresh(dashboardApi));
  if (!config) {
    await dispatch(startConfiguration(dashboardApi));
  }
};
