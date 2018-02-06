import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playerOneAttack,
  playerTwoAttack,
  toggleTurn,
  updateMessage,
} from '../actions';
import {
  matchingCoordinates,
  togglePlayer
} from '../helpers';
import Board from '../components/Board';
import Button from '../components/Button';

class GameContainer extends React.Component {
  componentDidMount() {
    this.updateBoard(this.props.enemyShips, this.props.attacks);
  }

  componentDidUpdate() {
    this.updateBoard(this.props.enemyShips, this.props.attacks);
  };

  updateBoard = (enemyShips, attacks) => {
    const table = document.getElementsByTagName('table')[0];

    attacks.forEach(attack => {
      let attackCoordinates = attack.split(',');
      let cell = table.rows[attackCoordinates[0]].cells[attackCoordinates[1]];

      enemyShips[attack] ? cell.classList.add('hit') : cell.classList.add('marker');
    });
  };

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
      isPlaying,
      playerTurn,
      playerOneAttack,
      playerTwoAttack,
      updateMessage,
    } = this.props;

    if (!isPlaying) { return };
    
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;
    const attackCoordinates = `${row},${col}`;
    const playerAttackAction = playerTurn === 'playerOne' ? playerOneAttack : playerTwoAttack;
    const message =
      Object.keys(enemyShips).includes(attackCoordinates) ?
        `You hit their ${enemyShips[attackCoordinates]}!` :
        `You missed.`

    updateMessage(message);
    playerAttackAction(attackCoordinates);
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
    attacks: state.game[playerTurn],
    board: state.board.board,
    enemyShips: state.board[enemy],
    isPlaying: state.game.isPlaying,
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
