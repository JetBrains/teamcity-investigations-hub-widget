import {createAction} from 'redux-act';

export const setInitialConfiguration = createAction();
export const openConfiguration = createAction();
export const selectColor = createAction();
export const applyConfiguration = createAction();
export const closeConfiguration = createAction();

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
  const initialConfiguration = await dashboardApi.readConfig();
  return dispatch(setInitialConfiguration(initialConfiguration));
};
