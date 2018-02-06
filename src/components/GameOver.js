import React from 'react';

const GameOver = (props) => {
  return (
    <div className='game-over'>
      <h1>{props.winner} wins!</h1>
      <button onClick={props.clickHandler}>New game?</button>
    </div>
  )
};

export default GameOver;
