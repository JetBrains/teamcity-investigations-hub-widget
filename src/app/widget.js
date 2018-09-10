import React from 'react';
import PropTypes from 'prop-types';

import Timer from './lib/timer/timer';

const Widget = (
  {
    isConfiguring,
    refreshPeriod,
    onRefresh,
    Title,
    Configuration,
    Content
  }
) => (
  <div>
    {Title}
    <Timer
      onTick={onRefresh}
      period={refreshPeriod}
    />
    {isConfiguring ? (
      <Configuration/>
    ) : (
      <Content/>
    )}
  </div>
);

Widget.propTypes = {
  isConfiguring: PropTypes.bool.isRequired,
  refreshPeriod: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
  Title: PropTypes.node.isRequired,
  Configuration: PropTypes.func.isRequired,
  Content: PropTypes.func.isRequired
};

export default Widget;
