import React from 'react';

export default class Welcome extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
  };

  handleOneChange = (e) => {
    this.setState({
      playerOneName: e.target.value
    });
  }

  handleTwoChange = (e) => {
    this.setState({
      playerTwoName: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { playerOneName, playerTwoName } = this.state;
    this.props.submitHandler(playerOneName, playerTwoName);
  }

  render() {
    const { playerOneName, playerTwoName } = this.props;

    return (
      <div className='welcome'>
        <h1>Battleship</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Player One:</label>
          <input onChange={this.handleOneChange} value={playerOneName} />
          <label>Player Two:</label>
          <input onChange={this.handleTwoChange} value={playerTwoName} />
          <button type='submit'>Next</button>
        </form>
      </div>
    )
  }
};
