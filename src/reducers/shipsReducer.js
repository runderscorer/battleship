import { ATTACK_SHIP } from '../actionTypes';

export const shipsReducer = (state = {
  playerOne: {
    'Aircraft Carrier': 5,
    'Battleship': 4,
    'Destroyer': 3,
    'Submarine': 3,
    'Patrol Boat': 2,
  },
  playerTwo: {
    'Aircraft Carrier': 5,
    'Battleship': 4,
    'Destroyer': 3,
    'Submarine': 3,
    'Patrol Boat': 2,
  },
}, action) => {
  switch (action.type) {
    case ATTACK_SHIP:
      return {
        ...state,
        [action.payload.enemy]: updateEnemyShip(state[action.payload.enemy], action)
      };
    default:
      return state;
  }
};

const updateEnemyShip = (state, action) => {
  switch (action.type) {
    case ATTACK_SHIP:
      return {
        ...state,
        [action.payload.enemyShip]: state[action.payload.enemyShip] -= 1
      };
    default:
      return state;
  }
}
