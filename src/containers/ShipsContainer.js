import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectShip } from '../actions';
import Ships from '../components/Ships';

class ShipsContainer extends React.Component {
  render() {
    return <Ships clickHandler={this.props.selectShip} />
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectShip,
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(ShipsContainer);
