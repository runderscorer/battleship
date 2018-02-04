import { push } from 'react-router-redux';

export function navigateNext(pathname) {
  return (dispatch) => {
    switch (pathname) {
      case '/player-one':
        return dispatch(push('/player-two'));
      case '/player-two':
        return dispatch(push('/start'));
      default:
        return;
    }
  };
};

export function setPlayerNames(playerOne, playerTwo) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_NAMES',
      payload: {
        playerOne,
        playerTwo
      }
    });
    dispatch(push('/player-one'));
  }
};

export function selectShip(ship) {
  return { type: 'SELECT_SHIP', payload: ship };
};

export function setShip(player, shipName, coordinates)  {
  return {
    type: 'SET_SHIP',
    payload: {
      player,
      shipName,
      coordinates,
    }
  };
};

export function setOrientation(orientation) {
  return { type: 'SET_ORIENTATION', payload: orientation };
};

export function toggleTurn(player) {
  return { type: 'TOGGLE_TURN', payload: player };
};
