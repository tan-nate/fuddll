import React from 'react';

class Player extends React.Component {
  render() {
    return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button className="challenge">challenge</button>
        </li>
    );
  }
}

export default Player;