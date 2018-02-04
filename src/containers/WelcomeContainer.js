import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPlayerNames } from '../actions';
import Welcome from '../components/Welcome';

class WelcomeContainer extends React.Component {
  render() {
    return (
      <Welcome submitHandler={this.props.setPlayerNames} />
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPlayerNames
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(WelcomeContainer);
