import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {cancelConfiguration, saveConfiguration} from './redux/actions';

import Configuration from './configuration';

const ConfigurationContainer = connect(
  (state, {dashboardApi}) => ({
    dashboardApi
  }),
  (dispatch, {dashboardApi}) => ({
    onConfigSave: () => dispatch(saveConfiguration(dashboardApi)),
    onConfigCancel: () => dispatch(cancelConfiguration(dashboardApi))
  })
)(Configuration);

ConfigurationContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};


export default ConfigurationContainer;
