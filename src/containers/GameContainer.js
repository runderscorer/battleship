import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  attackShip,
  endGame,
  playerOneAttack,
  playerTwoAttack,
  toggleTurn,
  updateMessage,
} from '../actions';
import { togglePlayer } from '../helpers';
import Board from '../components/Board';
import Button from '../components/Button';
import Message from '../components/Message';

class GameContainer extends React.Component {
  componentDidMount() {
    this.displayHitsAndMisses(this.props.enemyShips, this.props.attacks);
  }

  componentDidUpdate() {
    const {
      attacks,
      endGame,
      enemyShips,
      enemyShipsHealth,
      playerName,
    } = this.props;

    this.displayHitsAndMisses(enemyShips, attacks);

    const hitsLeft =
      Object.values(enemyShipsHealth).reduce((sum, health) => {
        sum += health;
        return sum;
      }, 0);

    if (hitsLeft === 0) {
      endGame(playerName);
    };
  };

  displayHitsAndMisses = (enemyShips, attacks) => {
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
      attackShip,
      enemyShips,
      enemyShipsHealth,
      isPlaying,
      playerAttacks,
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
    const enemy = togglePlayer(playerTurn);

    playerAttackAction(attackCoordinates);

    if (Object.keys(enemyShips).includes(attackCoordinates) && !playerAttacks.includes(attackCoordinates)) {
      const enemyShip = enemyShips[attackCoordinates];
      attackShip(enemy, enemyShip);
      const message = enemyShipsHealth[enemyShip] === 0 ? `You sunk their ${enemyShip}!` : `You hit their ${enemyShip}!`;

      updateMessage(message);
    } else {
      updateMessage('You missed.');
    };
  };

  mouseOverHandler = (e) => {
    e.target.classList.toggle('highlight');
  };

  render() {
    const {
      board,
      message,
      playerName,
    } = this.props;

    return (
      <div className='main'>
        <h1>{playerName}</h1>
        <Message message={message} />
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
    enemyShipsHealth: state.ships[enemy],
    isPlaying: state.game.isPlaying,
    message: state.game.message,
    playerName: state.game[`${playerTurn}Name`],
    playerTurn,
    playerAttacks: state.game[playerTurn],
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    attackShip,
    endGame,
    playerOneAttack,
    playerTwoAttack,
    toggleTurn,
    updateMessage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
