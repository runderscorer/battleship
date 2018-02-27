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

const mapStateToProps = (state) => {
  const pathname = state.router.location.pathname;
  const player = pathname.replace('/', '').replace(/(-\w)/g, (c) => c[1].toUpperCase());

  return {
    playerShips: state.board[player],
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectShip,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipsContainer);
