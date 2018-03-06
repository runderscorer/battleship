import { ATTACK_SHIP } from '../../actionTypes';
import { shipsReducer as reducer } from '../../reducers/shipsReducer';

const initialState = {
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
};

describe('Ships reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ATTACK_SHIP', () => {
    expect(
      reducer(initialState, {
        type: ATTACK_SHIP,
        payload: {
          enemy: 'playerTwo',
          enemyShip: 'Destroyer'
        }
      })
    ).toEqual({
      ...initialState,
      playerTwo: {
        'Aircraft Carrier': 5,
        'Battleship': 4,
        'Destroyer': 2,
        'Submarine': 3,
        'Patrol Boat': 2,
      }
    })
  })
});
