import React from 'react';
import PropTypes from 'prop-types';

import Timer from './lib/timer/timer';
import ConfigurableWidget from './lib/configurable-widget/configurable-widget';

const Widget = (
  {
    isConfiguring,
    refreshPeriod,
    onRefresh,
    dashboardApi,
    Title,
    Configuration,
    Content
  }
) => (
  <div>
    <Timer
      onTick={onRefresh}
      period={refreshPeriod}
    />
    <ConfigurableWidget
      isConfiguring={isConfiguring}
      dashboardApi={dashboardApi}
      Title={Title}
      Configuration={Configuration}
      Content={Content}
    />
  </div>
);

Widget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  refreshPeriod: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
  dashboardApi: PropTypes.object.isRequired,
  Title: PropTypes.func.isRequired,
  Configuration: PropTypes.func.isRequired,
  Content: PropTypes.func.isRequired
};

export default Widget;
