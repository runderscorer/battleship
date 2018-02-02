import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setShip } from '../actions';
import Board from '../components/Board';

class BoardContainer extends React.Component {
  render() {
    const {
      board,
      orientation,
      player,
      playerShips,
      shipSelected,
      setShip,
      shipLength,
    } = this.props;

    return (
      <Board
        board={board}
        clickHandler={setShip}
        orientation={orientation}
        player={player}
        playerShips={playerShips}
        shipSelected={shipSelected}
        shipLength={shipLength}
      />
    );
  };
}

const mapStateToProps = (state) => {
  const player = state.router.location.pathname.replace('/', '').replace(/(\-\w)/g, (c) => c[1].toUpperCase());

  return {
    board: state.board.board,
    orientation: state.board.orientation,
    player,
    playerShips: state.board[player],
    shipSelected: state.board.shipSelected,
    shipLength: state.board.shipLength,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setShip,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
