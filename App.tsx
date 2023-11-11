import React from 'react';
import MainRouteConfig from './src/MainRouteConfig';

import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import mainReducer from './src/store/MainReducer';
export const store = legacy_createStore(
  mainReducer,
  applyMiddleware(ReduxThunk),
);
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainRouteConfig />
    </Provider>
  );
}

export default App;
