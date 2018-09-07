import React from 'react';
import PropTypes from 'prop-types';

import WidgetTitle from './lib/widget-title/widget-title';
import Timer from './lib/timer/timer';

import ContentContainer from './content-container';
import ConfigurationContainer from './configuration-container';

const Widget = (
  {
    isConfiguring,
    title,
    refreshPeriod,
    onRefresh,
    dashboardApi
  }
) => (
  <div>
    <WidgetTitle {...title} dashboardApi={dashboardApi}/>
    <Timer onTick={onRefresh} period={refreshPeriod}/>
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
  refreshPeriod: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
  dashboardApi: PropTypes.object.isRequired
};

export default Widget;
