import 'babel-polyfill';

import WidgetContainer from '../app/widget-container';

describe('WidgetContainer', () => {

  it('should export WidgetContainer', () => {
    (WidgetContainer).should.be.a('function');
  });

});
