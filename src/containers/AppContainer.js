import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import GameContainer from '../containers/GameContainer';
import WelcomeContainer from '../containers/WelcomeContainer';

class AppContainer extends React.Component {
  render() {
    return this.props.activeGame ? <GameContainer /> : <WelcomeContainer />
  }
}

const mapStateToProps = (state) => {
  return {
    activeMatch: state.activeGame,
  };
}

export default connect(mapStateToProps)(AppContainer);
