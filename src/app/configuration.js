import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';

import styles from './app.css';
import ServiceSelect from './service-select';
import RefreshPeriod from './refresh-period';

const Configuration = (
  {
    refreshPeriod,
    onRefreshPeriodUpdate,
    onConfigSave,
    onConfigCancel
  }
) => (
  <div className={styles.widget}>
    <ServiceSelect/>
    <Panel className={styles.configurationButtonsPanel}>
      <Button primary={true} onClick={onConfigSave}>{'Save'}</Button>
      <Button onClick={onConfigCancel}>{'Cancel'}</Button>
      <RefreshPeriod seconds={refreshPeriod} onChange={onRefreshPeriodUpdate}/>
    </Panel>
  </div>
);

Configuration.propTypes = {
  refreshPeriod: PropTypes.number.isRequired,
  onRefreshPeriodUpdate: PropTypes.func.isRequired,
  onConfigSave: PropTypes.func.isRequired,
  onConfigCancel: PropTypes.func.isRequired
};

export default Configuration;
