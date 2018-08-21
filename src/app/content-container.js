import {connect} from 'react-redux';

import Content from './content';

import {openConfiguration} from './redux/actions';

const ContentContainer = connect(
  state => ({
    teamcityService: state.teamcityService,
    investigations: state.investigations,
    isLoadingInvestigations: state.isLoadingInvestigations
  }),
  dispatch => ({
    onConfigure: () => dispatch(openConfiguration())
  })
)(Content);

ContentContainer.propTypes = {};

export default ContentContainer;
