import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';

import styles from './app.css';
import ServiceSelect from './service-select';

const Configuration = (
  {
    dashboardApi,
    onConfigSave,
    onConfigCancel
  }
) => (
  <div className={styles.widget}>
    <ServiceSelect dashboardApi={dashboardApi}/>
    <Panel>
      <Button primary={true} onClick={onConfigSave}>{'Save'}</Button>
      <Button onClick={onConfigCancel}>{'Cancel'}</Button>
    </Panel>
  </div>
);

Configuration.propTypes = {
  dashboardApi: PropTypes.object.isRequired,
  onConfigSave: PropTypes.func.isRequired,
  onConfigCancel: PropTypes.func.isRequired
};

export default Configuration;
