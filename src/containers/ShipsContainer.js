import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectShip } from '../actions';
import Ships from '../components/Ships';

class ShipsContainer extends React.Component {
  render() {
    const {
      playerShips,
      selectShip, 
    } = this.props;

    return (
      <Ships
        clickHandler={selectShip}
        playerShips={playerShips}
      />
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectShip,
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(ShipsContainer);
