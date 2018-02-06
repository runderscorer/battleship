import React from 'react';

const Message = (props) => {
  return (
    props.message ?
      <p>{props.message}</p> :
      <p>Select your coordinates.</p>
  );
};

export default Message;
