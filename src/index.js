import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component) => { // eslint-disable-line
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept();
}
