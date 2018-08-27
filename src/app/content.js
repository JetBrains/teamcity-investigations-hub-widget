import React from 'react';
import PropTypes from 'prop-types';

import Link from '@jetbrains/ring-ui/components/link/link';

import styles from './app.css';
import EmptyWidget from './empty-widget';
import Investigation from './investigation';

import investigationStyles from './investigation.css';

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

const Content = ({teamcityService, investigations, investigationLoadErrorMessage, onConfigure}) => {
  if (!teamcityService) {
    return (
      <WidgetContent>
        <span>
          {'TeamCity service to get investigations from, it not configuration yet. Please, '}
          <Link onClick={onConfigure}>{'select the service.'}</Link>
        </span>
      </WidgetContent>
    );
  } else if (investigationLoadErrorMessage) {
    return (
      <WidgetContent>
        <EmptyWidget header={'{{ (>_<) }}'}>
          {'Cannot load investigations'}
          <br/>
          {investigationLoadErrorMessage}
        </EmptyWidget>
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
      <WidgetContent>
        <ul className={investigationStyles.investigations}>
          {investigations.map(investigation => (
            <Investigation
              key={investigation.id}
              name={investigation.name}
              url={investigation.url}
              tests={investigation.tests}
              problems={investigation.problems}
            />
          ))}
        </ul>
      </WidgetContent>
    );
  }
};

Content.propTypes = {
  teamcityService: PropTypes.object,
  investigations: PropTypes.array.isRequired,
  investigationLoadErrorMessage: PropTypes.string,
  onConfigure: PropTypes.func.isRequired
};

export default Content;
