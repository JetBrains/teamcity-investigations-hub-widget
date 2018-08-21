import React from 'react';
import PropTypes from 'prop-types';

import Link from '@jetbrains/ring-ui/components/link/link';
import Loader from '@jetbrains/ring-ui/components/loader/loader';

import styles from './app.css';
import EmptyWidget from './empty-widget';

function WidgetContent({children}) {
  return (
    <div className={styles.widget}>
      {children}
    </div>
  );
}

WidgetContent.propTypes = {
  children: PropTypes.node
};

const Content = ({teamcityService, investigations, isLoadingInvestigations, onConfigure}) => {
  if (!teamcityService) {
    return (
      <WidgetContent>
        <span>
          {'TeamCity service to get investigations from, it not configuration yet. Please, '}
          <Link onClick={onConfigure}>{'select the service.'}</Link>
        </span>
      </WidgetContent>
    );
  } else if (isLoadingInvestigations) {
    return (
      <WidgetContent>
        <Loader/>
      </WidgetContent>
    );
  } else if (!investigations.length) {
    return (
      <WidgetContent>
        <EmptyWidget header={'(⌒‿⌒)'}>
          {'No investigations'}
          <br/>
          {'are assigned to you'}
        </EmptyWidget>
      </WidgetContent>
    );
  } else {
    return (
      <WidgetContent>{teamcityService.name}</WidgetContent>
    );
  }
};

Content.propTypes = {
  teamcityService: PropTypes.object,
  investigations: PropTypes.array.isRequired,
  isLoadingInvestigations: PropTypes.bool.isRequired,
  onConfigure: PropTypes.func.isRequired
};

export default Content;
