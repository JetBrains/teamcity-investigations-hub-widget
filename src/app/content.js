import React from 'react';
import PropTypes from 'prop-types';

import Link from '@jetbrains/ring-ui/components/link/link';

import styles from './app.css';

const renderNotConfiguredService = onConfigure => (
  <span>
    {'TeamCity service to get investigations from, it not configuration yet. Please, '}
    <Link
      onClick={onConfigure}
    >{'select the service.'}</Link>
  </span>
);

const Content = ({teamcityService, onConfigure}) => (
  <div className={styles.widget}>
    {teamcityService ? teamcityService.name : renderNotConfiguredService(onConfigure)}
  </div>
);

Content.propTypes = {
  teamcityService: PropTypes.object,
  onConfigure: PropTypes.func.isRequired
};

export default Content;
