import {connect} from 'react-redux';

import Widget from './widget';

const WidgetContainer = connect(
  state => ({
    isConfiguring: state.configuration.isConfiguring
  }))(Widget);

WidgetContainer.propTypes = {};

export default WidgetContainer;
