import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import ConfigurationMode from './configuration-mode';


class ConfigurableWidget extends PureComponent {

  static propTypes = {
    isConfiguring: PropTypes.bool.isRequired,
    dashboardApi: PropTypes.object.isRequired,
    // React component
    Title: PropTypes.func,
    // React component
    Configuration: PropTypes.func.isRequired,
    // React component
    Content: PropTypes.func.isRequired
  };

  render() {
    const {isConfiguring, Title, Configuration, Content, dashboardApi} = this.props;

    return (
      <div>
        <ConfigurationMode
          isConfiguring={isConfiguring}
          dashboardApi={dashboardApi}
        />
        {<Title dashboardApi={dashboardApi}/>}
        {isConfiguring ? (
          <Configuration/>
        ) : (
          <Content/>
        )}
      </div>
    );
  }
}

export default ConfigurableWidget;
