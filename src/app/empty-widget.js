import React from 'react';
import PropTypes from 'prop-types';

import styles from './app.css';

const EmptyWidget = ({header, children}) => (
  <div className={styles.widget__empty}>
    <div className={styles['widget__empty-smile']}>{header}</div>
    <div className={styles['widget__empty-message']}>{children}</div>
  </div>
);

EmptyWidget.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default EmptyWidget;
