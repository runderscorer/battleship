import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SHIP_LENGTHS } from '../constants';

const boardReducer = (state = {
  orientation: '',
  board: Array(10).fill(Array(10).fill("")),
  playerOne: {},
  playerTwo: {},
  selecting: true,
  shipSelected: '',
  shipLength: '',
}, action) => {
  switch (action.type) {
    case 'SET_ORIENTATION':
      return {
        ...state,
        orientation: action.payload
      };
    case 'SELECT_SHIP':
      return {
        ...state,
        shipSelected: action.payload,
        shipLength: SHIP_LENGTHS[action.payload],
      };
    case 'SET_SHIP':
      return {
        ...state,
        [action.payload.player]: playerShips(state[action.payload.player], action),
      };
    default:
      return state;
  }
};

const playerShips = (state, action) => {
  switch (action.type) {
    case 'SET_SHIP':
      return {...state, [action.payload.shipName]: action.payload.coordinates};
  }
};

const gameReducer = (state = {
  activeGame: false,
  playerOneName: '',
  playerTwoName: '',
}, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAMES':
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo,
      };
    default:
      return state;
  }
};

export default combineReducers({
  board: boardReducer,
  game: gameReducer,
  router: routerReducer,
});
