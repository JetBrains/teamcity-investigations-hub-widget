import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './app.css';
import ServiceSelect from './service-select';
import RefreshPeriod from './lib/refresh-period/refresh-period';

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
      <Button primary={true} onClick={onConfigSave}>
        {i18n('Save')}
      </Button>
      <Button onClick={onConfigCancel}>
        {i18n('Cancel')}
      </Button>
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
