import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setOrientation } from '../actions';
import Options from '../components/Options';

class OptionsContainer extends React.Component {
  render() {
    return (
      <Options clickHandler={this.props.setOrientation} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setOrientation,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(OptionsContainer);
