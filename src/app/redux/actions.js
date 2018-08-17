import {createAction} from 'redux-act';

export const setInitialSettings = createAction('Set initial settings');
export const openConfiguration = createAction('Open configuration mode');
export const selectTeamcityService = createAction('Select TeamCity service');
export const startedTeamcityServicesLoading =
    createAction('Started loading list of TeamCity services');
export const finishedTeamcityServicesLoading =
    createAction('Finished loading list of TeamCity services');
export const applyConfiguration = createAction('Apply configuration');
export const closeConfiguration = createAction('Close configuration mode');

export const saveConfiguration = dashboardApi => async (dispatch, getState) => {
  const {editedConfiguration} = getState();
  await dashboardApi.storeConfig(editedConfiguration);
  await dispatch(applyConfiguration());
  await dispatch(closeConfiguration());
};

export const cancelConfiguration = dashboardApi => async dispatch => {
  await dashboardApi.exitConfigMode();
  await dispatch(closeConfiguration());
};

export const initWidget = (dashboardApi, registerWidgetApi) => async dispatch => {
  registerWidgetApi({
    onConfigure: () => dispatch(openConfiguration())
  });
  const initialSettings = await dashboardApi.readConfig();
  return dispatch(setInitialSettings(initialSettings));
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
