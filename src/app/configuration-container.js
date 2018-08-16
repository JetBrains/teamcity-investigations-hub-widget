import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {COLOR_OPTIONS} from './redux/index';

import {
  selectColor,
  cancelConfiguration,
  saveConfiguration
} from './redux/actions';

import Configuration from './configuration1';

const ConfigurationContainer = connect(
  state => ({
    colorOptions: COLOR_OPTIONS,
    selectedColor: state.editedConfiguration.selectedColor
  }),
  (dispatch, {dashboardApi}) => ({
    onColorChange: selectedColor => dispatch(selectColor(selectedColor)),
    onConfigSave: () => dispatch(saveConfiguration(dashboardApi)),
    onConfigCancel: () => dispatch(cancelConfiguration(dashboardApi))
  })
)(Configuration);

ConfigurationContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};


export default ConfigurationContainer;
