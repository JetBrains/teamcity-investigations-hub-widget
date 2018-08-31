import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';
import {ChevronDownIcon, ChevronUpIcon, TimeIcon} from '@jetbrains/ring-ui/components/icon';
import {i18n} from 'hub-dashboard-addons/dist/localization';

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
  const minutesCount = seconds / REFRESH_PERIOD_MINUTE;

  return (
    <span className={styles.refreshPeriod}>
      <Tooltip
        delay={1000}
        popupProps={{top: -4}}
        title={
          minutesCount === 1
            ? i18n('Widget refreshes every minute')
            : i18n('Widget refreshes every {{minutesCount}} minutes', {minutesCount})
        }
      >
        <TimeIcon
          size={TimeIcon.Size.Size12}
        />&nbsp;{i18n('{{minutesCount}} min', {minutesCount})}
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
