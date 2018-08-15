import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import Widget from './Widget';

const WidgetContainer = connect(
  (state, {dashboardApi}) => ({
    dashboardApi,
    isConfiguring: state.editedConfiguration != null
  }))(Widget);

WidgetContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default WidgetContainer;
