import 'babel-polyfill';

import App from './components/App';
import AppHomeRoute from './routes/TestRouter';
import ReactDom from 'react-dom';
import Relay from 'react-relay';
import React from 'react';

export default ReactDom.render(
  <Relay.Renderer
    Container={App}
    queryConfig={new AppHomeRoute()}
    environment={Relay.Store}
    onReadyStateChange={({error, ready}) => { if (error) console.error(error); }}
  />,
  document.getElementById('app')
);

