import React from 'react';
import PropTypes from 'prop-types';

import ContentContainer from './content-container';
import ConfigurationContainer from './configuration-container';
import WidgetTitleContainer from './widget-title-container';

const Widget = ({isConfiguring, dashboardApi}) => (
  <div>
    <WidgetTitleContainer dashboardApi={dashboardApi}/>
    {isConfiguring ? (
      <ConfigurationContainer/>
    ) : (
      <ContentContainer/>
    )}
  </div>
);

Widget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  dashboardApi: PropTypes.object.isRequired
};

export default Widget;
