import React from 'react';
import PropTypes from 'prop-types';

import WidgetTitle from './lib/widget-title/widget-title';
import Timer from './lib/timer/timer';
import ConfigurationContainer from './configuration-container';
import Content from './content';

const Widget = (
  {
    isConfiguring,
    title,
    refreshPeriod,
    teamcityService,
    investigations,
    investigationLoadErrorMessage,
    onRefresh,
    onConfigure
  }
) => (
  <div>
    <WidgetTitle {...title}/>
    <Timer
      onTick={onRefresh}
      period={refreshPeriod}
    />
    {isConfiguring ? (
      <ConfigurationContainer/>
    ) : (
      <Content
        teamcityService={teamcityService}
        investigations={investigations}
        investigationLoadErrorMessage={investigationLoadErrorMessage}
        onConfigure={onConfigure}
      />
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
  teamcityService: PropTypes.object,
  investigations: PropTypes.array.isRequired,
  investigationLoadErrorMessage: PropTypes.string,
  onConfigure: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default Widget;
