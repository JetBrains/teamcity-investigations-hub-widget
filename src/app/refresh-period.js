import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';
import {ChevronDownIcon, ChevronUpIcon, TimeIcon} from '@jetbrains/ring-ui/components/icon';

import styles from './refresh-period.css';

const REFRESH_PERIOD_MINUTE = 60; // eslint-disable-line no-magic-numbers

const increaseRefreshPeriod = (seconds, onChange) => () => {
  const newSeconds = seconds + REFRESH_PERIOD_MINUTE;
  onChange(newSeconds);
};

const decreaseRefreshPeriod = (seconds, onChange) => () => {
  if (seconds > REFRESH_PERIOD_MINUTE) {
    const newSeconds = seconds - REFRESH_PERIOD_MINUTE;
    onChange(newSeconds);
  }
};

const RefreshPeriod = ({seconds, onChange}) => {
  const minutes = seconds / REFRESH_PERIOD_MINUTE;

  return (
    <span className={styles.refreshPeriod}>
      <Tooltip
        delay={1000}
        popupProps={{top: -4}}
        title={
          minutes === 1
            ? 'Widget refreshes every minute'
            : `Widget refreshes every ${minutes} minutes`
        }
      >
        <TimeIcon
          size={TimeIcon.Size.Size12}
        />&nbsp;{`${minutes} min`}
      </Tooltip>
      <ChevronUpIcon
        onClick={increaseRefreshPeriod(seconds, onChange)}
        className={[styles.button, styles.up].join(' ')}
        size={ChevronUpIcon.Size.Size12}
        color={ChevronUpIcon.Color.BLUE}
      />
      <ChevronDownIcon
        onClick={decreaseRefreshPeriod(seconds, onChange)}
        className={[styles.button, styles.down].join(' ')}
        size={ChevronDownIcon.Size.Size12}
        color={ChevronDownIcon.Color.BLUE}
      />
    </span>
  );
};

RefreshPeriod.propTypes = {
  seconds: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RefreshPeriod;
