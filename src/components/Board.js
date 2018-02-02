import React from 'react';
import './Board.css';

export default class Board extends React.Component {
  componentDidUpdate() {
    const { playerShips } = this.props;
    const table = document.getElementsByTagName('table')[0];

    Object.values(playerShips).forEach(shipCoordinates => {
      shipCoordinates.forEach(c => {
        table.rows[c[0]].cells[c[1]].classList.add('placed-ship');
      });
    });
  }

  validCoordinates = (row, col, orientation, shipLength) => {
    return (
      orientation === 'horizontal' && (col + shipLength - 1) <= 9 ||
      orientation === 'vertical' && (row + shipLength - 1) <= 9
    )
  }

  validPlacement = (coordinates, playerShips) => {
    const flattenedPlayerShipCoordinates =
      Object.values(playerShips).reduce((newArr, arrOfCoordinates) => {
        arrOfCoordinates.forEach(arr => {
          newArr.push(arr);
        });
        return newArr;
      }, []);

    const coordinatesIntersection =
      coordinates.reduce((intersection, c) => {
        flattenedPlayerShipCoordinates.forEach(f => {
          if (c[0] === f[0] && c[1] === f[1]) {
            intersection.push(c);
          }
        });
        return intersection;
      }, []);

    if (flattenedPlayerShipCoordinates.length > 0 && coordinatesIntersection.length > 0) {
      return false;
    };

    return true;
  };

  handleClick = (e) => {
    const {
      clickHandler,
      orientation,
      player,
      playerShips,
      shipLength,
      shipSelected,
    } = this.props;
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;
    const coordinates = [];

    if (this.validCoordinates(row, col, orientation, shipLength)) {
      if (orientation === 'horizontal') {
        for (let i = col; i <= (col + shipLength - 1); i++) {
          coordinates.push([row, i]);
        };
      };

      if (orientation === 'vertical') {
        for (let i = row; i <= (row + shipLength - 1); i++) {
          coordinates.push([i, col]);
        }
      };

      if (this.validPlacement(coordinates, playerShips)) {
        clickHandler(player, shipSelected, coordinates);
      };
    }
  }

  handleMouseOver = (e) => {
    const { orientation, shipLength } = this.props;
    const table = document.getElementsByTagName('table')[0];
    const row = e.target.parentNode.rowIndex;
    const col = e.target.cellIndex;

    if (orientation === 'horizontal' && (col + shipLength - 1) <= 9) {
      for (let i = col; i <= (col + shipLength - 1); i++) {
        table.rows[row].cells[i].classList.toggle('highlight')
      }
    };

    if (orientation === 'vertical' && (row + shipLength - 1) <= 9) {
      for (let i = row; i <= (row + shipLength - 1); i++) {
        table.rows[i].cells[col].classList.toggle('highlight')
      }
    }
  }

  render() {
    const { board } = this.props;
    return (
      <div>
        <table>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => {
                    return (
                      <td
                        key={colIndex}
                        onClick={this.handleClick}
                        onMouseEnter={this.handleMouseOver}
                        onMouseLeave={this.handleMouseOver}
                      >
                        {`${rowIndex}, ${colIndex}`}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
};
