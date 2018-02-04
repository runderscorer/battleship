import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleTurn } from '../actions';
import Board from '../components/Board';
import Button from '../components/Button';
import Game from '../components/Game';

class GameContainer extends React.Component {
  clickHandler = (e) => {

  };

  render() {
    const { board } = this.props;

    return (
      <div>
        <Board
          board={board}
        />
        <Button />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    board: state.board.board,
    playerTurn: state.game.playerTurn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleTurn,
  }, dispatch);
};

export default connect(mapStateToProps)(GameContainer);
