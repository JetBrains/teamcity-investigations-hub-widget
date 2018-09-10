import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {i18n} from 'hub-dashboard-addons/dist/localization';

import ConfigurationForm from './lib/configuration-form/configuration-form';
import ServiceSelect from './lib/service-select/service-select';

import {
  cancelConfiguration,
  saveConfiguration,
  selectTeamcityService,
  updateRefreshPeriod
} from './redux/actions';


const Configuration = (
  {
    refreshPeriod,
    onRefreshPeriodUpdate,

    isLoadingServices,
    selectedService,
    serviceList,
    serviceNotFoundMessage,
    onServiceSelect,

    onSave,
    onCancel
  }
) => (
  <ConfigurationForm
    refreshPeriod={refreshPeriod}
    onRefreshPeriodUpdate={onRefreshPeriodUpdate}

    saveButtonLabel={i18n('Save')}
    onSave={onSave}

    cancelButtonLabel={i18n('Cancel')}
    onCancel={onCancel}
  >
    <ServiceSelect
      isLoading={isLoadingServices}
      placeholder={i18n('Select service')}
      selectedService={selectedService}
      serviceList={serviceList}
      loadError={serviceNotFoundMessage}
      onServiceSelect={onServiceSelect}
    />
  </ConfigurationForm>
);

Configuration.propTypes = {
  refreshPeriod: PropTypes.number.isRequired,
  onRefreshPeriodUpdate: PropTypes.func.isRequired,
  isLoadingServices: PropTypes.bool.isRequired,
  selectedService: PropTypes.object,
  serviceList: PropTypes.array,
  serviceNotFoundMessage: PropTypes.string,
  onServiceSelect: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const ConfigurationContainer = connect(
  state => ({
    refreshPeriod: state.configuration.refreshPeriod,
    isLoadingServices: state.configuration.isLoadingServices,
    selectedService: state.configuration.selectedTeamcityService,
    serviceList: state.configuration.teamcityServices,
    serviceNotFoundMessage: state.configuration.serviceLoadErrorMessage
  }),
  dispatch => ({
    onRefreshPeriodUpdate: newSeconds => dispatch(updateRefreshPeriod(newSeconds)),
    onServiceSelect: selectedItem => dispatch(selectTeamcityService(selectedItem.service)),
    onSave: () => dispatch(saveConfiguration()),
    onCancel: () => dispatch(cancelConfiguration())
  })
)(Configuration);

ConfigurationContainer.propTypes = {};


export default ConfigurationContainer;