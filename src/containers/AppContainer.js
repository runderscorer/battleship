import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';
import GameContainer from '../containers/GameContainer';
import SetUpContainer from '../containers/SetUpContainer';
import WelcomeContainer from '../containers/WelcomeContainer';

class AppContainer extends React.Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={WelcomeContainer} />
        <Route exact path='/player-one' component={SetUpContainer} />
        <Route exact path='/player-two' component={SetUpContainer} />
        <Route exact path='/ready/player-one' component={GameContainer} />
        <Route exact path='/ready/player-two' component={GameContainer} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeGame: state.activeGame,
  };
}

export default withRouter(connect(mapStateToProps)(AppContainer));
