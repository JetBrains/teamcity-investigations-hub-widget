import React from 'react';
import PropTypes from 'prop-types';

import ContentContainer from './content-container';
import ConfigurationContainer from './configuration-container';

const Widget = ({isConfiguring}) => {
  if (isConfiguring) {
    return (
      <ConfigurationContainer/>
    );
  } else {
    return (
      <ContentContainer/>
    );
  }
};

Widget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired
};

export default Widget;
