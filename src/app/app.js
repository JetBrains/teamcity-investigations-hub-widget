import 'babel-polyfill';
import DashboardAddons from 'hub-dashboard-addons';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import 'file-loader?name=[name].[ext]!../../manifest.json'; // eslint-disable-line import/no-unresolved

import createStore, {initWidget} from './ReduxStore';
import WidgetContainer from './WidgetContainer';

DashboardAddons.registerWidget((dashboardApi, registerWidgetApi) => {
  const store = createStore();
  store.dispatch(initWidget(dashboardApi, registerWidgetApi));

  return render(
    <Provider store={store}>
      <WidgetContainer dashboardApi={dashboardApi}/>
    </Provider>,
    document.getElementById('app-container')
  );
});
