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
        shipSelected: '',
        shipLength: '',
      };
    default:
      return state;
  }
};

const playerShips = (state, action) => {
  switch (action.type) {
    case 'SET_SHIP':
      return {...state, [action.payload.shipName]: action.payload.coordinates};
    default:
      return state;
  }
};

const gameReducer = (state = {
  activeGame: false,
  playerOne: '',
  playerTwo: '',
  playerTurn: 'playerOne',
}, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAMES':
      return {
        ...state,
        playerOne: action.payload.playerOne,
        playerTwo: action.payload.playerTwo,
      };
    case 'TOGGLE_TURN':
      return {
        ...state,
        playerTurn: action.payload,
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
