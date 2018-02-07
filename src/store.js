import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import history from './history';
import { rootReducer } from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  )
);

export default store;
