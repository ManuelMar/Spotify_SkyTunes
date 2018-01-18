import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'; // make reducers available

import registerServiceWorker from './registerServiceWorker';

//empty reducer : ()=>{}
//const store = createStore(() => {}, {}, applyMiddleware(reduxThunk));
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
