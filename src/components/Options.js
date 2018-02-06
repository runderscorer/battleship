import React from 'react';

export default class Options extends React.Component {
  handleClick = (e) => {
    this.props.clickHandler(e.target.value);
  }

  render() {
    return (
      <div>
        <p>2. Select the orientation for placement.</p>
        <button onClick={this.handleClick} value='vertical'>Vertical</button>
        <button onClick={this.handleClick} value='horizontal'>Horizontal</button>
      </div>
    )
  }
}
