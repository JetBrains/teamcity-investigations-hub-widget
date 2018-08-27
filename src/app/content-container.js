import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Content from './content';

import {startConfiguration} from './redux/actions';

const ContentContainer = connect(
  state => ({
    teamcityService: state.teamcityService,
    investigations: state.investigations,
    investigationLoadErrorMessage: state.investigationLoadErrorMessage
  }),
  (dispatch, {dashboardApi}) => ({
    onConfigure: () => dispatch(startConfiguration(dashboardApi))
  })
)(Content);

ContentContainer.propTypes = {
  dashboardApi: PropTypes.object.isRequired
};

export default ContentContainer;
