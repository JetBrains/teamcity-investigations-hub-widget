import Select from '@jetbrains/ring-ui/components/select/select';
import {MinWidth} from '@jetbrains/ring-ui/components/popup/position';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import {connect} from 'react-redux';

import {selectTeamcityService} from './redux/actions';

const service2item = service => service && {
  key: service.id,
  label: service.name,
  description: service.homeUrl,
  service
};

const ServiceSelect = connect(
  state => ({
    label: i18n('Select service'),
    multiple: false,
    loading: state.configuration.isLoadingServices,
    filter: true,
    selected: service2item(state.configuration.selectedTeamcityService),
    size: Select.Size.FULL,
    minWidth: MinWidth.TARGET,
    data: state.configuration.teamcityServices.map(service2item),
    notFoundMessage: state.configuration.serviceLoadErrorMessage
  }),
  dispatch => ({
    onSelect: selectedItem => dispatch(selectTeamcityService(selectedItem.service))
  })
)(Select);

ServiceSelect.propTypes = {};

export default ServiceSelect;
