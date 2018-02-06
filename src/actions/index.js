import { push } from 'react-router-redux';
import {
  ATTACK_SHIP,
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SELECT_SHIP,
  SET_IS_PLAYING,
  SET_ORIENTATION,
  SET_PLAYER_NAMES,
  SET_SHIP,
  START_NEW_GAME,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
} from '../actionTypes';

export function attackShip(enemy, enemyShip) {
  return {
    type: ATTACK_SHIP,
    payload: {
      enemy,
      enemyShip
    }
  };
};

export function endGame(player) {
  return (dispatch) => {
    dispatch({
      type: END_GAME,
      payload: player
    });
    dispatch(push('/'));
  };
};

export function setIsPlaying(isPlaying) {
  return { type: SET_IS_PLAYING, payload: isPlaying };
};

export function playerOneAttack(coordinates) {
  return (dispatch) => {
    dispatch({
      type: PLAYER_ONE_ATTACK,
      payload: coordinates
    });
    dispatch(setIsPlaying(false));
  };
};

export function playerTwoAttack(coordinates) {
  return (dispatch) => {
    dispatch({
      type: PLAYER_TWO_ATTACK,
      payload: coordinates
    });
    dispatch(setIsPlaying(false));
  };
};

export function navigateNext(pathname) {
  return (dispatch) => {
    switch (pathname) {
      case '/player-one':
        return dispatch(push('/player-two'));
      case '/player-two':
        return dispatch(push('/ready/player-one'));
      default:
        return;
    }
  };
};

export function setPlayerNames(playerOne, playerTwo) {
  return (dispatch) => {
    dispatch({
      type: SET_PLAYER_NAMES,
      payload: {
        playerOne,
        playerTwo
      }
    });
    dispatch(push('/player-one'));
  }
};

export function selectShip(ship) {
  return { type: SELECT_SHIP, payload: ship };
};

export function setShip(player, shipName, coordinates)  {
  return {
    type: SET_SHIP,
    payload: {
      player,
      shipName,
      coordinates,
    }
  };
};

export function setOrientation(orientation) {
  return { type: SET_ORIENTATION, payload: orientation };
};

export function startNewGame() {
  return { type: START_NEW_GAME };
};

export function toggleTurn(player) {
  const pathname = player === 'playerOne' ? '/ready/player-one' : '/ready/player-two';
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TURN,
      payload: player
    });
    dispatch(setIsPlaying(true));
    dispatch(push(pathname));
  };
};

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, payload: message };
};
