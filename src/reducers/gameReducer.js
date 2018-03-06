import {
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SET_IS_PLAYING,
  SET_PLAYER_NAMES,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
} from '../actionTypes';

export const gameReducer = (state = {
  gameOver: false,
  isPlaying: true,
  message: '',
  playerOneName: '',
  playerOne: [],
  playerTwoName: '',
  playerTwo: [],
  playerTurn: 'playerOne',
}, action) => {
  switch (action.type) {
    case END_GAME:
      return {
        ...state,
        gameOver: true,
        winner: action.payload
      };
    case PLAYER_ONE_ATTACK:
      return {
        ...state,
        playerOne: [
          ...state.playerOne,
          action.payload
        ]
      };
    case PLAYER_TWO_ATTACK:
      return {
        ...state,
        playerTwo: [
          ...state.playerTwo,
          action.payload
        ]
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload
      };
    case SET_PLAYER_NAMES:
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo
      };
    case TOGGLE_TURN:
      return {
        ...state,
        message: '',
        playerTurn: action.payload,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
