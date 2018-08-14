import PropTypes from 'prop-types';

import {
  COLOR_OPTIONS,
  selectColor,
  cancelConfiguration,
  saveConfiguration,
} from './ReduxStore';
import {connect} from 'react-redux';
import Configuration from './Configuration';

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
