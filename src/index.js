import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './store/reducers/rootReducer'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
}) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
  );
  

const store = createStore(rootReducer, enhancer)

const app = (
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>  
    </Router>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
