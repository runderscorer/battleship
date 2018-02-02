import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

const history = createHistory();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
