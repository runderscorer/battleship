import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayerNames } from '../actions';
import GameOver from '../components/GameOver';
import Welcome from '../components/Welcome';

class WelcomeContainer extends React.Component {
  render() {
    const {
      gameOver,
      setPlayerNames,
      winner,
    } = this.props;

    return gameOver ? <GameOver winner={winner} /> : <Welcome submitHandler={setPlayerNames} />;
  }
};

const mapStateToProps = (state) => {
  return {
    gameOver: state.game.gameOver,
    winner: state.game.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPlayerNames,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
