import {
  SELECT_SHIP,
  SET_ORIENTATION,
  SET_SHIP,
} from '../../actionTypes';
import { boardReducer as reducer } from '../../reducers/boardReducer';

const initialState = {
  orientation: '',
  board: Array(10).fill(Array(10).fill("")),
  playerOne: {},
  playerTwo: {},
  selecting: true,
  shipSelected: '',
  shipLength: '',
};

describe('Board reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_ORIENTATION', () => {
    expect(
      reducer(initialState, {
        type: SET_ORIENTATION,
        payload: 'vertical'
      })
    ).toEqual({
      ...initialState,
      orientation: 'vertical'
    })
  });

  it('should handle SELECT_SHIP', () => {
    expect(
      reducer(initialState, {
        type: SELECT_SHIP,
        payload: 'Battleship'
      })
    ).toEqual({
      ...initialState,
      shipSelected: 'Battleship',
      shipLength: 4
    })
  });

  it('should handle SET_SHIP', () => {
    expect(
      reducer(initialState, {
        type: SET_SHIP,
        payload: {
          player: 'playerOne',
          shipName: 'Battleship',
          coordinates: '3,0'
        }
      })
    ).toEqual({
      ...initialState,
      playerOne: {
        '3,0': 'Battleship'
      }
    })
  });
});
