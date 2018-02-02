import React from 'react';
import { connect } from 'react-redux';
import BoardContainer from './BoardContainer';
import OptionsContainer from './OptionsContainer';
import ShipsContainer from './ShipsContainer';
import Game from '../components/Game';

class GameContainer extends React.Component {
  render() {
    return (
      <div>
        <ShipsContainer />
        <OptionsContainer />
        <BoardContainer board={this.props.board} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.board.playerOne,
    selecting: state.board.selecting,
  }
}


export default connect(mapStateToProps)(GameContainer);
