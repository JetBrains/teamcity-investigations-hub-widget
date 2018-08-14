import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ContentContainer from './ContentContainer';
import ConfigurationContainer from './ConfigurationContainer';

const Widget = ({dashboardApi, isConfiguring}) => {
  if (isConfiguring) {
    return (
      <ConfigurationContainer dashboardApi={dashboardApi}/>
    );
  } else {
    return (
      <ContentContainer/>
    );
  }
};

Widget.propTypes = {
  dashboardApi: PropTypes.object.isRequired,
  isConfiguring: PropTypes.bool.isRequired
};

export default Widget;
