import React from 'react';
import {connect} from 'react-redux';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import {cancelConfiguration, saveConfiguration, updateRefreshPeriod} from './redux/actions';
import ServiceSelect from './service-select';

import ConfigurationForm from './lib/configuration-form/configuration-form';

const ConfigurationContainer = connect(
  state => ({
    refreshPeriod: state.configuration.refreshPeriod,
    saveButtonLabel: i18n('Save'),
    cancelButtonLabel: i18n('Cancel'),
    children: (<ServiceSelect/>)
  }),
  dispatch => ({
    onRefreshPeriodUpdate: newSeconds => dispatch(updateRefreshPeriod(newSeconds)),
    onSave: () => dispatch(saveConfiguration()),
    onCancel: () => dispatch(cancelConfiguration())
  })
)(ConfigurationForm);

ConfigurationContainer.propTypes = {};


export default ConfigurationContainer;
