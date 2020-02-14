import React from 'react';

class Player extends React.Component {
  render() {
    return (
        <li className="player">
          {this.props.player.name}
          <button className="challenge">challenge</button>
        </li>
    );
  }
}

export default Player;