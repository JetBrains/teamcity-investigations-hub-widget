import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import RefreshPeriod from './refresh-period';
import {updateRefreshPeriod} from './redux/actions';

const RefreshPeriodContainer = connect(
  state => ({
    seconds: state.configuration.refreshPeriod
  }),
  dispatch => ({
    onChange: newSeconds => dispatch(updateRefreshPeriod(newSeconds))
  })
)(RefreshPeriod);

RefreshPeriodContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default RefreshPeriodContainer;
