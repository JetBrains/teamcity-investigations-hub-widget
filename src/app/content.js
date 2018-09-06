import React from 'react';
import PropTypes from 'prop-types';

import Link from '@jetbrains/ring-ui/components/link/link';
import EmptyWidget, {ERROR_FACE, JOY_FACE} from '@jetbrains/hub-widget-ui/dist/empty-widget';
import '@jetbrains/hub-widget-ui/dist/empty-widget.css';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './app.css';
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
          {i18n('TeamCity service to get investigations from, it not configuration yet. Please, ')}
          <Link onClick={onConfigure}>{i18n('select the service.')}</Link>
        </span>
      </WidgetContent>
    );
  } else if (investigationLoadErrorMessage) {
    return (
      <WidgetContent>
        <EmptyWidget header={ERROR_FACE}>
          {i18n('Cannot load investigations')}
          <br/>
          {investigationLoadErrorMessage}
        </EmptyWidget>
      </WidgetContent>
    );
  } else if (!investigations.length) {
    return (
      <WidgetContent>
        <EmptyWidget header={JOY_FACE}>
          {i18n('No investigations {{areAssignedToYou}}', {areAssignedToYou: ''})}
          <br/>
          {i18n('{{noInvestigations}} are assigned to you', {noInvestigations: ''})}
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
