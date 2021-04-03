import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers"; 

//store
const store = createStore(rootReducer, composeWithDevTools())
//reducer --> a function that will update the state.
//To create a store, we need a root reducer function.

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);
