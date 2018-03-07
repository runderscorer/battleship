import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes';
import * as actions from '../../actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Actions', () => {
  it('attackShip', () => {
    expect(actions.attackShip('playerTwo', 'Battleship')).toEqual({
      type: types.ATTACK_SHIP,
      payload: {
        enemy: 'playerTwo',
        enemyShip: 'Battleship'
      }
    })
  });

  it('setIsPlaying', () => {
    expect(actions.setIsPlaying(true)).toEqual({
      type: types.SET_IS_PLAYING,
      payload: true
    })
  });

  it('selectShip', () => {
    expect(actions.selectShip('Destroyer')).toEqual({
      type: types.SELECT_SHIP,
      payload: 'Destroyer'
    })
  });

  it('setShip', () => {
    expect(actions.setShip('playerOne', 'Patrol Boat', '1,1')).toEqual({
      type: types.SET_SHIP,
      payload: {
        player: 'playerOne',
        shipName: 'Patrol Boat',
        coordinates: '1,1'
      }
    })
  });

  it('setOrientation', () => {
    expect(actions.setOrientation('horizontal')).toEqual({
      type: types.SET_ORIENTATION,
      payload: 'horizontal'
    })
  });

  it('startNewGame', () => {
    expect(actions.startNewGame()).toEqual({
      type: types.START_NEW_GAME
    })
  });

  it('updateMessage', () => {
    expect(actions.updateMessage('Ahoy, matey!')).toEqual({
      type: types.UPDATE_MESSAGE,
      payload: 'Ahoy, matey!'
    })
  });
});

describe('Thunked actions', () => {
  const store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('endGame should return a function', () => {
    expect(typeof actions.endGame('playerOne')).toBe('function')
  });

  it('endGame should dispatch 2 actions', () => {
    store.dispatch(actions.endGame('playerOne'))

    const endGameActions = store.getActions();

    expect(endGameActions.length).toEqual(2);
  });

  it('playerOneAttack should return a function', () => {
    expect(typeof actions.playerOneAttack('0,1')).toBe('function')
  });

  it('playerOneAttack should dispatch 2 actions', () => {
    store.dispatch(actions.playerOneAttack('0,1'));

    const playerOneAttackActions = store.getActions();

    expect(playerOneAttackActions.length).toEqual(2);
  });

  it('playerTwoAttack should return a function', () => {
    expect(typeof actions.playerTwoAttack('0,1')).toBe('function')
  });

  it('playerTwoAttack should dispatch 2 actions', () => {
    store.dispatch(actions.playerTwoAttack('0,1'));

    const playerTwoAttackActions = store.getActions();

    expect(playerTwoAttackActions.length).toEqual(2);
  });

  it('navigateNext should return a function', () => {
    expect(typeof actions.navigateNext('player-two')).toBe('function');
  });

  it('setPlayerNames should return a function', () => {
    expect(typeof actions.setPlayerNames('Crunch', 'Hook')).toBe('function')
  });

  it('setPlayerNames should dispatch 2 actions', () => {
    store.dispatch(actions.setPlayerNames('Crunch', 'Hook'));

    const setPlayerNamesActions = store.getActions();

    expect(setPlayerNamesActions.length).toEqual(2);
  })

  it('toggleTurn should return a function', () => {
    expect(typeof actions.toggleTurn('playerTwo')).toBe('function')
  });

  it('toggleTurn should dispatch 3 actions', () => {
    store.dispatch(actions.toggleTurn('playerTwo'));

    const toggleTurnActions = store.getActions();

    expect(toggleTurnActions.length).toEqual(3);
  })
})
