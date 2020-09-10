import React, { useEffect } from 'react';
import Router from './src/Router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen'

import Reducers from './src/Reducers'

const App = () => {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
  useEffect(() => {
    SplashScreen.hide();

  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App;