import React from 'react';
import Router from './src/Router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers'

const App = () => {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App;