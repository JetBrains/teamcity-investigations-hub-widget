import React from 'react';
import PropTypes from 'prop-types';

import ContentContainer from './content-container';
import ConfigurationContainer from './configuration-container';
import WidgetTitle from './lib/widget-title/widget-title';

const Widget = (
  {
    isConfiguring,
    title,
    dashboardApi
  }) =>
  (
    <div>
      <WidgetTitle {...title} dashboardApi={dashboardApi}/>
      {isConfiguring ? (
        <ConfigurationContainer/>
      ) : (
        <ContentContainer/>
      )}
    </div>
  );

Widget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    title: PropTypes.string.isRequired,
    counter: PropTypes.number,
    href: PropTypes.string
  }).isRequired,
  dashboardApi: PropTypes.object.isRequired
};

export default Widget;
