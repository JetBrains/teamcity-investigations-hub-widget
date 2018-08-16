import {connect} from 'react-redux';

import Content from './content1';

const ContentContainer = connect(
  state => ({
    selectedColor: state.configuration.selectedColor
  }))(Content);

ContentContainer.propTypes = {};

export default ContentContainer;
