import React from 'react';

export default class Board extends React.Component {
  render() {
    const {
      board,
      clickHandler,
      mouseOverHandler,
    } = this.props;
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
                        onClick={clickHandler}
                        onMouseEnter={mouseOverHandler}
                        onMouseLeave={mouseOverHandler}
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
