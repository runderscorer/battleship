import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayerNames } from '../actions';
import Welcome from '../components/Welcome';

class WelcomeContainer extends React.Component {
  render() {
    return <Welcome />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPlayerNames
  }, dispatch);
}

export default connect(mapDispatchToProps)(WelcomeContainer);
