import {applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';

import {
  setInitialConfiguration,
  openConfiguration,
  selectColor,
  applyConfiguration,
  closeConfiguration
} from './actions';

export const COLOR_OPTIONS = [
  {key: 'black', label: 'Black'},
  {key: 'red', label: 'Red'},
  {key: 'blue', label: 'Blue'}
];

const reduce = createReducer({
  [setInitialConfiguration]: (state, initialConfiguration) => ({
    ...state,
    configuration: initialConfiguration || {selectedColor: COLOR_OPTIONS[0]}
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
    selectedColor: COLOR_OPTIONS[0]
  }
});

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reduce, composeEnhancers(applyMiddleware(thunkMiddleware)));
};
