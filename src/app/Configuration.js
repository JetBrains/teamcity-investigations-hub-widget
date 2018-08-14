import React from 'react';
import PropTypes from 'prop-types';

import styles from './app.css';
import Select from "@jetbrains/ring-ui/components/select/select";
import Panel from "@jetbrains/ring-ui/components/panel/panel";
import Button from "@jetbrains/ring-ui/components/button/button";

const Configuration = (
  {
    colorOptions,
    selectedColor,
    onColorChange,
    onConfigSave,
    onConfigCancel
  }
) => (
  <div className={styles.widget}>
    <Select
      data={colorOptions}
      selected={selectedColor}
      onChange={onColorChange}
      label="Select text color"
    />
    <Panel>
      <Button primary={true} onClick={onConfigSave}>{'Save'}</Button>
      <Button onClick={onConfigCancel}>{'Cancel'}</Button>
    </Panel>
  </div>
);


Configuration.propTypes = {
  colorOptions: PropTypes.array.isRequired,
  selectedColor: PropTypes.object.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onConfigSave: PropTypes.func.isRequired,
  onConfigCancel: PropTypes.func.isRequired
};

export default Configuration;
