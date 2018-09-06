import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';

import RefreshPeriod from '../refresh-period/refresh-period';

import styles from './configuration-form.css';

const ConfigurationForm = (
  {
    refreshPeriod,
    onRefreshPeriodUpdate,
    saveButtonLabel,
    cancelButtonLabel,
    onSave,
    onCancel,
    children
  }
) => (
  <div>
    {children}
    <Panel className={styles.configurationButtonsPanel}>
      <Button primary={true} onClick={onSave}>
        {saveButtonLabel || 'Save'}
      </Button>
      <Button onClick={onCancel}>
        {cancelButtonLabel || 'Cancel'}
      </Button>
      {onRefreshPeriodUpdate && (
        <RefreshPeriod seconds={refreshPeriod} onChange={onRefreshPeriodUpdate}/>
      )}
    </Panel>
  </div>
);

ConfigurationForm.propTypes = {
  refreshPeriod: PropTypes.number,
  onRefreshPeriodUpdate: PropTypes.func,
  saveButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ConfigurationForm;
