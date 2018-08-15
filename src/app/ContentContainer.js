import {connect} from 'react-redux';

import Content from './Content';

const ContentContainer = connect(
  state => ({
    selectedColor: state.configuration.selectedColor
  }))(Content);

ContentContainer.propTypes = {};

export default ContentContainer;
