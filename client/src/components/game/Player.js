import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <li>{this.props.player.name}</li>
    );
  }
}

export default Player;