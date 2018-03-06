import {
  SELECT_SHIP,
  SET_ORIENTATION,
  SET_SHIP,
} from '../actionTypes';
import { SHIP_LENGTHS } from '../constants';

export const boardReducer = (state = {
  orientation: '',
  board: Array(10).fill(Array(10).fill("")),
  playerOne: {},
  playerTwo: {},
  selecting: true,
  shipSelected: '',
  shipLength: '',
}, action) => {
  switch (action.type) {
    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload
      };
    case SELECT_SHIP:
      return {
        ...state,
        shipSelected: action.payload,
        shipLength: SHIP_LENGTHS[action.payload],
      };
    case SET_SHIP:
      return {
        ...state,
        [action.payload.player]: setShipsCoordinates(state[action.payload.player], action),
        shipSelected: '',
        shipLength: '',
      };
    default:
      return state;
  }
};

const setShipsCoordinates = (state, action) => {
  switch (action.type) {
    case SET_SHIP:
      return {...state, [action.payload.coordinates]: action.payload.shipName};
    default:
      return state;
  }
};
