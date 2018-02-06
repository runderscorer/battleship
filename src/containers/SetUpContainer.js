import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  navigateNext,
  setShip,
} from '../actions';
import Board from '../components/Board';
import Button from '../components/Button';
import OptionsContainer from './OptionsContainer';
import ShipsContainer from './ShipsContainer';

class SetUpContainer extends React.Component {
  componentDidUpdate() {
    const { playerShips } = this.props;

    this.displayPlayerShips(playerShips);
  };

  displayPlayerShips = (playerShips) => {
    const table = document.getElementsByTagName('table')[0];

    Object.keys(playerShips).forEach(shipCoordinates => {
      let coordinatesArr = shipCoordinates.split(',');
      table.rows[coordinatesArr[0]].cells[coordinatesArr[1]].classList.add('marker');
    });

    console.log('playerShip coordinates: ', Object.keys(playerShips));
  }

  validCoordinates = (row, col, orientation, shipLength) => {
    return (
      (orientation === 'horizontal' && (col + shipLength - 1) <= 9) ||
      (orientation === 'vertical' && (row + shipLength - 1) <= 9)
    )
  };

  validPlacement = (coordinates, playerShips) => {
    const shipCoordinates = Object.keys(playerShips);
    const intersection = coordinates.map(c => {
      return shipCoordinates.includes(c);
    });

    return !intersection.includes(true);
  };

  buttonClickHandler = () => {
    const {
      navigateNext,
      pathname,
    } = this.props;

    navigateNext(pathname);
  };

  clickHandler =(e) => {
    const {
      orientation,
      player,
      playerShips,
      setShip,
      shipLength,
      shipSelected,
    } = this.props;
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;
    const coordinates = [];

    if (this.validCoordinates(row, col, orientation, shipLength)) {
      console.log('Valid move - on board');
      if (orientation === 'horizontal') {
        for (let i = col; i <= (col + shipLength - 1); i++) {
          coordinates.push(`${row},${i}`);
        };
      };

      if (orientation === 'vertical') {
        for (let i = row; i <= (row + shipLength - 1); i++) {
          coordinates.push(`${i},${col}`);
        };
      };

      if (this.validPlacement(coordinates, playerShips)) {
        coordinates.forEach(c => {
          setShip(player, shipSelected, c);
        });
        console.log('Valid placement');
      } else {
        console.log('Invalid placement');
      };
    } else {
      console.log('Invalid move - off board');
    };
  };

  mouseOverHandler = (e) => {
    const {
      orientation,
      shipLength
    } = this.props;
    const table = document.getElementsByTagName('table')[0];
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;

    if (orientation === 'horizontal' && (col + shipLength - 1) <= 9) {
      for (let i = col; i <= (col + shipLength - 1); i++) {
        table.rows[row].cells[i].classList.toggle('highlight')
      }
    };

    if (orientation === 'vertical' && (row + shipLength - 1) <= 9) {
      for (let i = row; i <= (row + shipLength - 1); i++) {
        table.rows[i].cells[col].classList.toggle('highlight')
      }
    }
  };

  render() {
    const {
      board,
      player,
      playerName,
      playerShips,
    } = this.props;

    return (
      <div className='main'>
        <h1>{playerName}</h1>
        <ShipsContainer
          player={player}
          playerShips={playerShips}
        />
        <OptionsContainer />

        <p>3. Place your ship on the board.</p>
        <Board
          board={board}
          clickHandler={this.clickHandler}
          mouseOverHandler={this.mouseOverHandler}
        />
      {Object.keys(playerShips).length === 17 ? <Button clickHandler={this.buttonClickHandler} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const pathname = state.router.location.pathname;
  const player = pathname.replace('/', '').replace(/(\-\w)/g, (c) => c[1].toUpperCase());

  return {
    board: state.board.board,
    pathname,
    player,
    orientation: state.board.orientation,
    playerName: state.game[`${player}Name`],
    playerShips: state.board[player],
    shipLength: state.board.shipLength,
    shipSelected: state.board.shipSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navigateNext,
    setShip,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUpContainer);
