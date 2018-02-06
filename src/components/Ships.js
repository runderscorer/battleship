import React from 'react';

export default class Ships extends React.Component {
  constructor() {
    super();

    this.ships = [
      {name: 'Aircraft Carrier', length: 5},
      {name: 'Battleship', length: 4},
      {name: 'Submarine', length: 3},
      {name: 'Destroyer', length: 3},
      {name: 'Patrol Boat', length: 2},
    ];
  }

  handleClick = (e) => {
    this.props.clickHandler(e.target.value);
  };

  render() {
    const { playerShips } = this.props;

    return (
      <div>
        <p>1. Select your ship.</p>
        {this.ships.map(ship => {
          return (
            <button
              disabled={Object.values(playerShips).includes(ship.name)}
              key={ship.name}
              onClick={this.handleClick}
              value={ship.name}
            >
              {`${ship.name} (${ship.length})`}
            </button>
          )
        })}
      </div>
    )
  }
};
