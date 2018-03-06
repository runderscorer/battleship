import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { boardReducer } from './boardReducer';
import { gameReducer } from './gameReducer';
import { shipsReducer } from './shipsReducer';
import { START_NEW_GAME } from '../actionTypes';

const appReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
  ships: shipsReducer,
  router: routerReducer,
});

// Passing undefined to the appReducer resets the
// state for each reducer and resets the game.
export const rootReducer = (state, action) => {
  if (action.type === START_NEW_GAME) {
    state = undefined;
  };

  return appReducer(state, action);
}
