import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createAction, createReducer} from 'redux-act';

export const COLOR_OPTIONS = [
  {key: 'black', label: 'Black'},
  {key: 'red', label: 'Red'},
  {key: 'blue', label: 'Blue'}
];

export const setInitialConfiguration = createAction();
export const openConfiguration = createAction();
export const selectColor = createAction();
export const applyConfiguration = createAction();
export const closeConfiguration = createAction();

export const saveConfiguration = dashboardApi => {
  return async (dispatch, getState) => {
    const {editedConfiguration} = getState();
    await dashboardApi.storeConfig(editedConfiguration);
    await dispatch(applyConfiguration());
    await dispatch(closeConfiguration());
  };
};

export const cancelConfiguration = dashboardApi => {
  return async dispatch => {
    await dashboardApi.exitConfigMode();
    await dispatch(closeConfiguration());
  };
};

export const initWidget = (dashboardApi, registerWidgetApi) => {
  return async dispatch => {
    registerWidgetApi({
      onConfigure: () => dispatch(openConfiguration())
    });
    const initialConfiguration = (await dashboardApi.readConfig())
      || {selectedColor: COLOR_OPTIONS[0]};
    return dispatch(setInitialConfiguration(initialConfiguration));
  };
};

const reducer = createReducer({
  [setInitialConfiguration]: (state, initialConfiguration) => ({
    ...state,
    configuration: initialConfiguration
  }),
  [openConfiguration]: state => ({
    ...state,
    editedConfiguration: {...state.configuration}
  }),
  [selectColor]: (state, selectedColor) => ({
    ...state,
    editedConfiguration: {
      ...state.editedConfiguration,
      selectedColor
    }
  }),
  [applyConfiguration]: state => ({
    ...state,
    configuration: {...state.editedConfiguration}
  }),
  [closeConfiguration]: state => ({
    ...state,
    editedConfiguration: null
  })
}, {
  editedConfiguration: null,
  configuration: {
    selectedColor: COLOR_OPTIONS[0],
  }
});

export default () => applyMiddleware(thunkMiddleware)(createStore)(reducer);
