import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayerNames } from '../actions';
import Welcome from '../components/Welcome';

class WelcomeContainer extends React.Component {
  render() {
    const { playerOneName, playerTwoName } = this.props;

    return (
      <Welcome submitHandler={this.props.setPlayerNames} />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    playerOneName: state.playerOneName,
    playerTwoName: state.playerTwoName,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPlayerNames
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
