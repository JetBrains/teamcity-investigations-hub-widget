import {connect} from 'react-redux';

import {cancelConfiguration, saveConfiguration, updateRefreshPeriod} from './redux/actions';

import Configuration from './configuration';

const ConfigurationContainer = connect(
  state => ({
    refreshPeriod: state.configuration.refreshPeriod
  }),
  dispatch => ({
    onRefreshPeriodUpdate: newSeconds => dispatch(updateRefreshPeriod(newSeconds)),
    onConfigSave: () => dispatch(saveConfiguration()),
    onConfigCancel: () => dispatch(cancelConfiguration())
  })
)(Configuration);

ConfigurationContainer.propTypes = {};


export default ConfigurationContainer;
