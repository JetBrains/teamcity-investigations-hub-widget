import React from 'react';
import PropTypes from 'prop-types';

import styles from './app.css';
import sayHello from './sayHello';

const Content = ({selectedColor}) => (
  <div className={styles.widget}>
    <h1 style={{color: selectedColor.key}}>{sayHello()}</h1>
    <p>{'Select "Edit..." option in widget dropdown to configure text color'}</p>
  </div>
);


Content.propTypes = {
  selectedColor: PropTypes.object.isRequired
};

export default Content;
