import {
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SET_IS_PLAYING,
  SET_PLAYER_NAMES,
  START_NEW_GAME,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
} from '../../actionTypes';
import { gameReducer as reducer } from '../../reducers/gameReducer';

const initialState = {
  gameOver: false,
  isPlaying: true,
  message: '',
  playerOneName: '',
  playerOne: [],
  playerTwoName: '',
  playerTwo: [],
  playerTurn: 'playerOne',
};

describe('Game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle END_GAME', () => {
    expect(
      reducer(initialState, {
        type: END_GAME,
        payload: 'playerTwo'
      })
    ).toEqual({
      ...initialState,
      gameOver: true,
      winner: 'playerTwo'
    })
  });

  it('should handle PLAYER_ONE_ATTACK', () => {
    expect(
      reducer(initialState, {
        type: PLAYER_ONE_ATTACK,
        payload: '0,1'
      })
    ).toEqual({
      ...initialState,
      playerOne: [
        '0,1'
      ]
    })
  });

  it('should handle PLAYER_TWO_ATTACK', () => {
    expect(
      reducer(initialState, {
        type: PLAYER_TWO_ATTACK,
        payload: '0,2'
      })
    ).toEqual({
      ...initialState,
      playerTwo: [
        '0,2'
      ]
    })
  });

  it('should handle SET_IS_PLAYING', () => {
    expect(
      reducer(initialState, {
        type: SET_IS_PLAYING,
        payload: true
      })
    ).toEqual({
      ...initialState,
      isPlaying: true
    })
  });

  it('should handle SET_PLAYER_NAMES', () => {
    expect(
      reducer(initialState, {
        type: SET_PLAYER_NAMES,
        payload: {
          playerOne: 'Captain Crunch',
          playerTwo: 'Captain Hook'
        }
      })
    ).toEqual({
      ...initialState,
      playerOneName: 'Captain Crunch',
      playerTwoName: 'Captain Hook'
    })
  });

  it('should handle TOGGLE_TURN', () => {
    expect(
      reducer(initialState, {
        type: TOGGLE_TURN,
        payload: 'playerOne'
      })
    ).toEqual({
      ...initialState,
      playerTurn: 'playerOne'
    })
  });

  it('should handle UPDATE_MESSAGE', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_MESSAGE,
        payload: 'Thar she blows!'
      })
    ).toEqual({
      ...initialState,
      message: 'Thar she blows!'
    })
  });
});
