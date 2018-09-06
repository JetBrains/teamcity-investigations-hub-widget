import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Widget from './widget';

const WidgetContainer = connect(
  (state, {dashboardApi}) => ({
    dashboardApi,
    isConfiguring: state.configuration.isConfiguring
  }))(Widget);

WidgetContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default WidgetContainer;
