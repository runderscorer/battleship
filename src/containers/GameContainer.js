import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playerOneAttack,
  playerTwoAttack,
  toggleTurn,
  updateMessage,
} from '../actions';
import { togglePlayer } from '../helpers';
import Board from '../components/Board';
import Button from '../components/Button';

class GameContainer extends React.Component {
  buttonClickHandler = (e) => {
    const {
      playerTurn,
      toggleTurn
    } = this.props;

    toggleTurn(togglePlayer(playerTurn));
  };

  clickHandler = (e) => {
    const {
      enemyShips,
      playerTurn,
      playerOneAttack,
      playerTwoAttack,
      updateMessage,
    } = this.props;
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;
    const playerAttack = playerTurn === 'playerOne' ? playerOneAttack : playerTwoAttack;

    const attackedShip =
      Object.keys(enemyShips).find(ship => {
        enemyShips[ship].find(coordinates => {
          return row === coordinates[0] && col === coordinates[1];
        });
      });

    playerAttack([row, col]);
    updateMessage(attackedShip ? `You hit their ${attackedShip}!` : 'You missed.');
  };

  mouseOverHandler = (e) => {
    e.target.classList.toggle('highlight');
  };

  render() {
    const {
      board,
    } = this.props;

    return (
      <div>
        <Board
          board={board}
          clickHandler={this.clickHandler}
          mouseOverHandler={this.mouseOverHandler}
        />
        <Button clickHandler={this.buttonClickHandler}/>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const playerTurn = state.game.playerTurn;
  const enemy = togglePlayer(playerTurn);

  return {
    board: state.board.board,
    enemyShips: state.board[enemy],
    playerTurn: state.game.playerTurn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    playerOneAttack,
    playerTwoAttack,
    toggleTurn,
    updateMessage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
